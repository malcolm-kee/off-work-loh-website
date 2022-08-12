import { signIn, signOut, useSession } from 'modules/auth';

export const LoginLogoutButton = () => {
	const { data } = useSession();

	return data ? (
		<>
			Signed in as {data.user?.email}
			<br />
			<button onClick={() => signOut()} type="button">
				Sign out
			</button>
		</>
	) : (
		<>
			Not signed in <br />
			<button onClick={() => signIn('discord')} type="button">
				Sign in
			</button>
		</>
	);
};
