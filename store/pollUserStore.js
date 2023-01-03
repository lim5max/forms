import create from "zustand";
// import { immer } from "zustand/middleware/immer";
import produce from "immer";
const immer = (config) => (set, get) => config((fn) => set(produce(fn)), get);

const store = (set) => ({
	pollId: null,
	pollCards: [],
	resetStore: () => {
		set((state) => {
			state.pollId = null;
			state.pollCards = [];
		});
	},
	setPollId: (pollId) => set({ pollId }),
	initializeStore: (pollId, pollCards) => {
		set((state) => {
			state.pollId = pollId;
			state.pollCards = pollCards.map((card) => {
				return {
					id: card.id,
					options: card.options,
					userAnswers: [-1],
				};
			});
		});
	},
	updatePollCardOption: (pollCardId, optionId, option) => {
		set((state) => {
			const pollCardIndex = state.pollCards.findIndex(
				(card) => card.id === pollCardId
			);
			const optionIndex = state.pollCards[
				pollCardIndex
			].options.findIndex((option) => option.id === optionId);
			state.pollCards[pollCardIndex].options[optionIndex].option = option;
		});
	},
	updateUserRadioAnswer: (pollCardId, answer) => {
		set((state) => {
			const pollCardIndex = state.pollCards.findIndex(
				(card) => card.id === pollCardId
			);
			state.pollCards[pollCardIndex].userAnswers = answer;
		});
	},
	updateUserMultipleAnswer: (pollCardId, answer) => {
		set((state) => {
			const pollCardIndex = state.pollCards.findIndex(
				(card) => card.id === pollCardId
			);

			const findAnswer =
				state.pollCards[pollCardIndex].userAnswers.indexOf(answer);
			console.log(findAnswer, "ubdex");
			if (findAnswer === -1) {
				state.pollCards[pollCardIndex].userAnswers.push(answer);
			} else {
				state.pollCards[pollCardIndex].userAnswers.splice(
					findAnswer,
					1
				);
			}
		});
	},
	saveUserAnswers: () => {
		set(async (state) => {
			const response = await fetch(`/api/create/user_answer`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					pollId: state.pollId,
					pollCards: state.pollCards,
				}),
			});
			const data = await response.json();
			return data;
		});
	},
	consolePoll: () => {
		set((state) => {
			console.log(state.pollCards);
		});
	},
});

const usePollUserStore = create(immer(store));
export default usePollUserStore;
