import routesList from './v1';
import logger from '../services/Logger';

const routes = (app) => {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, content-type, x-access-token, authorization'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.removeHeader('X-Powered-By');
    next();
  });

  app.all('/test', (req, res) => {
    res.send({ message: 'Hello from templates!' });
  });

  const version1 = '/v1';
  app.use(version1, routesList);

  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(err.status).send({ message: err.message });
      logger.error(err);
      return;
    }
    next();
  });
};

export default routes;
