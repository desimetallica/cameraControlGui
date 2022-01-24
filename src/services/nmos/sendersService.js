import axios from "axios";

const getSender = (senderId, baseURL) =>
  axios
    .get("/x-nmos/query/v1.3/senders/" + senderId, { baseURL: baseURL})
    .then(({ data }) => ({ senders: data }))

const getSenders = baseURL => 
  axios
    .get("/x-nmos/query/v1.3/senders", {baseURL: baseURL})
    .then(({ data }) => ({ senders: data }))
    
const makeRqlQuery = (rqlQuery, baseURL) => 
  axios 
    .get("/x-nmos/query/v1.3/senders/?query.rql=" + rqlQuery, { baseURL: baseURL})
    .then(({ data }) => ({ senders: data }))

export default {
  getSender,
  getSenders,
  makeRqlQuery
};
