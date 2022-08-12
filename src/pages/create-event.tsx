import { Button } from '@chakra-ui/react';
import { getLocalTimeZone, today } from '@internationalized/date';
import { useMutation } from '@tanstack/react-query';
import { DateRangePicker, DateRangePickerProps } from 'components/date-picker';
import { LoginLogoutButton } from 'components/login-logout-button';
import { useSession } from 'modules/auth';
import Head from 'next/head';
import * as React from 'react';
import { TextField } from '../components/text-field';
import { TextareaField } from '../components/textarea-field';

export default function CreateEventPage() {
	const { data } = useSession();

	const { mutate, isSuccess, isLoading } = useMutation((data: any) => {
		return fetch('/api/create-event', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => {
			if (!res.ok) {
				throw new Error('Fail to create');
			}
		});
	});

	const [todayDate] = React.useState(() => today(getLocalTimeZone()));
	const [date, setDate] = React.useState<DateRangePickerProps['value']>(undefined);

	return (
		<div className="max-w-xl mx-auto p-6">
			<Head>
				<title>Create Event</title>
			</Head>
			<h1 className="text-4xl font-extrabold mb-6">Create Event</h1>
			{!data ? (
				<LoginLogoutButton />
			) : isSuccess ? (
				<p>Submitted!</p>
			) : (
				<form
					onSubmit={(ev) => {
						ev.preventDefault();
						const data = new FormData(ev.target as HTMLFormElement);
						const body = Object.fromEntries(data.entries());

						if (date) {
							const startDate = date.start.toString();
							const endDate = date.end.toString();
							mutate({
								...body,
								startDate,
								endDate,
							});
						}
					}}
				>
					<div className="flex flex-col gap-5">
						<TextField
							label="Hosted by"
							value={data.user.name || data.user.email || 'Unknown'}
							isReadOnly
						/>
						<TextField label="Event name" id="name" name="name" isRequired isDisabled={isLoading} />
						<input type="hidden" name="host" value={data.user.discordAccountId} />
						<div className="relative">
							<DateRangePicker
								granularity="minute"
								minValue={todayDate}
								onChange={setDate}
								label="Date/time"
								isDisabled={isLoading}
							/>
							<input className="sr-only" value={date ? date.start.toString() : ''} required />
						</div>
						<TextareaField
							label="How to RSVP"
							id="howToRsvp"
							name="howToRsvp"
							isRequired
							isDisabled={isLoading}
						/>
						<div>
							<Button colorScheme="teal" type="submit" width="full" isLoading={isLoading}>
								Add
							</Button>
						</div>
					</div>
				</form>
			)}
		</div>
	);
}
