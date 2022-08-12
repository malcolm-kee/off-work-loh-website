import type { RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/rest';

const baseUrl = `https://discord.com/api`;

export const getJoinedServices = (accessToken: string) =>
	fetch(`${baseUrl}/users/@me/guilds`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	}).then((res) => {
		if (res.ok) {
			return res.json() as Promise<RESTGetAPICurrentUserGuildsResult>;
		}
	});
