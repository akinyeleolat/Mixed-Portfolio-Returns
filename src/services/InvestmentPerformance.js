/* eslint-disable class-methods-use-this */
import moment from 'moment';
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

    const sumOfLoss = await response
      .filter(data => data.type === 'loss')
      .map(x => x.diff)
      .reduce((a, b) => a + b, 0);

    const sumOfGain = await response
      .filter(data => data.type === 'gain')
      .map(x => x.diff)
      .reduce((a, b) => a + b, 0);

    const stockPerformance = sumOfGain - sumOfLoss;

    return {
      stockPerformance,
      stockPerformanceData: response,
      sumOfLoss,
      sumOfGain
    };
  }

  /**
 * process daily increase of roi
 * @returns {object} roi performance
 */
  async processFixedTermPerformance() {
    const endPoint = 'sample-user-portfolio.json';
    const response = await this.serviceCall(endPoint);
    const { mixes } = response;
    const fixedTermValue = mixes[1].balance;
    // const fixedTermValue = 380;
    const annualROIPercentage = 10;

    const fixedTermGain = fixedTermValue * (annualROIPercentage / 100);

    const start = moment('2020-01-01', 'YYYY-MM-DD');
    const end = moment('2020-12-31', 'YYYY-MM-DD');

    const numOfDays = moment.duration(end.diff(start)).asDays() + 1;

    const dailyGain = fixedTermGain / numOfDays;

    const fixedTermPerformance = [];

    let diff = 0;
    for (let i = 0; i < numOfDays; i += 1) {
      const date = moment(start);
      diff += dailyGain;
      fixedTermPerformance.push({
        initialValue: fixedTermValue,
        value: diff + fixedTermValue,
        diff,
        createdAt: date.add(i, 'days').format('YYYY-MM-DD')
      });
    }


    return {
      portfolioData: response,
      fixedTermGain,
      dailyGain,
      fixedTermPerformance
    };
  }

  /**
    * mixed plan performance
    * @returns {object} plan performance
    */
  async planPerformance() {
    const {
      portfolioData,
      fixedTermGain,
      fixedTermPerformance
    } = await this.processFixedTermPerformance();

    const {
      stockPerformance,
      sumOfGain,
      sumOfLoss,
      stockPerformanceData
    } = await this.processStockPerformance();

    const planPerformance = fixedTermGain + stockPerformance;


    return {
      success: true,
      data: {
        portfolioData,
        planPerformance,
        stockPerformance,
        fixedTermGain,
        stockSumOfLoss: sumOfLoss,
        stockSumOfGain: sumOfGain,
        stockPerformanceData,
        fixedTermPerformance
      },
    };
  }
}

export default InvestmentPerfomanceServices;
