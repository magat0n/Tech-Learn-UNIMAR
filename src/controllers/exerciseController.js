const Exercise = require('../models/Exercise');
const User = require('../models/User');

exports.getExercises = async (req, res) => {
  try {
    const { language, difficulty, category } = req.query;
    const query = {};

    if (language) query.language = language;
    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;

    const exercises = await Exercise.find(query)
      .select('-solution -tests')
      .sort({ createdAt: -1 });

    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar exercícios', error: error.message });
  }
};

exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id)
      .select('-solution');

    if (!exercise) {
      return res.status(404).json({ message: 'Exercício não encontrado' });
    }

    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar exercício', error: error.message });
  }
};

exports.submitExercise = async (req, res) => {
  try {
    const { code } = req.body;
    const exercise = await Exercise.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!exercise) {
      return res.status(404).json({ message: 'Exercício não encontrado' });
    }

    // Simulação de execução do código (em produção, usar um sandbox seguro)
    const testResults = exercise.tests.map(test => {
      try {
        // Aqui seria implementada a lógica real de teste do código
        const result = eval(code + `\n${test.input}`);
        return {
          passed: result === test.expectedOutput,
          input: test.input,
          expected: test.expectedOutput,
          actual: result
        };
      } catch (error) {
        return {
          passed: false,
          input: test.input,
          expected: test.expectedOutput,
          error: error.message
        };
      }
    });

    const passed = testResults.every(test => test.passed);
    const score = passed ? exercise.points : 0;

    if (passed) {
      // Atualiza o progresso do usuário
      user.experience += score;
      user.level = user.calculateLevel();
      user.updateKnowledgeIndex(exercise.language, score);
      
      // Adiciona o exercício aos completados
      user.completedExercises.push({
        exerciseId: exercise._id,
        score
      });

      await user.save();
    }

    res.json({
      passed,
      score,
      testResults,
      user: {
        level: user.level,
        experience: user.experience,
        knowledgeIndex: user.knowledgeIndex
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao submeter exercício', error: error.message });
  }
};

exports.createExercise = async (req, res) => {
  try {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar exercício', error: error.message });
  }
}; 