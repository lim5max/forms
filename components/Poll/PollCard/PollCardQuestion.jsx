import { memo, useState, useCallback } from "react";
import usePollStore from "../../../store/pollStore";
import TextArea from "../../Reusable/TextArea/TextArea.jsx";

function PollCardQuestion({ pollCardId }) {
	const question = usePollStore((state) => {
		const cardIndex = state.pollCards.findIndex(
			(card) => card.id === pollCardId
		);
		return state.pollCards[cardIndex].question;
	});
	const updatePollCardQuestion = usePollStore(
		(state) => state.updatePollCardQuestion
	);
	console.log(question);

	function handleChange(event) {
		updatePollCardQuestion(pollCardId, event.target.value);
	}

	return (
		<TextArea
			onChange={handleChange}
			value={question}
			placeholder="Так, и какой вопрос ты введешь 🤔 ?"
			styles="mt-4 focus:outline-1 focus:outline-black text-3xl font-bold tracking-tight overflow-auto h-auto p-2"
		/>
	);
}
export default memo(PollCardQuestion);
