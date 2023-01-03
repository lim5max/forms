import * as Popover from "@radix-ui/react-popover";
import { memo, useRef } from "react";

const Tooltip = ({ children, content }) => {
	function handleCloseAfterDelay(open) {
		console.log(open);
	}
	return (
		<Popover.Root onOpenChange={handleCloseAfterDelay}>
			<Popover.Trigger>{children}</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content side="top" sideOffset="1">
					{content}
					<Popover.Arrow />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};
export default memo(Tooltip);
