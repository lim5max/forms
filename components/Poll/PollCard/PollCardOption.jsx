import usePollStore from "../../../store/pollStore";
import TextArea from "../../Reusable/TextArea/TextArea.jsx";
import TextareaAutosize from 'react-autosize-textarea';
import { memo } from "react";
import { MinusCircledIcon } from "@radix-ui/react-icons";
export default function PollCardOption({
	pollCardId,
	optionId,
	optionsType,
	firstOption,
}) {
	const removeOption = usePollStore((state) => state.removeOption);
	const updateOption = usePollStore((state) => state.updateOption);
	const optionValue = usePollStore((state) => {
		const cardIndex = state.pollCards.findIndex(
			(card) => card.id === pollCardId
		);
		const optionIndex = state.pollCards[cardIndex].options.findIndex(
			(option) => option.id === optionId
		);
		return state.pollCards[cardIndex].options[optionIndex].value;
	});
	console.log(optionsType);
	function handleDelete(event) {
		removeOption(pollCardId, optionId);
	}
	function handleChange(event) {
		updateOption(pollCardId, optionId, event.target.value);
	}
	return (
		<li className="flex flex-row items-center space-x-2">
			{(() => {
				switch (optionsType) {
					case "radio":
						return (
							<input
								type="radio"
								className="w-6 h-6  rounded-full bg-neutral-500/90"
								disabled
							/>
						);
					case "multiple":
						return (
							<input
								type="checkbox"
								className="w-6 h-6  rounded-xl bg-neutral-500/90"
								disabled
							/>
						);

					default:
						return (
							<input
								type="radio"
								className="w-6 h-6 disabled rounded-full bg-neutral-100/50"
								disabled
							/>
						);
				}
			})()}
			<TextareaAutosize
				onChange={handleChange}
				value={optionValue}
				placeholder="Введите вариант ответа ✅"
				className="focus:outline-1 focus:outline-black text-xl font-semibold tracking-normal overflow-auto h-auto p-2 border-none focus:border-none  bg-transparent w-full  resize-none "
			/>

			{!firstOption && (
				<button
					className="w-5 h-5 rounded-full bg-neutral-100/50"
					onClick={handleDelete}
				>
					<MinusCircledIcon className="w-6 h-6" />
				</button>
			)}
		</li>
	);
}
