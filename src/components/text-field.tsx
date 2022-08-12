import * as React from 'react';
import { clsx } from 'clsx';

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
				<label htmlFor={props.id} className={'flex-shrink-0 text-sm min-w-[80px]'}>
					{label}
				</label>
			)}
			<input
				type="text"
				{...props}
				className={clsx(
					'w-full border-gray-300 rounded',
					'focus:outline-none focus:border-gray-300 focus:ring focus:ring-offset-2 focus:ring-sky-500 focus:ring-opacity-20',
					(props.readOnly || props.disabled) && 'bg-gray-200',
					props.className
				)}
				ref={forwardedRef}
			/>
		</div>
	);
});
