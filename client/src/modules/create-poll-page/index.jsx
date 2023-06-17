import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreatePollModule = () => {
	const [pollTopic, setPollTopic] = useState("");
	const [name, setName] = useState("");
	const [votesPerVoter, setVotesPerVoter] = useState(1);

	const handleSubmit = () => {
		if (!pollTopic || pollTopic.length > 100) {
			toast.error("Poll Topic should be between 1 and 100 letters");
			return;
		} else if (!name || name.length > 25) {
			toast.error("Name should be between 1 and 25 letters");
			return;
		}
	};

	return (
		<div className='min-h-screen p-4 flex flex-col items-center bg-gray-800 text-white'>
			<h1 className='mt-[10rem] text-5xl font-bold text-center'>Create New Poll</h1>
			<div className='w-full flex flex-col items-center mt-10 md:w-[700px]' onSubmit={handleSubmit}>
				<div className='w-full flex flex-col items-center gap-3'>
					<label htmlFor='input-poll-topic' className='text-xl'>
						Enter Poll Topic
					</label>
					<input
						id='input-poll-topic'
						type='text'
						value={pollTopic}
						onChange={(e) => setPollTopic(e.target.value)}
						className='w-3/4 p-3 rounded-md bg-gray-900 outline-none focus:outline-none'
					/>
				</div>
				<div className='text-xl text-center mt-6'>Votes Per Voter</div>
				<div className='flex justify-center items-center gap-4 mt-3'>
					<button
						disabled={votesPerVoter === 1}
						onClick={() => setVotesPerVoter((prev) => prev - 1)}
						className={`bg-gray-900 px-3 py-1 rounded pointer ${
							votesPerVoter === 1 ? "text-gray-500" : ""
						}`}
					>
						-
					</button>
					<div className='font-bold text-lg'>{votesPerVoter}</div>
					<button
						disabled={votesPerVoter === 5}
						onClick={() => setVotesPerVoter((prev) => prev + 1)}
						className={`bg-gray-900 px-3 py-1 rounded pointer ${
							votesPerVoter === 5 ? "text-gray-500" : ""
						}`}
					>
						+
					</button>
				</div>
				<div className='w-full flex mt-6 flex-col items-center gap-3'>
					<label htmlFor='input-poll-name' className='text-xl'>
						Enter Name
					</label>
					<input
						id='input-poll-name'
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='w-3/4 p-3 rounded-md bg-gray-900 outline-none focus:outline-none'
					/>
				</div>

				<div>
					<button onClick={handleSubmit} className='block bg-orange-700 mt-10 px-5 py-3 rounded-md'>
						Create Poll
					</button>

					<Link to='/'>
						<button className='w-full bg-green-700 mt-4 px-5 py-3 rounded-md'>Start Over</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CreatePollModule;
