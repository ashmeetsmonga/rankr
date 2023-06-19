import React, { useContext, useEffect } from "react";
import { PollContext } from "../../context/PollContext";
import { initialiseSocket } from "../../socket";

const WaitingRoomModule = () => {
	const { setPoll } = useContext(PollContext);

	useEffect(() => {
		const socket = initialiseSocket(setPoll);
		console.log(socket);
	}, []);

	return (
		<div className='min-h-screen p-4 flex flex-col items-center bg-gray-800 text-white'>
			WaitingRoomModule
		</div>
	);
};

export default WaitingRoomModule;
