/** @jsxImportSource react */
import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import './styles.css';
import { qwikify$ } from '@builder.io/qwik-react';

interface AlertDialogProps {
    title?: string
    description?: string
    cancelText?: string
    confirmText?: string
    onConfirm?: () => void
    open: boolean
    onOpenChange?: (open: boolean) => void
    onCanceled?: () => void
}

const AlertDialogCom = ({
    title = 'Are you absolutely sure?',
    cancelText = 'Cancel',
    onConfirm,
    onOpenChange,
    onCanceled,
    open,
    description = 'This action cannot be undone. This will permanently clear your canva.',
    confirmText = "Yes, clear canva" }: AlertDialogProps) => {
    const [openState, setOpenState] = React.useState(open);
    React.useEffect(() => {
        setOpenState(open);
    }, [open]);
    return <AlertDialog.Root open={openState} onOpenChange={onOpenChange}>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="AlertDialogOverlay" />
            <AlertDialog.Content className="AlertDialogContent">
                <AlertDialog.Title className="AlertDialogTitle">{title}</AlertDialog.Title>
                <AlertDialog.Description className="AlertDialogDescription">
                    {description}
                </AlertDialog.Description>
                <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                    <AlertDialog.Cancel asChild>
                        <button onClick={onCanceled} className="Button mauve">{cancelText}</button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button onClick={onConfirm} className="Button red">{confirmText}</button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
};

export default qwikify$(AlertDialogCom, { eagerness: 'visible' });