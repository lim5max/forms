import create from "zustand";
import { persist } from "zustand/middleware";
// import { immer } from "zustand/middleware/immer";
import produce from "immer";
const immer = (config) => (set, get) => config((fn) => set(produce(fn)), get);

const store = (set) => ({
	pollId: null,
	pollTitle: "",
	pollDescription: "",
	pollCards: [],
	consolePoll: () => {
		set((state) => {
			// console.log(state.pollTitle);
		});
	},
	resetStore: () => {
		set((state) => {
			state.pollId = null;
			state.pollTitle = "";
			state.pollDescription = "";
			state.pollCards = [];
		});
	},
	setPollId: (pollId) => set({ pollId }),
	updatePollTitle: (newPollTitle) =>
		set((state) => {
			state.pollTitle = newPollTitle;
		}),
	updatePollDescription: (newPollDescription) =>
		set((state) => {
			state.pollDescription = newPollDescription;
		}),
	addPollCard: () => {
		console.log(generateId());
		set((state) => {
			state.pollCards.push({
				id: generateId(),
				question: "",
				optionsType: "radio",
				options: [
					{
						id: generateId(),
						option: "",
					},
				],
			});
		});
	},
	removePollCard: (id) => {
		set((state) => {
			state.pollCards = state.pollCards.filter(
				(pollCard) => pollCard.id !== id
			);
		});
	},
	updatePollCardQuestion: (pollCardId, question) => {
		set((state) => {
			const pollCardIndex = state.pollCards.findIndex(
				(card) => card.id === pollCardId
			);
			state.pollCards[pollCardIndex].question = question;
		});
	},
	addPollCardOption: (pollCardId) => {
		set((state) => {
			const pollCardIndex = state.pollCards.findIndex(
				(card) => card.id === pollCardId
			);
			state.pollCards[pollCardIndex].options.push({
				id: generateId(),
				option: "",
			});
		});
	},
	removePollCardOption: (pollCardId, optionId) => {
		set((state) => {
			const pollCardIndex = state.pollCards.findIndex(
				(card) => card.id === pollCardId
			);
			state.pollCards[pollCardIndex].options = state.pollCards[
				pollCardIndex
			].options.filter((option) => option.id !== optionId);
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
	setPollCardOptionType: (pollCardId, type) => {
		set((state) => {
			const pollCardIndex = state.pollCards.findIndex(
				(card) => card.id === pollCardId
			);
			state.pollCards[pollCardIndex].optionsType = type;
		});
	},
	addNewOption: (pollCardId) => {
		set((state) => {
			const pollCardIndex = state.pollCards.findIndex(
				(card) => card.id === pollCardId
			);
			state.pollCards[pollCardIndex].options.push({
				id: generateId(),
				option: "",
			});
		});
	},
	removeOption: (pollCardId, optionId) => {
		set((state) => {
			const pollCardIndex = state.pollCards.findIndex(
				(card) => card.id === pollCardId
			);
			state.pollCards[pollCardIndex].options = state.pollCards[
				pollCardIndex
			].options.filter((option) => option.id !== optionId);
		});
	},
	updateOption: (pollCardId, optionId, option) => {
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
	consolePoll: () => {
		set((state) => {
			console.log(state.pollCards);
		});
	},
});

const usePollStore = create(immer(store));
export default usePollStore;

function generateId() {
	return Math.random().toString(36).substr(2, 9);
}

//create function that returns random PollCardId
//create function that returns random PollCardOptionId

//create function that returns random PollCardId
function generatePollCardId() {
	return Math.random().toString(36).substr(2, 9);
}
