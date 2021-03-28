import InvestmentPerfomanceServices from '../services/InvestmentPerformance';
import { displayError } from '../utils';

const PerformanceInstance = new InvestmentPerfomanceServices();

export const getPlanPerformance = async (req, res) => {
  try {
    const results = await PerformanceInstance.planPerformance();
    return res.json(results).status(200);
  } catch (error) {
    return displayError(error, res, error.httpStatusCode);
  }
};


export const getAllData = async () => {};
