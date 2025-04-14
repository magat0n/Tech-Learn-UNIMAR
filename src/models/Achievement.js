const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Progresso', 'Habilidade', 'Social', 'Especial'],
    required: true
  },
  requirements: {
    type: {
      type: String,
      enum: ['exercisesCompleted', 'levelReached', 'knowledgeIndex', 'streak', 'custom'],
      required: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    language: {
      type: String,
      enum: ['html', 'css', 'javascript', 'python', 'all'],
      default: 'all'
    }
  },
  reward: {
    experience: {
      type: Number,
      required: true
    },
    badge: {
      type: String,
      required: true
    }
  },
  rarity: {
    type: String,
    enum: ['Comum', 'Raro', 'Épico', 'Lendário'],
    default: 'Comum'
  },
  hidden: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Achievement', achievementSchema); 