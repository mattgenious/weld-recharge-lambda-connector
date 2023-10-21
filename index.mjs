import { handleRequest } from "./handlers/requestHandler.mjs";
import { getSchema } from "./handlers/schemaHandler.mjs";
import { checkAuth } from "./handlers/authHandler.mjs";

export const handler = async (event) => {
  console.log(event);
  
  checkAuth(event);

  if (event.rawPath === "//schema") return getSchema();

  let endpoint = event.body && JSON.parse(event.body).name ? JSON.parse(event.body).name : null;

  switch (endpoint) {
    case "charges":
      return await handleRequest(
        event,
        process.env.RECHARGE_API_KEY,
        "charges"
      );
    case "collections":
      return await handleRequest(
        event,
        process.env.RECHARGE_API_KEY,
        "collections"
      );
    case "customers":
      return await handleRequest(
        event,
        process.env.RECHARGE_API_KEY,
        "customers"
      );
    case "discounts":
      return await handleRequest(
        event,
        process.env.RECHARGE_API_KEY,
        "discounts"
      );
    case "onetimes":
      return await handleRequest(
        event,
        process.env.RECHARGE_API_KEY,
        "onetimes"
      );
    case "orders":
      return await handleRequest(
        event,
        process.env.RECHARGE_API_KEY,
        "orders"
      );
    case "payment_methods":
      return await handleRequest(
        event,
        process.env.RECHARGE_API_KEY,
        "payment_methods"
      );
    case "plans":
      return await handleRequest(
        event,
        process.env.RECHARGE_API_KEY,
        "plans"
      );
    case "retention_strategies":
      return await handleRequest(
        event,
        process.env.RECHARGE_API_KEY,
        "retention_strategies"
      );
    case "subscriptions":
      return await handleRequest(
        event,
        process.env.RECHARGE_API_KEY,
        "subscriptions"
      );
    default:
      break;
  }
};
