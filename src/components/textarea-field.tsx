import * as React from 'react';

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
				<textarea className="w-full" {...props} ref={forwardedRef} />
			</div>
		);
	}
);
