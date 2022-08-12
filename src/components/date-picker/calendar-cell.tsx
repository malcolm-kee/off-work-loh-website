import { Box, Button } from '@chakra-ui/react';
import { CalendarDate, isSameMonth } from '@internationalized/date';
import { useCalendarCell } from '@react-aria/calendar';
import type { RangeCalendarState } from '@react-stately/calendar';
import { useRef } from 'react';

export interface CalendarCellProps {
	state: RangeCalendarState;
	date: CalendarDate;
	currentMonth: CalendarDate;
}

export function CalendarCell({ state, date, currentMonth }: CalendarCellProps) {
	const ref = useRef<HTMLButtonElement>(null);
	const { cellProps, buttonProps, isSelected, isInvalid, formattedDate } = useCalendarCell(
		{ date },
		state,
		ref
	);

	const isOutsideMonth = !isSameMonth(currentMonth, date);

	return (
		<Box as="td" {...cellProps} textAlign="center">
			<Button
				{...buttonProps}
				ref={ref}
				hidden={isOutsideMonth}
				size="sm"
				colorScheme={isInvalid ? 'red' : 'blue'}
				variant={isSelected ? 'solid' : 'ghost'}
				width="100%"
			>
				{formattedDate}
			</Button>
		</Box>
	);
}
