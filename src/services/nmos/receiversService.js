import axios from "axios";

const getReceiver = (receiverId, baseURL) =>
  axios
    .get("/x-nmos/query/v1.3/receivers/" + receiverId, { baseURL: baseURL })
    .then(({ data }) => ({ receivers: data }))

const getReceivers = baseURL =>
  axios
    .get("/x-nmos/query/v1.3/receivers", { baseURL: baseURL })
    .then(({ data }) => ({ receivers: data }))

const getConnectionStatus = (receiverId, baseURL) =>
  axios
    .get("/x-nmos/query/v1.3/receivers/" + receiverId, { baseURL: baseURL })
    .then(({ data }) => ({ active: data.subscription.active }))

export default {
  getReceiver,
  getReceivers,
  getConnectionStatus
};
