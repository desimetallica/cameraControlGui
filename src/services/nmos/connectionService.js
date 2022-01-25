import axios from "axios";

const getSingleSender = (senderId, baseURL) =>
	axios
		.get("/single/senders/" + senderId + "/constraints", { baseURL: baseURL })
		.then(({ data }) => ({ sender: data }))

const getSingleSenders = baseURL =>
	axios
		.get("/single/senders", { baseURL: baseURL })
		.then(({ data }) => ({ senders: data }))

const stageReceiver = (receiverId, baseURL, stagedPayload) =>
	axios
		.patch("/single/receivers/" + receiverId + "/staged",
			stagedPayload,
			{
				baseURL: baseURL,
				Headers: { "Content-Type": "application/json" }
			})
		.then(({ data }) => ({ receiver: data }))

export default {
	getSingleSenders,
	getSingleSender,
	stageReceiver
};
