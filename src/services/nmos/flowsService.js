import axios from "axios";

const getFlow = (flowId, baseURL) =>
  axios
    .get("/x-nmos/query/v1.3/flows/" + flowId, { baseURL: baseURL})
    .then(({ data }) => ({ flow: data }))

const getFlows = baseURL => 
  axios
    .get("/x-nmos/query/v1.3/flows", {baseURL: baseURL})
    .then(({ data }) => ({ flows: data }))
    
const makeRqlQuery = (rqlQuery, baseURL) => 
  axios 
    .get("/x-nmos/query/v1.3/flows/?query.rql=" + rqlQuery, { baseURL: baseURL})
    .then(({ data }) => ({ flows: data }))

export default {
  getFlow,
  getFlows,
  makeRqlQuery
};
