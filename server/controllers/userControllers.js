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

export const getUser = async (req, res) => {
    try {
        const { clerkId } = req.params

        const user = await User.findOne({ clerkId })

        if (!user) {
            return res
                .status(200)
                .json({ userExists: false })
        }

        res
            .status(200)
            .json({ user, userExists: true })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
        
    }
}
