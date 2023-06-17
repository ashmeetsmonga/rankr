import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
	return (
		<div className='min-h-screen p-4 flex flex-col items-center gap-8 bg-gray-800 text-white'>
			<h1 className='mt-[10rem] text-5xl font-bold text-center'>Welcome to Rankr</h1>
			<div className='flex flex-col gap-4'>
				<Link to='create-poll'>
					<button className='block w-full bg-orange-700 mt-10 px-5 py-3 rounded-md'>
						Create New Poll
					</button>
				</Link>
				<Link to='join-poll'>
					<button className='bg-green-700 px-5 py-3 rounded-md'>Join Existing Poll</button>
				</Link>
			</div>
		</div>
	);
};

export default Welcome;
