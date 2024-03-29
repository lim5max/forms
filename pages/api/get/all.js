import { getSession } from 'next-auth/react';
import prisma from "../../../lib/prismadb";

export default async function handler(req, res) {
	const session = await getSession({ req });
	console.log(session);
	res.send(JSON.stringify(session, null, 2));
}
