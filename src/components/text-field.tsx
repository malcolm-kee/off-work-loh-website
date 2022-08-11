import * as React from 'react';

export interface TextFieldProps extends React.ComponentPropsWithoutRef<'input'> {
	label?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
	{ label, ...props },
	forwardedRef
) {
	return (
		<div className="flex items-center gap-2">
			{label && (
				<label htmlFor={props.id} className="flex-shrink-0 text-sm">
					{label}
				</label>
			)}
			<input type="text" className="w-full" {...props} ref={forwardedRef} />
		</div>
	);
});
