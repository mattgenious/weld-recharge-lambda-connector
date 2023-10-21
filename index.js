
import { checkAuth } from './handlers/authHandler';
import { requestHandler } from './handlers/requestHandler';
import { getSchema } from './handlers/schemaHandler';

exports.handler = async (event) => {
  checkAuth(event);

  if (event.rawPath === "//schema") return getSchema();

  switch (event.rawPath) {
    case '//charges':
      return await requestHandler.handler(event, process.env.RECHARGE_API_KEY, 'charges');
    case '//collections':
      return await requestHandler.handler(event, process.env.RECHARGE_API_KEY, 'collections');
    case '//customers':
      return await requestHandler.handler(event, process.env.RECHARGE_API_KEY, 'customers');
    case '//discounts':
      return await requestHandler.handler(event, process.env.RECHARGE_API_KEY, 'discounts');
    case '//onetimes':
      return await requestHandler.handler(event, process.env.RECHARGE_API_KEY, 'onetimes');
    case '//orders':
      return await requestHandler.handler(event, process.env.RECHARGE_API_KEY, 'orders');
    case '//payment_methods':
      return await requestHandler.handler(event, process.env.RECHARGE_API_KEY, 'payment_methods');
    case '//plans':
      return await requestHandler.handler(event, process.env.RECHARGE_API_KEY, 'plans');
    case '//retention_strategies':
      return await requestHandler.handler(event, process.env.RECHARGE_API_KEY, 'retention_strategies');
    case '//subscriptions':
      return await requestHandler.handler(event, process.env.RECHARGE_API_KEY, 'subscriptions');
    default:
      break;
  }
};