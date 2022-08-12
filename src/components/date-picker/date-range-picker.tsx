import { CalendarIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Box, FormLabel, InputGroup, InputRightElement, useMediaQuery } from '@chakra-ui/react';
import { useDateRangePicker } from '@react-aria/datepicker';
import { DateRangePickerStateOptions, useDateRangePickerState } from '@react-stately/datepicker';
import { useRef } from 'react';
import { Popover } from '../popover';
import { FieldButton } from './date-button';
import { DateField, StyledField, TimeField } from './date-field';
import { RangeCalendar } from './range-calendar';

export interface DateRangePickerProps
	extends Omit<DateRangePickerStateOptions, 'shouldCloseOnSelect'> {}

export function DateRangePicker(props: DateRangePickerProps) {
	const state = useDateRangePickerState({
		...props,
		shouldCloseOnSelect: false,
	});
	const ref = useRef<HTMLDivElement>(null);
	const {
		groupProps,
		labelProps,
		startFieldProps,
		endFieldProps,
		buttonProps,
		dialogProps,
		calendarProps,
	} = useDateRangePicker(props, state, ref);
	const [isLargerThan720] = useMediaQuery('(min-width: 720px)');

	return (
		<Box position="relative" display="flex" flexDirection="column">
			<FormLabel {...labelProps}>{props.label}</FormLabel>
			<InputGroup {...groupProps} ref={ref} display="flex">
				<StyledField
					pr="4rem"
					width="full"
					flexDirection={{
						base: 'column',
						md: 'row',
					}}
					bgColor={props.isDisabled ? 'gray.200' : undefined}
				>
					<DateField {...startFieldProps} />
					<Box as="span" aria-hidden="true" paddingX="2">
						to
					</Box>
					<DateField {...endFieldProps} />
					{state.validationState === 'invalid' && (
						<NotAllowedIcon color="red.600" position="absolute" right="12" />
					)}
				</StyledField>
				<InputRightElement>
					<FieldButton
						{...buttonProps}
						isPressed={state.isOpen}
						isDisabled={props.isDisabled || buttonProps.isDisabled}
					>
						<CalendarIcon />
					</FieldButton>
				</InputRightElement>
			</InputGroup>
			{state.isOpen && (
				<Popover {...dialogProps} isOpen={state.isOpen} onClose={() => state.setOpen(false)}>
					<RangeCalendar {...calendarProps} visibleMonths={isLargerThan720 ? 2 : 1} />
					<Box display="flex" gap="2">
						<TimeField
							label="Start time"
							value={state.timeRange?.start || null}
							onChange={(v) => state.setTime('start', v)}
						/>
						<TimeField
							label="End time"
							value={state.timeRange?.end || null}
							onChange={(v) => state.setTime('end', v)}
						/>
					</Box>
				</Popover>
			)}
		</Box>
	);
}
