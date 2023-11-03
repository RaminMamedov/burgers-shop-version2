import React from 'react';

type ConfirmType = {
    onConfirm: () => void
    onCancel: () => void
    isVisible: boolean
    message: string
}

export const ConfirmModal: React.FC<ConfirmType> = ({ onConfirm, onCancel, isVisible, message }) => {
    if (!isVisible) return null;

    return (
        <div className="modal">
            <p>{message}</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
    );
};