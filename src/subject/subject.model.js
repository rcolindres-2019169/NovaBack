import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'user'
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo'],
    default: 'activo'
  }
}, {
  versionKey: false
});

export default mongoose.model('Subject', subjectSchema);