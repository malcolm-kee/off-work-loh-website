import { FormControl, FormLabel, Textarea, TextareaProps } from '@chakra-ui/react';
import * as React from 'react';

export interface TextareaFieldProps extends TextareaProps {
	label?: string;
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
	function TextareaField({ label, ...props }, forwardedRef) {
		return (
			<FormControl id={props.id} isRequired={props.isRequired} isReadOnly={props.isReadOnly}>
				{label && <FormLabel>{label}</FormLabel>}
				<Textarea
					{...props}
					_readOnly={{ backgroundColor: 'gray.200' }}
					_disabled={{ backgroundColor: 'gray.200' }}
					ref={forwardedRef}
				/>
			</FormControl>
		);
	}
);
