import PollTitle from "../../../components/Poll/PollTitle/PollTitle";
import usePollStore from "../../../store/pollStore";
import PollCard from "../../../components/Poll/PollCard/PollCard";
import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Share2Icon, Cross1Icon } from "@radix-ui/react-icons";
import cx from "classnames";
import { useRouter } from "next/router";

import { useState, Fragment } from "react";
export default function CreatePoll() {
	const state = usePollStore.getState();
	const router = useRouter();
	const pollCards = usePollStore((state) => state.pollCards);
	const addPollCard = usePollStore((state) => state.addPollCard);
	const resetStore = usePollStore((state) => state.resetStore);
	let [isOpen, setIsOpen] = useState(false);
	console.log(usePollStore());
	function consolePoll() {
		console.log(state);
	}
	async function handleSave() {
		console.log("save");
		const data = await fetch("/api/create/poll", {
			method: "POST",
			headers: {},
			body: JSON.stringify(state),
		});
		if (data.status === 200) {
			setIsOpen(false);
			resetStore();
			router.push("/admin/");
		} else {
			alert("Ошибка");
		}
	}
	return (
		<div className="flex flex-col items-center justify-center p-4 mx-auto md:w-2/3">
			<DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
				<div className="w-full flex items-center justify-end mb-4">
					<DialogPrimitive.Trigger asChild>
						<button className="flex items-center p-2 shadow border rounded active:scale-95 transition">
							<Share2Icon className="w-6 h-6" />
						</button>
					</DialogPrimitive.Trigger>
				</div>
				<PollTitle className="mb-12 block mt-4" />
				<div className="flex flex-col space-y-6 mt-4 w-full">
					{pollCards.map((pollCard) => (
						<PollCard key={pollCard.id} pollCardId={pollCard.id} />
					))}
				</div>

				<button
					className="mt-4 group relative inline-block rounded-2xl bg-black text-white px-4 py-2 "
					onClick={addPollCard}
				>
					<span className="text-sm font-medium transition-opacity group-hover:opacity-0">
						Карточка с ответами
					</span>
					<span className="absolute text-3xl inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
						+
					</span>
				</button>
				<DialogPrimitive.Portal forceMount>
					<Transition.Root show={isOpen}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<DialogPrimitive.Overlay
								forceMount
								className="fixed inset-0 z-30 bg-black/50"
							/>
						</Transition.Child>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<DialogPrimitive.Content
								forceMount
								className={cx(
									"fixed z-50",
									"w-[95vw] max-w-md rounded-lg p-4 md:w-full",
									"top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
									"bg-white ",
									"focus:outline-none focus-visible:ring focus-visible:ring-pink-500 focus-visible:ring-opacity-75"
								)}
							>
								<DialogPrimitive.Title className="text-lg mt-2 font-medium text-black">
									Публикация опроса
								</DialogPrimitive.Title>
								<DialogPrimitive.Description className="mt-2 text-md font-normal text-neutral-600 ">
									Нажимая кнопку &apos;Сохранить&apos; вы
									даете согласие на публицаю вашего опроса в
									сети, убедитесь в корректности введенных
									данных. <br /> Cтатистику по каждому опросу
									в отдельности можно посмотреть в личном
									кабинете в любое удобное время 😃
								</DialogPrimitive.Description>
								<div className="mt-4 flex justify-end">
									<DialogPrimitive.Close
										className={cx(
											"inline-flex select-none justify-center rounded-lg w-full px-4 py-2 text-md font-medium",
											"bg-pink-600 text-white hover:bg-pink-700 dark:bg-pink-700 dark:text-gray-100 dark:hover:bg-pink-600",
											"border ",
											"transition focus:outline-none focus-visible:ring focus-visible:ring-pink-500 focus-visible:ring-opacity-75"
										)}
										onClick={handleSave}
									>
										Сохранить
									</DialogPrimitive.Close>
								</div>

								<DialogPrimitive.Close
									className={cx(
										"absolute top-3.5 right-3.5 inline-flex items-center justify-center  p-2 rounded-lg shadow bg-neutral-50",
										"focus:outline-none focus-visible:ring focus-visible:ring-pink-500 focus-visible:ring-opacity-75"
									)}
								>
									<Cross1Icon className="h-6 w-6 text-black	 font-bold " />
								</DialogPrimitive.Close>
							</DialogPrimitive.Content>
						</Transition.Child>
					</Transition.Root>
				</DialogPrimitive.Portal>
			</DialogPrimitive.Root>
		</div>
	);
}
