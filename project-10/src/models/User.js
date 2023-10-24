import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email:{
            type: String,
            unique: true,
            require: true,
        },
        password: {
            type: String,
            require: false,
        },
    },
    { timestamp: true}
);

export default mongoose.models.User || mongoose.model("User",userSchema);