import React, { useContext, useEffect, useState } from "react";
import { PollContext } from "../../context/PollContext";

const VotingPageModule = () => {
	const { poll } = useContext(PollContext);

	const [totalVotes, setTotalVotes] = useState(0);
	const [selectedNominations, setSelectedNominations] = useState([]);

	const getNomIdx = (nominationID) => {
		const nomIdx = selectedNominations.findIndex((nomID) => nomID === nominationID);
		return nomIdx;
	};

	const handleNominationSelection = (nominationID) => {
		const nomIdx = getNomIdx(nominationID);
		if (nomIdx !== -1)
			setSelectedNominations((prev) => {
				const newSelections = [...prev];
				newSelections.splice(nomIdx, 1);
				return newSelections;
			});
		else
			setSelectedNominations((prev) => {
				return [...prev, nominationID];
			});
	};

	useEffect(() => {
		setTotalVotes(poll.votesPerVoter);
	}, []);

	return (
		<div className='min-h-screen p-4 flex flex-col justify-around items-center bg-gray-800 text-white'>
			<h1 className='text-3xl font-bold text-center'>Voting Page</h1>
			<div className='flex flex-col items-center gap-4'>
				<p className='text-xl'>Select your top {poll.votesPerVoter} choices</p>
				<p className='text-xl text-green-300'>
					{poll.votesPerVoter - selectedNominations.length} votes remaining
				</p>
				<div className='mt-4'>
					{poll.nominations.map((nom, idx) => (
						<div
							key={idx}
							onClick={() => handleNominationSelection(nom.nominationID)}
							className={`w-full mb-4 text-xl cursor-pointer bg-gray-900 p-2 px-6 rounded-lg ${
								getNomIdx(nom.nominationID) !== -1 ? "border-2" : ""
							}`}
						>
							{nom.name}
						</div>
					))}
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<button className='w-full block bg-green-700 mt-4 px-5 py-3 rounded-md'>
					Submit Votes
				</button>
				<button className='w-full block bg-orange-700 mt-4 px-5 py-3 rounded-md'>
					Cancel Poll
				</button>
			</div>
		</div>
	);
};

export default VotingPageModule;
