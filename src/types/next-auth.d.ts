import NextAuth from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';
import { DefaultSession } from 'next-auth';

declare module 'next-auth/jwt' {
	interface JWT extends Record<string, unknown>, DefaultJWT {
		discordAccountId?: string;
	}
}

declare module 'next-auth' {
	interface Session {
		user: {
			discordAccountId?: string;
		} & DefaultSession['user'];
	}
}
