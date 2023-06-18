import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { PollContext } from "../../context/PollContext";

export const useCreatePoll = () => {
	let toastID = "";
	const { setPoll, setPollAccessToken, setAdmin } = useContext(PollContext);
	return useMutation(
		async ({ topic, votesPerVoter, name }) => {
			toastID = toast.loading("Creating New Poll");
			const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/create`, {
				topic,
				votesPerVoter,
				name,
			});
			return data;
		},
		{
			onSuccess: (data) => {
				setPoll(data.poll);
				setPollAccessToken(data.token);
				setAdmin(data.token, data.poll);
				sessionStorage.setItem("token", data.token);
				toast.remove(toastID);
			},
			onError: (err) => {
				toast.error("Unable to create poll, please try after some time", {
					id: toastID,
				});
			},
		}
	);
};
