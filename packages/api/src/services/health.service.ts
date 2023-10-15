import os from 'os';
import spotifyClient from '~/helpers/spotifyClient';

export class HealthService {
    private async checkSpotify() {
        try {
            await spotifyClient.checkCredentials();
            return true;
        } catch (e) {
            return false;
        }
    }
    private async memoryUsage() {
        const memoryUsage = process.memoryUsage();
        const used = memoryUsage.heapUsed / 1024 / 1024;
        const total = memoryUsage.heapTotal / 1024 / 1024;
        return `used: ${used.toFixed(2)}MB, total: ${total.toFixed(2)}MB`;
    }
    public async pong() {
        return {
            message: 'pong',
        }
    }
    public async getHealth() {
        let status;
        try {
            status = await this.checkSpotify();
        } catch (e) {
            status = false;
        }
        return {
            status: status ? 'OK' : 'ERROR',
            spotifyClient: status ? 'OK' : 'ERROR',
            hostname: os.hostname(),
            platform: os.platform() + ' ' + os.release(),
            uptime: process.uptime(),
            memoryUsage: await this.memoryUsage(),
        };
    }
}
