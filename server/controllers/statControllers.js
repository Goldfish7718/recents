import User from "../models/userModel.js"

export const getGeneralStats = async (req, res) => {
    try {
        const users = await User.find({})

        const { totalLimelightRequests, totalDailySummariesRequests } = users.reduce((acc, currUser) => {
                acc.totalLimelightRequests += currUser.limelightRequests;
                acc.totalDailySummariesRequests += currUser.dailySummariesRequests;
                return acc;
            },
            { totalLimelightRequests: 0, totalDailySummariesRequests: 0 }
        );

        const finalStats = {
            totalDailySummariesRequests,
            totalLimelightRequests,
            totalRequests: totalDailySummariesRequests + totalLimelightRequests
        }

        res
            .status(200)
            .json({ finalStats })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}