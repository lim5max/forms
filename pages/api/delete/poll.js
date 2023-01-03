// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function DeletePollById(req, res) {
	// 	const supabase = createServerSupabaseClient({ req, res });
	const session = await unstable_getServerSession(req, res, authOptions);
	console.log(session);
	const pollId = req.body;
	try {
		await prisma.poll.findFirst({
			where: {
				user: {
					id: session.user.id,
				},
				id: pollId,
			},
		});
		await prisma.anonymousUserAnwer.deleteMany({
			where: {
				poll: {
					id: pollId,
				}
			}
		});
		await prisma.pollCard.deleteMany({
			where: {
				poll: {
					id: pollId,
				},
			},
		});
		await prisma.poll.delete({
			where: {
				id: pollId,
			},
		});
		const polls = await prisma.poll.findMany({
			where: {
				userId: session.user.id,
			},
		});
		return res.status(200).json(polls);

	} catch (e) {
		console.log(e);
		
		return res.status(400).json(false);
	}

	// 	if (req.method === "POST") {
	// 		//   const { error } = await supabase
	// 		//     .from('poll')
	// 		//     .delete()
	// 		//     .eq('id', req.body)
	// 		const { data, error } = await supabase
	// 			.from("poll_card")
	// 			.select(
	// 				`
	//                 poll!inner(*)
	//                 `
	// 			)
	// 			.eq("poll.id", req.body);
	// 		console.log(error, data);
	// 		return res.status(200).json(true);
	// 	}
}
