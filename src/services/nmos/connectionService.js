import axios from "axios";

const getSingleSender = (senderId, baseURL) =>
	axios
		.get("/single/senders/" + senderId + "/constraints", { baseURL: baseURL, timeout: 300 })
		.then(({ data }) => ({ sender: data }))
		.catch(error => {
			console.log(error)
		})

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
				timeout: 300,
				Headers: { "Content-Type": "application/json" }
			})
		.then(({ data }) => ({ receiver: data }))
		.catch(error => {
			console.log(error)
		})

export default {
	getSingleSenders,
	getSingleSender,
	stageReceiver
};
