import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useJoinPoll } from "./query-hooks";

const JoinPollModule = () => {
	const [pollID, setPollID] = useState("");
	const [name, setName] = useState("");

	const navigate = useNavigate();
	const { mutate: joinPollMutation, isSuccess } = useJoinPoll();

	useEffect(() => {
		if (isSuccess) navigate("/waiting-room");
	}, [isSuccess]);

	const areInputsInvalid = () => {
		if (pollID.length !== 6) return true;
		if (!name) return true;
		return false;
	};

	const handleSubmit = () => {
		joinPollMutation({ pollID, name });
	};

	return (
		<div className='min-h-screen p-4 flex flex-col items-center bg-gray-800 text-white'>
			<h1 className='mt-[10rem] text-5xl font-bold text-center'>Join Existing Poll</h1>
			<div className='w-full flex flex-col items-center mt-10 md:w-[700px]' onSubmit={handleSubmit}>
				<div className='w-full flex flex-col items-center gap-3'>
					<label htmlFor='input-join-pollID' className='text-xl'>
						Enter Poll ID
					</label>
					<input
						id='input-join-pollID'
						type='text'
						value={pollID}
						onChange={(e) => setPollID(e.target.value.toUpperCase())}
						className='w-3/4 p-3 text-center rounded-md bg-gray-900 outline-none focus:outline-none'
					/>
				</div>
				<div className='w-full flex mt-6 flex-col items-center gap-3'>
					<label htmlFor='input-join-poll-name' className='text-xl'>
						Enter Name
					</label>
					<input
						id='input-join-poll-name'
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='w-3/4 p-3 text-center rounded-md bg-gray-900 outline-none focus:outline-none'
					/>
				</div>

				<div>
					<button
						onClick={handleSubmit}
						disabled={areInputsInvalid()}
						className='block w-full bg-orange-700 mt-10 px-5 py-3 rounded-md disabled:opacity-50'
					>
						Join Poll
					</button>

					<Link to='/'>
						<button className='w-full bg-green-700 mt-4 px-5 py-3 rounded-md'>Start Over</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default JoinPollModule;
