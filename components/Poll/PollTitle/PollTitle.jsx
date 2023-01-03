import TextArea from "../../Reusable/TextArea/TextArea.jsx";
import usePollStore from "../../../store/pollStore";
export default function PollTitle() {
	const PollTitle = usePollStore((state) => state.pollTitle);
	const PollDescription = usePollStore((state) => state.pollDescription);
	const updatePollTitle = usePollStore((state) => state.updatePollTitle);
	const updatePollDescription = usePollStore(
		(state) => state.updatePollDescription
	);
	function handleTitleChange(event) {
		updatePollTitle(event.target.value);
	}
	function handleDescriptionChange(event) {
		updatePollDescription(event.target.value);
	}

	return (
		<div className="relative w-full  bg-neutral-100/20 backdrop-blur-lg  shadow-md shadow-neutral-200 rounded-xl px-6 py-6 space-y-2">
			<p className="text-sm absolute top-1 left-2 text-neutral-600/50 font-bold">
				Основная информация*
			</p>
			<TextArea
				value={PollTitle}
				onChange={handleTitleChange}
				placeholder="Названия опроса 👀"
				styles="focus:outline-2 focus:outline-black text-5xl font-black tracking-tight overflow-auto h-auto p-2 "
			/>
			<TextArea
				value={PollDescription}
				onChange={handleDescriptionChange}
				placeholder="Описание опроса 📝"
				styles="focus:outline-1 focus:outline-black text-2xl font-semibold tracking-normal overflow-auto h-auto p-2 pl-3"
			/>
		</div>
	);
}
