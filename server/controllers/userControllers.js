import User from "../models/userModel.js"

export const createUser = async (req, res) => {
    try {
        const { interests, email, clerkId, country } = req.body

        const newUser = await User.create({
            email, 
            clerkId,
            interests,
            country
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
