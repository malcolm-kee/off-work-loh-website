import { DateDuration, endOfMonth, getWeeksInMonth } from '@internationalized/date';
import { useCalendarGrid } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import type { RangeCalendarState } from '@react-stately/calendar';
import { CalendarCell } from './calendar-cell';

export interface CalendarGridProps {
	state: RangeCalendarState;
	offset?: DateDuration;
}

export function CalendarGrid({ state, offset = {} }: CalendarGridProps) {
	const { locale } = useLocale();
	const startDate = state.visibleRange.start.add(offset);
	const endDate = endOfMonth(startDate);
	const { gridProps, headerProps, weekDays } = useCalendarGrid(
		{
			startDate,
			endDate,
		},
		state
	);

	// Get the number of weeks in the month so we can render the proper number of rows.
	const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

	return (
		<table {...gridProps}>
			<thead {...headerProps}>
				<tr>
					{weekDays.map((day, index) => (
						<th key={index}>{day}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{[...new Array(weeksInMonth).keys()].map((weekIndex) => (
					<tr key={weekIndex}>
						{state
							.getDatesInWeek(weekIndex, startDate)
							.map((date, i) =>
								date ? (
									<CalendarCell key={i} state={state} date={date} currentMonth={startDate} />
								) : (
									<td key={i} />
								)
							)}
					</tr>
				))}
			</tbody>
		</table>
	);
}
