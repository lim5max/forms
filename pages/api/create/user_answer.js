// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import cuid from "cuid";
export default async function CreatePoll(req, res) {
	if (req.method === "POST") {
		console.log(req.body);
		for (let i = 0; i < req.body.pollCards.length; i++) {
			try {
				await prisma.anonymousUserAnwer.create({
					data: {
						pollCard: {
							connect: {
								id: req.body.pollCards[i].id,
							},
						},
						poll: {
							connect: {
								id: req.body.pollId,
							},
						},
						userAnswer: req.body.pollCards[i].userAnswers.slice(1),
					},
				});
			} catch (e) {
				console.log(e);
				return res.status(400).json({ error: e.message });
			}
		}
		return res.status(200).json(true);
	}
}
