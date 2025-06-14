// ConfirmModal.jsx
export default function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 text-right font-sans">
                <p className="mb-6 text-gray-800 text-lg">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        انصراف
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-darkBlue text-white hover:bg-blue-950 transition"
                    >
                        تأیید
                    </button>
                </div>
            </div>
        </div>
    );
}
