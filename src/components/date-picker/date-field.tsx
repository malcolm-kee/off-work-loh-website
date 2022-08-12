import { Box, BoxProps, FormLabel } from '@chakra-ui/react';
import { createCalendar } from '@internationalized/date';
import { useDateField, useDateSegment, useTimeField } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import {
	DateFieldState,
	DateFieldStateOptions,
	DateSegment,
	TimeFieldStateOptions,
	useDateFieldState,
	useTimeFieldState,
} from '@react-stately/datepicker';
import { forwardRef, useRef } from 'react';

export function DateField(
	props: Omit<DateFieldStateOptions, 'locale' | 'createCalendar' | 'hourCycle'>
) {
	const state = useDateFieldState({
		...props,
		locale: 'en-GB',
		createCalendar,
		hourCycle: 12,
	});

	const ref = useRef<HTMLDivElement>(null);
	const { fieldProps } = useDateField(props, state, ref);

	return (
		<Box {...fieldProps} ref={ref} display="flex">
			{state.segments.map((segment, i) => (
				<DateSegment key={i} segment={segment} state={state} />
			))}
		</Box>
	);
}

export function TimeField(props: Omit<TimeFieldStateOptions, 'locale'> & Pick<BoxProps, 'flex'>) {
	const { locale } = useLocale();
	const state = useTimeFieldState({
		...props,
		locale,
	});

	const ref = useRef<HTMLDivElement>(null);
	const { labelProps, fieldProps } = useTimeField(props, state, ref);

	return (
		<Box mt={2} flex={props.flex}>
			<FormLabel {...labelProps}>{props.label}</FormLabel>
			<StyledField {...fieldProps} ref={ref} display="inline-flex" pr={2}>
				{state.segments.map((segment, i) => (
					<DateSegment key={i} segment={segment} state={state} />
				))}
			</StyledField>
		</Box>
	);
}

export const StyledField = forwardRef<HTMLDivElement, BoxProps>(function StyledField(
	{ children, ...otherProps },
	ref
) {
	return (
		<Box
			position="relative"
			background="white"
			border="1px solid"
			borderColor="gray.300"
			rounded="md"
			transition="all 200ms"
			display="flex"
			alignItems="center"
			px="1"
			py=".4rem"
			_hover={{
				borderColor: 'gray.400',
			}}
			_focusWithin={{
				borderColor: 'blue.500',
				boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
			}}
			{...otherProps}
			ref={ref}
		>
			{children}
		</Box>
	);
});

function DateSegment({ segment, state }: { segment: DateSegment; state: DateFieldState }) {
	const ref = useRef<HTMLDivElement>(null);
	const { segmentProps } = useDateSegment(segment, state, ref);

	return (
		<Box
			{...segmentProps}
			ref={ref}
			style={{
				...segmentProps.style,
				fontVariantNumeric: 'tabular-nums',
				boxSizing: 'content-box',
			}}
			minWidth={segment.maxValue != null ? String(segment.maxValue).length + 'ch' : undefined}
			paddingX="0.5"
			textAlign="end"
			outline="none"
			rounded="md"
			color={segment.isPlaceholder ? 'gray.500' : !segment.isEditable ? 'gray.600' : 'black'}
			_focus={{
				background: 'blue.500',
				color: 'white',
			}}
		>
			{segment.text}
		</Box>
	);
}
