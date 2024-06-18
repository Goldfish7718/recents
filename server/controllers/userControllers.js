import User from "../models/userModel.js"

export const createUser = async (req, res) => {
    try {
        const { interests, email, clerkId } = req.body

        const newUser = await User.create({
            email, 
            clerkId,
            interests
        })

        res
            .status(200)
            .json({ newUser })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}
