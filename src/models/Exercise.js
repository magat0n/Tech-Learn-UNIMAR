const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Fácil', 'Médio', 'Difícil'],
    required: true
  },
  language: {
    type: String,
    enum: ['html', 'css', 'javascript', 'python'],
    required: true
  },
  category: {
    type: String,
    enum: ['Fundamentos', 'Estruturas de Dados', 'Algoritmos', 'Web', 'Data Science'],
    required: true
  },
  initialCode: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  tests: [{
    input: String,
    expectedOutput: String,
    description: String
  }],
  hints: [{
    text: String,
    order: Number
  }],
  points: {
    type: Number,
    required: true,
    min: 10,
    max: 100
  },
  timeEstimate: {
    type: Number, // em minutos
    required: true
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  }],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Atualiza o campo updatedAt antes de salvar
exerciseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Exercise', exerciseSchema); 