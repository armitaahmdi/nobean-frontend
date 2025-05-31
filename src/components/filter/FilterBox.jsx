export default function FilterBox({
    title,
    options,
    selectedOption,
    onSelect,
    multiple = false,
}) {
    const handleClick = (option) => {
        if (multiple) {
            if (selectedOption.includes(option)) {
                onSelect(selectedOption.filter((o) => o !== option));
            } else {
                onSelect([...selectedOption, option]);
            }
        } else {
            onSelect(option === selectedOption ? "" : option);
        }
    };

    return (
        <div className="mb-6 w-[380px] bg-white p-4 rounded-[20px]">
            {title && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 text-right my-3">{title}</h3>
                    <div className="bg-[#e6e6e6] border-t"></div>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {options.map((option) => {
                    const isSelected = multiple
                        ? selectedOption.includes(option)
                        : selectedOption === option;

                    return (
                        <label
                            key={option}
                            className="flex items-center cursor-pointer text-gray-700"
                            onClick={() => handleClick(option)}
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
        </div>
    );
}
