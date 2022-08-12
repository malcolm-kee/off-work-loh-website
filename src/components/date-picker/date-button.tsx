import { Button as ChakraButton } from '@chakra-ui/react';
import { AriaButtonProps, useButton } from '@react-aria/button';
import { useRef } from 'react';

export function CalendarButton(props: AriaButtonProps<'button'>) {
	const ref = useRef<HTMLButtonElement>(null);
	const { buttonProps } = useButton(props, ref);
	return (
		<ChakraButton {...buttonProps} ref={ref} size="sm">
			{props.children}
		</ChakraButton>
	);
}

export function FieldButton(props: AriaButtonProps<'button'> & { isPressed?: boolean }) {
	const ref = useRef<HTMLButtonElement>(null);
	const { buttonProps } = useButton(props, ref);
	return (
		<ChakraButton {...buttonProps} ref={ref} size="sm" h="1.75rem" mr="2">
			{props.children}
		</ChakraButton>
	);
}
