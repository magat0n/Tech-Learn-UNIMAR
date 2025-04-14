const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  level: {
    type: Number,
    default: 1
  },
  experience: {
    type: Number,
    default: 0
  },
  knowledgeIndex: {
    html: { type: Number, default: 0 },
    css: { type: Number, default: 0 },
    javascript: { type: Number, default: 0 },
    python: { type: Number, default: 0 }
  },
  completedExercises: [{
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    completedAt: { type: Date, default: Date.now },
    score: Number
  }],
  achievements: [{
    achievementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' },
    earnedAt: { type: Date, default: Date.now }
  }],
  rank: {
    type: String,
    enum: ['Iniciante', 'Aprendiz', 'Intermediário', 'Avançado', 'Mestre'],
    default: 'Iniciante'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para verificar senha
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Método para calcular nível baseado na experiência
userSchema.methods.calculateLevel = function() {
  return Math.floor(Math.sqrt(this.experience / 100)) + 1;
};

// Método para atualizar índice de conhecimento
userSchema.methods.updateKnowledgeIndex = function(language, score) {
  this.knowledgeIndex[language] = Math.min(100, this.knowledgeIndex[language] + score);
};

module.exports = mongoose.model('User', userSchema); 