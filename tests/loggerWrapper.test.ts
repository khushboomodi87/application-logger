import '@testing-library/jest-dom'
import { getLoggerData } from 'src/api/app-logger-wrapper';

describe('Logger Api', () => {
    it('get data from api', async () => {
        const loggerData = await getLoggerData();
        expect(loggerData.success).toBe(true);
        expect(loggerData.result).not.toBeUndefined();
        expect(loggerData.result.auditLog).not.toBeUndefined();
    })
})
