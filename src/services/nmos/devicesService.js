import axios from "axios";

const getDevice = (deviceId, baseURL) =>
  axios
    .get("/x-nmos/query/v1.3/devices/" + deviceId, { baseURL: baseURL})
    .then(({ data }) => ({ device: data }))

const getDevices = baseURL => 
  axios
    .get("/x-nmos/query/v1.3/devices", {baseURL: baseURL})
    .then(({ data }) => ({ devices: data }))
    
const makeRqlQuery = (rqlQuery, baseURL) => 
  axios 
    .get("/x-nmos/query/v1.3/devices/?query.rql=" + rqlQuery, { baseURL: baseURL})
    .then(({ data }) => ({ devices: data }))

export default {
  getDevice,
  getDevices,
  makeRqlQuery
};
