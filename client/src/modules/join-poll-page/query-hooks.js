import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { PollContext } from "../../context/PollContext";

export const useJoinPoll = () => {
	let toastID = "";
	const { setPoll, setPollAccessToken, setAdmin } = useContext(PollContext);
	return useMutation(
		async ({ pollID, name }) => {
			toastID = toast.loading("Joining Exisiting Poll");
			const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/join`, {
				pollID,
				name,
			});
			return data;
		},
		{
			onSuccess: (data) => {
				toast.remove(toastID);
				setPoll(data.poll);
				setPollAccessToken(data.token);
				setAdmin(data.token, data.poll);
			},
			onError: (err) => {
				console.log(err);
				toast.error("Unable to join poll, please try after some time", {
					id: toastID,
				});
			},
		}
	);
};
