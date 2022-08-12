import { LoginLogoutButton } from 'components/login-logout-button';
import { useSession } from 'modules/auth';
import Head from 'next/head';
import * as React from 'react';
import { TextField } from '../components/text-field';
import { TextareaField } from '../components/textarea-field';

export default function CreateEventPage() {
	const [submitted, setSubmitted] = React.useState(false);
	const { data } = useSession();

	return (
		<div className="max-w-xl mx-auto p-6">
			<Head>
				<title>Create Event</title>
			</Head>
			<h1 className="text-4xl font-extrabold mb-6">Create Event</h1>
			{!data ? (
				<LoginLogoutButton />
			) : submitted ? (
				<p>Submitted!</p>
			) : (
				<form
					onSubmit={(ev) => {
						ev.preventDefault();
						const data = new FormData(ev.target as HTMLFormElement);
						const body = Object.fromEntries(data.entries());

						fetch('/api/create-event', {
							method: 'POST',
							body: JSON.stringify(body),
							headers: {
								'Content-Type': 'application/json',
							},
						}).then((res) => {
							if (res.ok) {
								setSubmitted(true);
							}
						});
					}}
				>
					<div className="flex flex-col gap-5">
						<TextField
							label="Hosted by"
							value={data.user.name || data.user.email || 'Unknown'}
							readOnly
						/>
						<TextField label="Event name" id="name" name="name" required />
						<input type="hidden" name="host" value={data.user.discordAccountId} />
						<div className="grid grid-cols-2 gap-3">
							<TextField
								type="datetime-local"
								label="Start date"
								name="startDate"
								id="startDate"
								required
							/>
							<TextField
								type="datetime-local"
								label="End date"
								name="endDate"
								id="endDate"
								required
							/>
						</div>
						<TextareaField label="How to RSVP" id="howToRsvp" name="howToRsvp" required />
						<div>
							<button type="submit" className="bg-sky-600 text-white w-full px-4 py-2 rounded">
								Add
							</button>
						</div>
					</div>
				</form>
			)}
		</div>
	);
}
