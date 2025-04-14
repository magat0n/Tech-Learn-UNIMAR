const User = require('../models/User');

exports.getGlobalRanking = async (req, res) => {
  try {
    const users = await User.find()
      .select('username level experience rank')
      .sort({ experience: -1 })
      .limit(100);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ranking global', error: error.message });
  }
};

exports.getLanguageRanking = async (req, res) => {
  try {
    const { language } = req.params;
    const users = await User.find()
      .select(`username level experience rank knowledgeIndex.${language}`)
      .sort({ [`knowledgeIndex.${language}`]: -1 })
      .limit(100);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ranking por linguagem', error: error.message });
  }
};

exports.getUserRank = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('username level experience rank knowledgeIndex');

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Calcula a posição global
    const globalRank = await User.countDocuments({ experience: { $gt: user.experience } }) + 1;

    // Calcula as posições por linguagem
    const languageRanks = {};
    for (const [lang, score] of Object.entries(user.knowledgeIndex)) {
      const rank = await User.countDocuments({ [`knowledgeIndex.${lang}`]: { $gt: score } }) + 1;
      languageRanks[lang] = rank;
    }

    res.json({
      user: {
        username: user.username,
        level: user.level,
        experience: user.experience,
        rank: user.rank,
        knowledgeIndex: user.knowledgeIndex
      },
      positions: {
        global: globalRank,
        languages: languageRanks
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar posição do usuário', error: error.message });
  }
}; 