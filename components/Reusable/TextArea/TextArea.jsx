import { useEffect, useRef, memo } from "react";

const TextArea = ({ value, onChange, placeholder, styles }) => {
	const textareaRef = useRef(null);
	useEffect(() => {
		if (textareaRef && textareaRef.current) {
			textareaRef.current.style.height = "auto";
			const scrollHeight = textareaRef.current.scrollHeight;
			textareaRef.current.style.height = scrollHeight   +  "px";
		}
	}, [value]);

	return (
		<textarea
			value={value}
			ref={textareaRef}
			placeholder={placeholder}
			className={
				"border-none focus:border-none  bg-transparent w-full  resize-none " +
				styles
			}
			// className="border-none w-full rounded-lg resize-none text-md overflow-auto h-auto padding-8 shadow-lg p-2"
			onChange={onChange}
			rows={1}
		/>
	);
};
export default memo(TextArea);
