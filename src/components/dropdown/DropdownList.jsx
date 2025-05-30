export default function DropdownList({ options, onSelect, highlightedIndex, setHighlightedIndex, noOptionsText }) {
    return (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-50 max-h-60 overflow-auto">
            {options.length > 0 ? (
                options.map((opt, idx) => (
                    <li
                        key={opt.value}
                        onClick={() => onSelect(opt)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={`p-[10px] cursor-pointer text-[16px] ${highlightedIndex === idx
                                ? "bg-[#629BF7] text-white"
                                : "hover:bg-[#E0EFFF]"
                            }`}
                    >
                        {opt.label}
                    </li>
                ))
            ) : (
                <li className="p-[10px] text-[16px] text-gray-500">
                    {noOptionsText}
                </li>
            )}
        </ul>
    );
}