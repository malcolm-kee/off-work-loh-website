import * as React from 'react';
import { clsx } from 'clsx';

export interface TextareaFieldProps extends React.ComponentPropsWithoutRef<'textarea'> {
	label?: string;
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
	function TextareaField({ label, ...props }, forwardedRef) {
		return (
			<div className="flex items-center gap-2">
				{label && (
					<label htmlFor={props.id} className="flex-shrink-0 text-sm">
						{label}
					</label>
				)}
				<textarea
					{...props}
					className={clsx(
						'w-full border-gray-300 rounded',
						'focus:outline-none focus:border-gray-300 focus:ring focus:ring-offset-2 focus:ring-sky-500 focus:ring-opacity-20',
						(props.disabled || props.readOnly) && 'bg-gray-200',
						props.className
					)}
					ref={forwardedRef}
				/>
			</div>
		);
	}
);
