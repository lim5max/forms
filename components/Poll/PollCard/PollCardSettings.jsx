import { memo, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import cx from "classnames";
import usePollStore from "../../../store/pollStore";
import Tooltip from "../../Reusable/Tooltip/Tooltip";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import * as Toggle from "@radix-ui/react-toggle";
const PollCardSettings = ({ pollCardId }) => {
	const [required, setRequired] = useState(false);
	const setPollCardOptionType = usePollStore(
		(state) => state.setPollCardOptionType
	);
	const setPollCardRequired = usePollStore(
		(state) => state.setPollCardRequired
	);

	function setOptionType(value) {
		setPollCardOptionType(pollCardId, value);
	}
	function handleRequired(value) {
		setPollCardRequired(pollCardId, value);
		setRequired(value);
	}
	return (
		<form className=" flex space-x-1">
			<RadioGroup.Root
				defaultValue={"radio"}
				onValueChange={setOptionType}
			>
				<div className="flex space-x-1">
					<Tooltip text="Единственный выбор">
						<div>
							<RadioGroup.Item
								id="radio"
								value="radio"
								className={cx(
									"peer relative w-12 h-12  rounded-2xl  flex items-center justify-center",
									// Setting the background in dark properly requires a workaround (see css/tailwind.css)
									"border border-transparent ",
									"radix-state-checked:border-4 radix-state-checked:border-purple-700",
									"radix-state-unchecked:border-4 radix-state-unchecked:border-neutral-700 ",
									"focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
								)}
							>
								<div
									className={
										"w-8 h-8 bg-black rounded-full flex items-center justify-center   data-[state=checked]:bg-purple-700 absolute z-20"
									}
								></div>
								<div className="w-4 h-4 rounded-full bg-white absolute z-30"></div>
								<RadioGroup.Indicator
									className={
										"w-8 h-8  rounded-full flex items-center justify-center   data-[state=checked]:bg-purple-700 absolute z-20"
									}
								></RadioGroup.Indicator>
							</RadioGroup.Item>
						</div>
					</Tooltip>
					<Tooltip text="Множественный выбор">
						<div>
							<RadioGroup.Item
								id="multiple"
								value="multiple"
								className={cx(
									"peer group relative w-12 h-12  rounded-2xl  flex items-center justify-center bg-transparent",
									// Setting the background in dark properly requires a workaround (see css/tailwind.css)
									"border border-transparent ",
									"radix-state-checked:border-4 radix-state-checked:border-purple-700",
									"radix-state-unchecked:border-4 radix-state-unchecked:border-neutral-700 ",
									"focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800",
									""
								)}
							>
								<div className="w-3 h-3 rounded bg-white absolute z-30"></div>
								<div className="w-8 h-8 bg-neutral-900  rounded-lg flex items-center justify-center absolute z-10"></div>
								<RadioGroup.Indicator
									className={
										"w-8 h-8  rounded-lg flex items-center justify-center   data-[state=checked]:bg-purple-700 absolute z-20"
									}
								></RadioGroup.Indicator>
							</RadioGroup.Item>
						</div>
					</Tooltip>
				</div>
			</RadioGroup.Root>
			<Toggle.Root
				className={cx("w-12 h-12 rounded-2xl border-black border-4  flex items-center justify-center",
				required ? "border-purple-500" : "")}
				aria-label="Toggle italic"
				onPressedChange={handleRequired}
			>
				<ExclamationTriangleIcon className={cx("w-5 h-5", required ? "text-purple-500" : "")} />
			</Toggle.Root>
		</form>
	);
};
export default memo(PollCardSettings);
