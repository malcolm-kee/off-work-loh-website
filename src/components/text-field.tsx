import { FormControl, FormLabel, Input, InputProps } from '@chakra-ui/react';
import * as React from 'react';

export interface TextFieldProps extends InputProps {
	label?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
	{ label, ...props },
	forwardedRef
) {
	return (
		<FormControl id={props.id} isRequired={props.isRequired} isDisabled={props.isDisabled}>
			{label && <FormLabel>{label}</FormLabel>}
			<Input
				type="text"
				{...props}
				_readOnly={{ backgroundColor: 'gray.200' }}
				_disabled={{ backgroundColor: 'gray.200' }}
				ref={forwardedRef}
			/>
		</FormControl>
	);
});
