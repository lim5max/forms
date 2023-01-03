import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import global from "global";
import cx from "classnames";
import Link from "next/link";
import { memo } from "react";
import { signOut } from "next-auth/react";
const Menu = () => {
	function handleExit(event) {
		signOut({ redirect: true, callbackUrl: "/" });
	}
	return (
		<div className="relative inline-block text-left font-sans">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					className={cx(
						"select-none font-semibold text-xl bg-black text-white px-4 py-2 rounded-xl  block  "
					)}
				>
					Меню
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal>
					<DropdownMenu.Content
						align="end"
						sideOffset={5}
						className={cx(
							"radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
							"w-48 rounded-lg  px-1.5 py-1 shadow-md md:w-64",
							"bg-neutral-50  "
						)}
					>
						<DropdownMenu.Item
							className={cx(
								"  flex cursor-default select-none items-center rounded-md px-2 py-2 outline-none ",
								"text-neutral-800  focus:bg-neutral-200/80 font-medium text-lg"
							)}
							asChild
						>
							<Link href="/admin" className="">
								Личный кабинет
							</Link>
						</DropdownMenu.Item>
						<DropdownMenu.Item
							className={cx(
								"flex cursor-default select-none items-center rounded-md px-2 py-2  outline-none",
								"text-neutral-800 focus:bg-neutral-200/80 font-medium text-lg"
							)}
							onClick={handleExit}
							asChild
						>
							<span>Выйти</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	);
};

export default memo(Menu);
