import { memo, useState } from "react";
import cx from "classnames";
import * as Checkbox from "@radix-ui/react-checkbox";
import usePollUserStore from "../../../store/pollUserStore";
const PollUserMultipleCard = ({ pollCard }) => {
	// const [radioOption, setRadioOption] = useState(null);
	const userAnswers = usePollUserStore((state) => {
		const pollCardIndex = state.pollCards.findIndex(
			(card) => card.id === pollCard.id
		);
		return state.pollCards[pollCardIndex].userAnswers;
	});
    const updateUserMultipleAnswer = usePollUserStore((state)=> state.updateUserMultipleAnswer)
	
	function handleCheckboxChange(option, index) {
		console.log(option, index);
        updateUserMultipleAnswer(pollCard.id, option)
        console.log(userAnswers)
		// updateUserMultipleAnswer(pollCard.id, answer);
	}
	const state = usePollUserStore();
	console.log(state);
	return (
		<div
			className="flex flex-col space-y-2 px-8 py-4 bg-white border-4 border-black "
			style={{
				boxShadow: "3px 3px 0px black",
			}}
		>
			<h3
				className="text-2xl font-bold "
				style={{
					textShadow: "1px 1px white",
				}}
			>
				{pollCard.question}
			</h3>

			<ul className="flex flex-col space-y-2">
				{pollCard.options.map((option, index) => (
					<li className="flex items-center space-x-4" key={index}>
						<input
							type="checkbox"
							id={`${index}${pollCard.id}`}
							key={index}
							value={option}
							onChange={() => handleCheckboxChange(option, index)}
							className="w-10 h-10 appearance-none rounded-lg bg-transparent flex items-center justify-center border-4 border-black focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
							style={{
								boxShadow: "2.5px 0px 0px black",
							}}
						/>

						{/* <Checkbox.Root
							id={`${index}${pollCard.id}`}
							value={option}
							className={cx(
								"peer relative w-10 h-10  rounded-lg bg-transparent flex items-center justify-center",
								"border border-transparent ",
								"radix-state-checked:border-4 radix-state-checked:border-neutral-700 radix-state-checked: radix-state-checked:shadow-none",
								"radix-state-unchecked:border-4 radix-state-unchecked:border-neutral-700 ",
								"focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
							)}
							key={index}
							style={{
								boxShadow: "2.5px 0px 0px black",
							}}
                            onCheckedChange={setMultipleOption}
						>
							<Checkbox.Indicator
								className={
									"w-6 h-6  rounded-md flex items-center justify-center  bg-purple-700  absolute z-20"
								}
							></Checkbox.Indicator>
						</Checkbox.Root> */}
						<label
							className="text-xl font-medium "
							htmlFor={`${index}${pollCard.id}`}
						>
							{option}
						</label>
					</li>
				))}
			</ul>

			{/* <button onClick={() => console.log(state)}>cls</button> */}
		</div>
	);
};

export default memo(PollUserMultipleCard);
