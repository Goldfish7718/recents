import { model, Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        // unique: true,
        required: true
    },
    clerkId: {
        type: String,
        // unique: true,
        required: true
    },
    interests: [
        {
            type: String
        }
    ],
    country: {
        type: String,
        default: "in"
    },
    limelightRequests: {
        type: Number,
        default: 0
    },
    dailySummariesRequests: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const User = model('User', userSchema);
export default User