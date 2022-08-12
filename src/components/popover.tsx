import { Box } from '@chakra-ui/react';
import { AriaDialogProps, useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { DismissButton, useModal, useOverlay } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';
import * as React from 'react';

export function Popover(
	props: AriaDialogProps & {
		children: React.ReactNode;
		popoverRef?: React.RefObject<HTMLDivElement>;
		isOpen?: boolean;
		onClose?: () => void;
	}
) {
	const ref = React.useRef<HTMLDivElement>(null);
	const { popoverRef = ref, isOpen, onClose, children, ...otherProps } = props;

	// Handle events that should cause the popup to close,
	// e.g. blur, clicking outside, or pressing the escape key.
	const { overlayProps } = useOverlay(
		{
			isOpen,
			onClose,
			shouldCloseOnBlur: true,
			isDismissable: true,
		},
		popoverRef
	);

	const { modalProps } = useModal();
	const { dialogProps } = useDialog(otherProps, popoverRef);

	// Add a hidden <DismissButton> component at the end of the popover
	// to allow screen reader users to dismiss the popup easily.
	return (
		<FocusScope contain restoreFocus>
			<Box
				{...mergeProps(overlayProps, modalProps, dialogProps)}
				ref={popoverRef}
				background="white"
				border="1px solid"
				borderColor="gray.300"
				borderRadius="md"
				position="absolute"
				zIndex="10"
				top="100%"
				boxShadow="lg"
				marginTop="1"
				padding="6"
				outline="none"
			>
				{children}
				<DismissButton onDismiss={onClose} />
			</Box>
		</FocusScope>
	);
}
