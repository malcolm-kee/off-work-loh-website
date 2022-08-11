import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notionClient = new Client({
	auth: process.env.NOTION_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: `${req.method} requests are not allowed` });
	}

	try {
		const { name, startDate, endDate, host, howToRsvp } = req.body;
		const database_id = process.env.NOTION_DATABASE_ID as string;

		await notionClient.pages.create({
			parent: {
				database_id,
			},
			properties: {
				Name: {
					title: [
						{
							text: {
								content: name,
							},
						},
					],
				},
				Date: {
					date: {
						start: startDate,
						end: endDate,
					},
				},
				Host: {
					rich_text: [
						{
							text: {
								content: host,
							},
						},
					],
				},
				'How to RSVP': {
					rich_text: [
						{
							text: {
								content: howToRsvp,
							},
						},
					],
				},
			},
		});

		res.status(200).json({ msg: 'OK' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: 'There was an error' });
	}
}
