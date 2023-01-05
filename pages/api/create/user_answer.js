// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import cuid from "cuid";
import prisma from "../../../lib/prismadb";

export default async function CreatePoll(req, res) {
	if (req.method === "POST") {
		console.log(req.body);
		const userSession = cuid();
		for (let i = 0; i < req.body.pollCards.length; i++) {
			let userAnswer = "";
			if (req.body.pollCards[i].optionsType === "multiple") {
				userAnswer = req.body.pollCards[i].userAnswers.slice(1);
			} else {
				userAnswer = req.body.pollCards[i].userAnswers;
			}
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
						userAnswer: userAnswer,
						userSession: userSession,
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
