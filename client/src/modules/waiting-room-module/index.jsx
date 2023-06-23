import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PollContext } from "../../context/PollContext";
import { initialiseSocket } from "../../socket";

const WaitingRoomModule = () => {
	const { poll, setPoll, socket, setSocket, isAdmin } = useContext(PollContext);

	const [nomination, setNomination] = useState("");

	const addNomination = () => {
		if (!nomination) {
			toast.error("Please enter valid nomination");
			return;
		}
		socket.emit("add_nomination", { name: nomination });
		setNomination("");
	};

	const removeNomination = (nomID) => {
		socket.emit("remove_nomination", { nominationID: nomID });
	};

	const startPoll = () => {
		socket.emit("start_poll");
	};

	useEffect(() => {
		if (!socket) {
			const socket = initialiseSocket(setPoll);
			setSocket(socket);
		}
	}, []);

	return (
		<div className='min-h-screen p-4 flex flex-col justify-around items-center bg-gray-800 text-white'>
			<div className='flex flex-col items-center w-full'>
				<div className='text-center mt-10'>
					<p className='mb-4'>Poll Topic</p>
					<h2 className='text-2xl bg-gray-900 py-3 px-5 rounded-lg mb-4'>{poll.topic}</h2>
					<p className='text-xl font-extrabold'>{poll.pollID}</p>
				</div>
				<div className='w-3/4 md:w-1/2 flex justify-around'>
					<div className='w-full mt-10 flex flex-col items-center'>
						<p className='text-lg mb-4'>Participants</p>
						{poll.participants.map((participant, idx) => (
							<h2
								key={idx}
								className={`text-xl font-bold text-center m-1 ${
									poll.adminID === participant.userID ? "border-b-2 border-white" : ""
								}`}
							>
								{participant.name}
							</h2>
						))}
					</div>
					<div className='w-full mt-10 flex flex-col items-center'>
						<p className='text-lg mb-4'>Nominations</p>
						<div className='flex flex-col'>
							{poll?.nominations?.map((nomination, idx) => (
								<h2 key={idx} className='text-xl font-bold text-center p-1 relative'>
									{nomination.name}
									{isAdmin && (
										<button
											onClick={() => removeNomination(nomination.nominationID)}
											className='absolute top-1 -right-7 text-[15px] bg-gray-900 rounded-full px-2'
										>
											x
										</button>
									)}
								</h2>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='w-full flex mt-10 flex-col items-center gap-3'>
				<label htmlFor='input-join-poll-name' className='text-xl'>
					Enter Nomination
				</label>
				<input
					id='input-join-poll-name'
					type='text'
					value={nomination}
					onChange={(e) => setNomination(e.target.value)}
					className='w-3/4 md:w-1/4 p-3 text-center rounded-md bg-gray-900 outline-none focus:outline-none'
				/>
				<div className='flex flex-col items-center'>
					<button onClick={addNomination} className='block bg-orange-700 mt-4 px-5 py-3 rounded-md'>
						Add Nomination
					</button>
					{isAdmin && (
						<button
							disabled={poll.nominations.length < poll.votesPerVoter}
							onClick={startPoll}
							className='w-full bg-green-700 mt-4 px-5 py-3 rounded-md disabled:opacity-50'
						>
							Start Poll
						</button>
					)}
					{!isAdmin && <i className='mt-4'>Waiting for admin to start the poll</i>}
				</div>
				{isAdmin && poll.nominations.length < poll.votesPerVoter && (
					<i className='mt-4'>Add atleast {poll.votesPerVoter} nominations to start the poll</i>
				)}
			</div>
		</div>
	);
};

export default WaitingRoomModule;
