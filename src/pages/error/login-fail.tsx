import { LoginLogoutButton } from '../../components/login-logout-button';

export default function LoginFail() {
	return (
		<div>
			<h1>You{"'"}re not in the discord server </h1>
			<div>
				<LoginLogoutButton />
			</div>
		</div>
	);
}
