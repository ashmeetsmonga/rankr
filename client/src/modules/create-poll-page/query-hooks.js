import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useCreatePoll = () => {
	let toastID = "";
	return useMutation(
		async ({ topic, votesPerVoter, name }) => {
			toastID = toast.loading("Creating New Poll");
			const { data } = await axios.post(`${import.meta.env.BASE_URL}/create`, {
				topic,
				votesPerVoter,
				name,
			});
			return data;
		},
		{
			onSuccess: (data) => {
				toast.success("Poll created successfully", {
					id: toastID,
				});
			},
			onError: (err) => {
				toast.error("Unable to create poll, please try after some time", {
					id: toastID,
				});
			},
		}
	);
};
