import axios from "axios";

const updateExposure = (baseURL, payload) =>
	axios
		.patch("/exposure",
			payload,
			{
				baseURL: baseURL,
				Headers: { "Content-Type": "application/json" }
			})
		.then(({ data }) => ({ updatedExposure: data }))

const updateGain = (baseURL, payload) =>
	axios
		.patch("/gain",
			payload,
			{
				baseURL: baseURL,
				Headers: { "Content-Type": "application/json" }
			})
		.then(({ data }) => ({ updatedGain: data }))

export default {
	updateGain,
  updateExposure
};
