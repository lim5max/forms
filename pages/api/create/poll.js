// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import cuid from "cuid";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prismadb";

export default async function CreatePoll(req, res) {
	const session = await unstable_getServerSession(req, res, authOptions);
	//
	if (req.method === "POST") {
		const store = JSON.parse(req.body);
		const poll_id = cuid();
		try {
			await prisma.poll.create({
				data: {
					id: poll_id,
					slug: "",
					title: store["pollTitle"],
					description: store["pollDescription"],
					user: {
						connect: {
							id: session.user.id,
						},
					},
				},
			});
			for (let i = 0; i < store.pollCards.length; i++) {
				const card = store.pollCards[i];
				// get only option from options array and create new one
				let options = card.options.map((option) => option.option);
				if (options[options.length - 1] === "") {
					console.log(1);
					options = options.slice(0, -1);
				}
				await prisma.pollCard.create({
					data: {
						index: i,
						question: card.question,
						required: false,
						optionsType: card.optionsType,
						options: options,
						poll: {
							connect: {
								id: poll_id,
							},
						},
					},
				});
			}
		} catch (e) {
			console.log(e);
			return res.status(400).json({ error: e.message });
		}

		return res.status(200).json(true);
	}
}
