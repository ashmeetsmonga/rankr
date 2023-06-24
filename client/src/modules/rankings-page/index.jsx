import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PollContext } from "../../context/PollContext";

const RankingsPageModule = () => {
	const { poll, resetPoll } = useContext(PollContext);

	const navigate = useNavigate();

	console.log(poll);

	const handleReset = () => {
		resetPoll();
		navigate("/");
	};

	return (
		<div className='min-h-screen p-4 flex flex-col justify-around items-center bg-gray-800 text-white'>
			<div className='flex flex-col items-center w-full'>
				<div className='text-center mt-10'>
					<h2 className='text-2xl py-3 px-5 rounded-lg mb-4'>Results</h2>
				</div>
				<div className='flex justify-around'>
					<div className='w-full mt-10 flex flex-col items-center gap-2'>
						{poll?.results?.map((nomination, idx) => (
							<h2
								key={idx}
								className={`w-full text-xl bg-gray-900 py-2 px-4 rounded-lg font-bold text-center m-1`}
							>
								{nomination.name}
							</h2>
						))}
					</div>
				</div>
			</div>
			<button onClick={handleReset} className='bg-green-700 mt-4 px-10 py-3 rounded-md'>
				New Poll
			</button>
		</div>
	);
};

export default RankingsPageModule;
