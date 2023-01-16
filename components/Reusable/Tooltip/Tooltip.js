import { memo, useState } from "react";
import cx from "classnames";
import {
	useFloating,
	offset,
	flip,
	shift,
	autoUpdate,
	useInteractions,
	useHover,
} from "@floating-ui/react";
const Tooltip = ({
	children,
	placement = "top",
	text = "test",
	bgColor,
	textColor,
}) => {
	const [open, setOpen] = useState(false);
	const { x, y, refs, floating, strategy, context } = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		middleware: [offset(8), flip(), shift({ padding: 8 })],
		whileElementsMounted: autoUpdate,
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useHover(context, { delay: { open: 300 } }),
	]);
	return (
		<div>
			{open && (
				<div
					ref={refs.setFloating}
					style={{
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
						width: "max-content",
					}}
					className={cx(
						"bg-black text-white rounded-lg shadow-md px-4 py-2",
						bgColor,
						textColor
					)}
					{...getReferenceProps()}
				>
					{text}
				</div>
			)}

			<span ref={refs.setReference}>{children}</span>
		</div>
	);
};

export default memo(Tooltip);
