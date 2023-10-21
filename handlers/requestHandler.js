const axios = require('axios');

//3: HTTP call
exports.handler = async (event, recharge_api_key, endpoint) => {

  //1 API URL
  const baseUrl = `https://api.rechargeapps.com/${endpoint}?limit=250`;

  let result;

  //3.1 Make sure the request is coming from Weld
  checkAuth(event);

  //3.2 If path is schema, return the schema to Weld

  //3.3 Set potential URL parameters, e.g. an incremental pointer
  // Not needed in this case

  //3.4 Call the API
  let url = event.body && JSON.parse(event.body).state?.nextUrl ? JSON.parse(event.body).state?.nextUrl : baseUrl;
  
  console.log(url);
  
  const resp = await axios.get(url, {
    headers: {
      'X-Recharge-Access-Token': recharge_api_key,
      'X-Recharge-Version': '2021-11',
      'Content-Type': 'application/json'
    }
    });

  //3.5 Format data to Weld format
  // Not needed in this case

  //3.6 Handle pagination - find next URL, different how APIs handles this
  switch (resp.data.next_cursor) {
    case null:
      result = {
        insert: resp.data[endpoint],          // Data to be inserted into warehouse
        state: { },   // Define any variables here. Can be used for e.g. pagination or incremental pointers
        hasMore: false                            // If true Weld will call endpoint again with the updated state to get more rows
      };
      break;
    default:
      result = {
        insert: resp.data[endpoint],                                                            // Data to be inserted into warehouse
        state: {nextUrl: baseUrl.concat('&cursor=').concat(resp.data.next_cursor)},    // Define any variables here. Can be used for e.g. pagination or incremental pointers
        hasMore: true                                                                               // If true Weld will call endpoint again with the updated state to get more rows
      };
      break;
  }
  
  if (result.state.nextUrl === url) {
    result.state.nextUrl = null;
    result.hasMore = false;
  }

  return result
};