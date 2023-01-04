//create simple admin page with button create poll
// import link frin next/link
import prisma from "../../lib/prismadb";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import {
	Share2Icon,
	Share1Icon,
	EyeOpenIcon,
	DownloadIcon,
	Cross2Icon,
} from "@radix-ui/react-icons";
import { getSession } from "next-auth/react";

import Tooltip from "../../components/Reusable/Tooltip/Tooltip";
function AdminPage({ polls }) {
	const router = useRouter();
	const [parsedPolls, setPolls] = useState(polls);
	console.log(polls);
	const [loading, setLoading] = useState(false);
	// updated polls on delete then refetch
	let handleDeletePoll = async (pollId) => {
		setLoading(true);
		const res = await fetch("/api/delete/poll", {
			method: "POST",
			body: pollId,
		});
		if (res.status === 200) {
			const updatedPolls = await res.json();
			console.log(updatedPolls, "mapped");
			setPolls(updatedPolls);
			setLoading(false);
		}
		// router.reload(window.location.pathname);
	};
	function handleCopy(pollId) {
		if (typeof window !== "undefined") {
			document.getElementById(pollId).style.display = "none";
			document.getElementById(pollId).style.display = "block";
			navigator.clipboard.writeText(
				`${document.location.origin}/poll/${pollId}`
			);

			setTimeout(() => {
				document.getElementById(pollId).style.display = "none";
			}, 1000);
		}
	}
	return (
		<div>
			<div className="w-full flex justify-end">
				<div className="flex items-center space-x-2 ml-auto">
					<span className="block text-3xl">👉</span>
					<Link
						className="font-medium text-base bg-pink-400 text-white px-4 py-2 rounded-xl active:scale-95 block transition"
						href="/admin/create"
					>
						создать опрос
					</Link>
				</div>
			</div>

			<div className="flex flex-col space-y-4 lg:mt-6 mt-4">
				{!loading &&
					parsedPolls &&
					parsedPolls.map((poll) => {
						return (
							<div
								key={poll.id}
								className="flex flex-col items-center justify-center p-4 mx-auto w-full lg:w-2/3 shadow-xl border-neutral-300 shadow-neutral-200 rounded-2xl "
							>
								<div className="w-full flex items-center justify-end mb-4 space-x-3">
									<button
										className="flex items-center p-2 shadow border rounded active:scale-95 transition"
										onClick={() =>
											router.push(`/poll/${poll.id}`)
										}
									>
										<EyeOpenIcon className="w-6 h-6" />
									</button>
									<button
										className="flex items-center p-2 shadow border rounded active:scale-95 transition relative"
										onClick={() => handleCopy(poll.id)}
									>
										<span
											className="absolute text-lg font-medium -top-8 left-[-100%] transform-x-[50%] hidden"
											id={poll.id}
										>
											Скопировано
										</span>
										<Share1Icon className="w-6 h-6" />
									</button>
									<button className="flex items-center p-2 shadow border rounded active:scale-95 transition">
										<DownloadIcon className="w-6 h-6" />
									</button>
									<button
										onClick={() =>
											handleDeletePoll(poll.id)
										}
										className="flex items-center p-2 shadow shadow-rose-600 bg-rose-500  rounded active:scale-95 transition"
									>
										<Cross2Icon className="w-6 h-6 text-white" />
									</button>
								</div>
								<h1 className="text-3xl font-medium w-full text-left mb-12 block mt-4">
									{poll.title}
								</h1>
								<div className="flex flex-col items-center justify-center w-full"></div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);
	// console.log(session.user.id);
	// if (session) {
	const polls = await prisma.poll.findMany({
		where: {
			userId: session.user.id,
		},
	});
	// }

	return {
		props: { polls: JSON.parse(JSON.stringify(polls)) },
	};
}

export default AdminPage;
