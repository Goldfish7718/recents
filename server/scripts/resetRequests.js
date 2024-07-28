import cron from 'node-cron'
import User from '../models/userModel.js';

cron.schedule('0 0 * * *', async () => {
    try {
      await User.updateMany({}, { $set: { limelightRequests: 0, dailySummariesRequests: 0 } });
      console.log('All users\' requests have been reset to 0');
    } catch (error) {
      console.error('Error resetting user requests:', error);
    }
});