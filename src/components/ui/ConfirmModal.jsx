import React from 'react';
import { FaExclamationTriangle, FaCheck, FaTimes } from 'react-icons/fa';

const ConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "تأیید عملیات", 
    message, 
    confirmText = "تأیید", 
    cancelText = "انصراف",
    type = "warning" // warning, danger, info
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'danger':
                return <FaExclamationTriangle className="text-red-500" />;
            case 'info':
                return <FaExclamationTriangle className="text-blue-500" />;
            default:
                return <FaExclamationTriangle className="text-yellow-500" />;
        }
    };

    const getButtonClass = () => {
        switch (type) {
            case 'danger':
                return "bg-red-600 hover:bg-red-700 text-white";
            case 'info':
                return "bg-blue-600 hover:bg-blue-700 text-white";
            default:
                return "bg-yellow-600 hover:bg-yellow-700 text-white";
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">
                        {getIcon()}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                    {message}
                </p>
                
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <FaTimes />
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${getButtonClass()}`}
                    >
                        <FaCheck />
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
