import redisClient from "../config/redis";

class OTPGenerator {
  static async generateOTP(refrigeratorId: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisClient.setEx(`otp:${refrigeratorId}`, 30, otp); 
    return otp;
  }

  static async validateOTP(refrigeratorId: string, otp: string): Promise<boolean> {
    const storedOtp = await redisClient.get(`otp:${refrigeratorId}`);
    return storedOtp === otp;
  }
}

export default OTPGenerator;
