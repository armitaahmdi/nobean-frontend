export default function FilterBox({
    title,
    options,
    selectedOption,
    onSelect,
    icon: Icon,
    multiple = false,
    isCategory = false,
    isMobile = false,
}) {
    const handleClick = (option) => {
        const value = isCategory ? option.name : option;

        if (multiple) {
            if (selectedOption.includes(value)) {
                onSelect(selectedOption.filter((o) => o !== value));
            } else {
                onSelect([...selectedOption, value]);
            }
        } else {
            onSelect(value === selectedOption ? "" : value);
        }
    };

    return (
        <div className={`mb-6 bg-white p-4 sm:p-6 rounded-[20px] shadow-xl ${isMobile ? 'w-full' : 'w-full max-w-[320px]'}`}>
            {title && (
                <div className="mb-5">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-right mb-2 flex items-center gap-2">
                        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
                        {title}
                    </h3>
                    <div className="bg-gray-200 h-[1px]" />
                </div>
            )}

            {isCategory ? (
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {options.map((option) => {
                        const isSelected = multiple
                            ? selectedOption.includes(option.name)
                            : selectedOption === option.name;

                        return (
                            <div
                                key={option.name}
                                onClick={() => handleClick(option)}
                                className={`
                                    cursor-pointer rounded-xl p-3 sm:p-4 flex items-center justify-start gap-3
                                    border transition-all duration-300 hover:shadow-md
                                    ${isSelected ? "border-emerald-500 bg-emerald-100" : "border-gray-300 bg-white hover:bg-gray-100"}
                                `}
                            >
                                <img src={option.image} alt={option.name} className="w-12 h-12 sm:w-14 sm:h-14 object-fill rounded-lg" />
                                <span className="text-sm sm:text-base font-medium">{option.name}</span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col gap-4 sm:gap-6">
                    {options.map((option) => {
                        const isSelected = multiple
                            ? selectedOption.includes(option)
                            : selectedOption === option;

                        return (
                            <div
                                key={option}
                                className="flex justify-between items-center cursor-pointer py-2"
                                onClick={() => handleClick(option)}
                            >
                                <span className="text-sm sm:text-base font-medium text-gray-700">{option}</span>

                                <div className="relative inline-block w-12 h-6 sm:w-14 sm:h-8">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        readOnly
                                        className="opacity-0 w-0 h-0"
                                    />
                                    <span
                                        className={`
                                        absolute inset-0 transition-colors duration-300 rounded-full
                                        ${isSelected ? "bg-emerald-500" : "bg-gray-400"}
                                        `}
                                    />
                                    <span
                                        className={`
                                            absolute top-[4px] left-[3px] w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transition-transform duration-300
                                            ${isSelected ? "translate-x-6 sm:translate-x-6" : ""}
                                            `}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

