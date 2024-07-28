import User from "../models/userModel.js"

export const createUser = async (req, res) => {
    try {
        const { interests, email, clerkId, country } = req.body

        const potentialUser = await User.findOne({ clerkId })
        let newUser = {
            email,
            clerkId,
            interests,
            country
        }

        if (!potentialUser) {
            await User.create(newUser)
        } else {
            await User.findOneAndUpdate(
                { clerkId },
                { email, interests, country }
            )
        }

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

        if (user)
            res
                .status(200)
                .json({ user })
        else 
            res
                .status(200)
                .json({ user: null })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
        
    }
}
