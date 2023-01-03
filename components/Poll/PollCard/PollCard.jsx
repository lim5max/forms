import usePollSrore from "../../../store/pollStore";
import { memo, useState, useEffect, useRef } from "react";
import PollCardQuestion from "./PollCardQuestion.jsx";
import PollCardSettings from "./PollCardSettings";
import PollCardOption from "./PollCardOption";
import { Cross2Icon } from "@radix-ui/react-icons";
import { PlusCircledIcon } from "@radix-ui/react-icons";
function PollCard({ pollCardId }) {
	const removePollCard = usePollSrore((state) => state.removePollCard);
	const addNewOption = usePollSrore((state) => state.addNewOption);
	const [openAlert, setOpenAlert] = useState(false);
	const timerRef = useRef(0);
	const options = usePollSrore((state) => {
		const cardIndex = state.pollCards.findIndex(
			(card) => card.id === pollCardId
		);
		return state.pollCards[cardIndex].options;
	});
	const optionsType = usePollSrore((state) => {
		const cardIndex = state.pollCards.findIndex(
			(card) => card.id === pollCardId
		);
		return state.pollCards[cardIndex].optionsType;
	});

	console.log(options + " - options");
	function handleDelete(event) {
		removePollCard(pollCardId);
	}
	function handleAddNewOption(event) {
		if (options[options.length - 1].option !== "") {
			addNewOption(pollCardId);
		} else {
		}
	}
	useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	console.log("render card" + pollCardId);
	return (
		<div className="relative  w-full flex flex-col p-6  bg-stone-50/50 border shadow-lg shadow-stone-100/90 rounded-xl">
			<div className="flex w-full items-center justify-between  ">
				<PollCardSettings pollCardId={pollCardId} />
				<button className="place-self-center" onClick={handleDelete}>
					<div className="flex items-center p-2 justify-center rounded-full bg-black">
						<Cross2Icon className="h-6 w-6 font-bold text-white" />
					</div>
				</button>
			</div>

			<span className="w-full block mt-5"></span>
			<PollCardQuestion pollCardId={pollCardId} />
			<ul className="flex flex-col space-y-2 mt-2">
				{options.map((option, index) => (
					<PollCardOption
						optionId={option.id}
						pollCardId={pollCardId}
						optionsType={optionsType}
						firstOption={index === 0}
						key={option.id}
					/>
				))}
			</ul>

			<button
				onClick={handleAddNewOption}
				className="w-full mx-auto py-2 flex items-center justify-center mt-6  bg-neutral-100/80 rounded-xl"
			>
				<PlusCircledIcon className="w-8 h-8" />
			</button>
		</div>
	);
}
export default memo(PollCard);
