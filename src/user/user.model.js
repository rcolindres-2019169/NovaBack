    import mongoose from "mongoose";

    const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            unique: true,
            lowercase: true,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            minLength: 8,
            maxLength: 8,
            required: true
        },
        password: {
            type: String,
            minLength: [8, 'Password must be 8 characters'],
            required: true
        },
        profilePic: {
            type: String,
            default: '',
            required: false
        },
        role: {
            type: String,
            uppercase: true,
            enum: ['ADMIN', 'USER', 'TEACHER', 'ADVISER'],
            required: true
        },
        scholarship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scholarship',
            required: false
        }
    });

    export default mongoose.model('user', userSchema);
