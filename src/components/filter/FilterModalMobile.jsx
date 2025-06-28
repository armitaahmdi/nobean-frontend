export default function FilterModalMobile({
    title,
    options,
    selected,
    onClose,
    onChange,
    icon: Icon,
    isMultiSelect,
    isCategory,
}) {
    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end lg:hidden"
            onClick={onClose}
        >
            <div
                className="w-full bg-white rounded-t-2xl px-4 py-6 max-h-[80dvh] overflow-y-auto overscroll-contain"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    {Icon && <Icon className="w-5 h-5 text-gray-500" />}
                    {title}
                </h3>

                <div className={isCategory ? "flex flex-wrap justify-center gap-6" : "flex flex-col gap-6"}>
                    {options.map((option) => {
                        const optionValue = isCategory ? option.name : option;
                        const isSelected = isMultiSelect
                            ? selected?.includes(optionValue)
                            : selected === optionValue;

                        return (
                            <div
                                key={optionValue}
                                onClick={() => {
                                    let newValue;
                                    if (isMultiSelect) {
                                        newValue = isSelected
                                            ? selected.filter((o) => o !== optionValue)
                                            : [...(selected || []), optionValue];
                                    } else {
                                        newValue = selected === optionValue ? "" : optionValue;
                                    }
                                    onChange(newValue);
                                }}
                                className={`
                                    cursor-pointer
                                    transition-colors duration-300
                                    ${isCategory
                                        ? `flex flex-col items-center gap-2 p-2 rounded-xl
                                           border ${isSelected ? "border-emerald-500 bg-emerald-100" : "border-gray-300 bg-white hover:bg-gray-100"}
                                           w-20`
                                        : "flex justify-between items-center rounded-xl p-3"
                                    }
                                `}
                            >
                                {isCategory ? (
                                    <>
                                        {option.image && (
                                            <img
                                                src={option.image}
                                                alt={option.name}
                                                className={`w-16 h-16 rounded-full object-cover
                                                  ${isSelected ? "ring-2 ring-emerald-500" : ""}
                                                `}
                                            />
                                        )}
                                        <span className="text-[16px] font-medium text-gray-800 text-center">
                                            {option.name}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-[16px] font-medium text-gray-800">{option}</span>

                                        <div className="relative inline-block w-14 h-8"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                let newValue;
                                                if (isMultiSelect) {
                                                    newValue = isSelected
                                                        ? selected.filter((o) => o !== optionValue)
                                                        : [...(selected || []), optionValue];
                                                } else {
                                                    newValue = selected === optionValue ? "" : optionValue;
                                                }
                                                onChange(newValue);
                                                setTimeout(() => {
                                                    onClose();
                                                }, 350);
                                            }}
                                        >
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
                                                  absolute top-[4px] left-[4px] w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300
                                                  ${isSelected ? "translate-x-6" : ""}
                                                `}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// import translate from "../../locale/translate";

// export default function FilterModalMobile({
//     title,
//     options,
//     selected,
//     onClose,
//     onChange,
//     icon: Icon,
//     isMultiSelect,
//     isCategory,
// }) {
//     return (
//         <div
//             className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end lg:hidden"
//             onClick={onClose}
//         >
//             <div
//                 className="w-full bg-white rounded-t-2xl px-4 py-6 max-h-[80dvh] overflow-y-auto overscroll-contain"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
//                     {Icon && <Icon className="w-5 h-5 text-gray-500" />}
//                     {title}
//                 </h3>

//                 <div className="flex flex-col gap-6">
//                     {options.map((option) => {
//                         const optionValue = isCategory ? option.name : option;
//                         const isSelected = isMultiSelect
//                             ? selected?.includes(optionValue)
//                             : selected === optionValue;

//                         return (
//                             <div
//                                 key={optionValue}
//                                 onClick={() => {
//                                     let newValue;
//                                     if (isMultiSelect) {
//                                         newValue = isSelected
//                                             ? selected.filter((o) => o !== optionValue)
//                                             : [...(selected || []), optionValue];
//                                     } else {
//                                         newValue = selected === optionValue ? "" : optionValue;
//                                     }
//                                     onChange(newValue);
//                                 }}
//                                 className={`
//                                     flex justify-between items-center cursor-pointer rounded-xl p-3 transition-colors duration-300
//                                     ${isCategory
//                                         ? isSelected
//                                             ? "border border-emerald-500 bg-emerald-100"
//                                             : "border border-gray-300 bg-white hover:bg-gray-100"
//                                         : ""}
//   `}
//                             >

//                                 {/* لیبل فیلتر */}
//                                 {isCategory ? (
//                                     <div className="flex items-center gap-3">
//                                         {option.image && (
//                                             <img
//                                                 src={option.image}
//                                                 alt={option.name}
//                                                 className="w-8 h-8 rounded-full object-cover"
//                                             />
//                                         )}
//                                         <span className="text-[16px] font-medium text-gray-800">
//                                             {option.name}
//                                         </span>
//                                     </div>
//                                 ) : (
//                                     <span className="text-[16px] font-medium text-gray-800">
//                                         {option}
//                                     </span>
//                                 )}

//                                 {/* توگل فقط برای فیلترهای غیردسته‌بندی */}
//                                 {!isCategory && (
//                                     <div className="relative inline-block w-14 h-8">
//                                         <input
//                                             type="checkbox"
//                                             checked={isSelected}
//                                             readOnly
//                                             className="opacity-0 w-0 h-0"
//                                         />
//                                         <span
//                                             className={`
//                                                 absolute inset-0 transition-colors duration-300 rounded-full
//                                                 ${isSelected ? "bg-emerald-500" : "bg-gray-400"}
//                                             `}
//                                         />
//                                         <span
//                                             className={`
//                                                 absolute top-[4px] left-[4px] w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300
//                                                 ${isSelected ? "translate-x-6" : ""}
//                                             `}
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>

//                 <button
//                     className="mt-8 w-full bg-emerald-500 text-white text-lg font-medium py-3 rounded-xl shadow-md"
//                     onClick={onClose}
//                 >
//                     {translate.confirmAndClose}
//                 </button>
//             </div>
//         </div>
//     );
// }
