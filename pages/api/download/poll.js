// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import cuid from "cuid";

import prisma from "../../../lib/prismadb";

export default async function handleDownloadStatistics(req, res) {
	//
	let dataXLSX = [{}];

	if (req.method === "POST") {
		let row = {};
		try {
			const data = await prisma.pollCard.findMany({
				where: {
					poll: {
						id: req.body.pollId,
					},
				},
			});
			console.log(data, "card");
			for (let i = 0; i < data.length; i++) {
				const card = data[i];

				const answers = await prisma.anonymousUserAnwer.findMany({
					where: {
						pollCard: {
							id: card.id,
						},
					},
				});
				for (let j = 0; j < answers.length; j++) {
					let answer = answers[j].userAnswer;
					if (answer.length === 0) {
						answer = "";
					} else {
						answer = answer.join(", ");
					}
					if (dataXLSX[j]) {
						dataXLSX[j][card.question] = answer;
					} else {
						dataXLSX[j] = {};
						dataXLSX[j][card.question] = answer;
					}
					// row[card.question] = answer.userAnswer;
					// dataXLSX[j
					// dataXLSX.push(row);
				}
			}
			console.log(dataXLSX, "data");
		} catch (e) {
			console.log(e);
			return res.status(400).json({ error: e.message });
		}

		return res.status(200).json({ dataXLSX });
	}
}
