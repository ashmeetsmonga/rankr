import React from "react";

const Welcome = () => {
	return (
		<div className='min-h-screen p-4 flex flex-col items-center gap-5 bg-gray-800 text-white'>
			<h1 className='mt-10 text-5xl font-bold text-center'>Welcome to Rankr</h1>
			<button className='bg-orange-700 mt-10 px-5 py-3 rounded-md'>Create New Poll</button>
			<button className='bg-green-700 px-5 py-3 rounded-md'>Join Existing Poll</button>
		</div>
	);
};

export default Welcome;
