import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Heading } from '@chakra-ui/react';
import { createCalendar } from '@internationalized/date';
import { useRangeCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { RangeCalendarStateOptions, useRangeCalendarState } from '@react-stately/calendar';
import { useRef } from 'react';
import { CalendarGrid } from './calendar-grid';
import { CalendarButton } from './date-button';

export function RangeCalendar({
	visibleMonths,
	...props
}: Omit<RangeCalendarStateOptions, 'locale' | 'createCalendar' | 'visibleDuration'> & {
	visibleMonths: number;
}) {
	const { locale } = useLocale();

	const state = useRangeCalendarState({
		...props,
		visibleDuration: { months: visibleMonths },
		locale,
		createCalendar,
	});

	const ref = useRef<HTMLDivElement>(null);
	const { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(
		props,
		state,
		ref
	);

	return (
		<div {...calendarProps} ref={ref}>
			<Box display="flex" alignItems="center" paddingBottom="4">
				<CalendarButton {...prevButtonProps}>
					<ChevronLeftIcon w={6} h={6} />
				</CalendarButton>
				<Heading as="h2" size="md" flex="1" textAlign="center">
					{title}
				</Heading>
				<CalendarButton {...nextButtonProps}>
					<ChevronRightIcon w={6} h={6} />
				</CalendarButton>
			</Box>
			<Box display="flex" gap="8">
				<CalendarGrid state={state} />
				{visibleMonths > 1 && <CalendarGrid state={state} offset={{ months: 1 }} />}
			</Box>
		</div>
	);
}
