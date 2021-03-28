import { serviceCall } from '../utils';

/**
 * investment performance services
 */
class InvestmentPerfomanceServices {
  /**
     * initiate url for service calls
     */
  constructor() {
    this.serviceCall = serviceCall;
  }

  /**
 * process stock performance for the year
 * @returns {object} stock performance
 */
  async processStockPerformance() {
    const endPoint = 'stock-performance.json';

    const response = await this.serviceCall(endPoint);

    const sumOfLoss = await response.filter(data => data.type === 'loss').map(x => x.diff).reduce((a, b) => a + b, 0);

    const sumOfGain = await response.filter(data => data.type === 'gain').map(x => x.diff).reduce((a, b) => a + b, 0);

    const stockPerformance = sumOfGain - sumOfLoss;

    return {
      success: true,
      data: {
        performance: stockPerformance, sumOfLoss, sumOfGain, stockPerformanceData: response
      }
    };
  }
}

export default InvestmentPerfomanceServices;
