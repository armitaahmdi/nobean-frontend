import translate from "../../locale/translate";

export default function FilterModalMobile({
    title,
    options,
    selected,
    onClose,
    onChange,
    isMultiSelect,
}) {
    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end lg:hidden"
            onClick={onClose}
        >
            <div
                className="w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-bold mb-4">{title}</h3>

                <div className="flex flex-col gap-4">
                    {options.map((option) => {
                        const isSelected = isMultiSelect
                            ? selected?.includes(option)
                            : selected === option;

                        return (
                            <label
                                key={option}
                                className="flex items-center cursor-pointer text-gray-700"
                                onClick={() => {
                                    let newValue;
                                    if (isMultiSelect) {
                                        newValue = isSelected
                                            ? selected.filter((o) => o !== option)
                                            : [...(selected || []), option];
                                    } else {
                                        newValue = selected === option ? "" : option;
                                    }
                                    onChange(newValue);
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    readOnly
                                    className="w-4 h-4 accent-blue-500"
                                />
                                <span className="mr-4">{option}</span>
                            </label>
                        );
                    })}
                </div>

                <button
                    className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg"
                    onClick={onClose}
                >
                    {translate.confirmAndClose}
                </button>
            </div>
        </div>
    );
}