import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import usePollUserStore from "../../store/pollUserStore";
import cx from "classnames";
import PollUserRadioCard from "../../components/Poll/PollUserCard/PollUserRadioCard";
import PollUserMultipleCard from "../../components/Poll/PollUserCard/PollUserMultipleCard";
import { useRouter } from "next/router";
import prisma from "../../lib/prismadb";
function PollPage({ poll, pollCards }) {
	const initializeStore = usePollUserStore((state) => state.initializeStore);
	initializeStore(poll.id, pollCards);
	const router = useRouter();
	const saveUserAnswers = usePollUserStore((state) => state.saveUserAnswers);
	async function handleSaveUserAnswers() {
		saveUserAnswers();
		initializeStore(poll.id, pollCards);
		// router.reload(window.location.pathname)
		router.replace("thanks/");
	}
	console.log(poll);
	return (
		<main className="overflow-hidden max-w-screen bg-[#f8edde] min-h-screen text-black font-montserrat subpixel-antialiased pb-8 md:px-0 ">
			<div className={"fixed  w-screen h-screen -z-10"}></div>
			<div className="mt-8 w-full grid grid-cols-2 font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl border-t-4  border-b-4 border-black ">
				<div
					className={cx(
						"col-span-1 outline-title flex items-center justify-end bg-[#b918e7] text-[#46e718] py-3 px-3 border-r-2 border-black"
					)}
					style={{
						textShadow:
							"-1px 0 black, 0 -1px black, 1px 0 black, 0 1px black, 1px 1px black, -1px -1px black, -1px 1px black, 1px -1px black, 2.5px 2.5px black",
						strokeLinejoin: "round",
					}}
				>
					CODDY
				</div>
				<div
					className="col-span-1 flex items-center justify-start bg-[#46e718] text-[#b918e7] py-3  px-3 border-l-2 border-black"
					style={{
						textShadow:
							"-1px 0 black, 0 -1px black, 1px 0 black, 0 1px black, 1px 1px black, -1px -1px black, -1px 1px black, 1px -1px black, 2.5px 2.5px black",
					}}
				>
					FORMS
				</div>
			</div>
			<div className="px-3 md:px-0">
				<div
					className="bg-[#ffac05] mx-auto max-w-2xl px-8 py-4 mt-8 rounded-xl border-4 border-black "
					style={{
						boxShadow: "3px 3px 0px black",
					}}
				>
					<h1 className="text-4xl font-extrabold tracking-tight ">
						{poll.title}
					</h1>
					<h2 className="text-lg lg:text-xl font-semibold mt-4 ">
						{poll.description}
					</h2>
				</div>

				<ul className="flex flex-col space-y-4 mt-8 max-w-2xl mx-auto">
					{pollCards.map((pollCard, index) => (
						<div key={index}>
							{pollCard.optionsType === "radio" && (
								<PollUserRadioCard pollCard={pollCard} />
							)}
							{pollCard.optionsType === "multiple" && (
								<PollUserMultipleCard pollCard={pollCard} />
							)}
						</div>
					))}
				</ul>
				<button
					className=" max-w-2xl px-4 py-8 mx-auto block bg-[#46e718] w-full mt-4 text-2xl font-black tracking-wide "
					style={{
						boxShadow: "3px 3px 0px black",
					}}
					onClick={handleSaveUserAnswers}
				>
					Отправить
				</button>
			</div>
		</main>
	);
}

export async function getServerSideProps(ctx) {
	const { req, res, params } = ctx;
	const session = await unstable_getServerSession(req, res, authOptions);
	console.log(session, params);
	const poll = await prisma.poll.findFirst({
		where: {
			id: params.poll_id,
		},
	});
	if (poll === null || poll === undefined || poll === []) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	const pollCards = await prisma.pollCard.findMany({
		where: {
			poll: {
				id: params.poll_id,
			},
		},
	});
	if (!pollCards) {
		return {
			redirect: "/",
		};
	}
	return {
		props: { poll: JSON.parse(JSON.stringify(poll)), pollCards: pollCards },
	};
}
export default PollPage;
