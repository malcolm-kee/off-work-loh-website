import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { getJoinedServices } from 'services/discord-api';

export default NextAuth({
	callbacks: {
		async signIn(data) {
			const { access_token } = data.account;

			if (access_token) {
				const servers = await getJoinedServices(access_token);

				if (servers) {
					const matchedServer = servers.find((server) => server.name === process.env.SERVER_NAME);

					if (matchedServer) {
						return true;
					}

					return '/error/not-in-server';
				}
			}

			return '/error/login-fail';
		},
		jwt({ token, account }) {
			if (account) {
				token.discordAccountId = account.providerAccountId;
			}
			return token;
		},
		session({ session, token }) {
			if (token) {
				session.user.discordAccountId = token.discordAccountId;
			}
			return session;
		},
	},
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			authorization:
				'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.members.read',
		}),
	],
});

// 402763367120633857
