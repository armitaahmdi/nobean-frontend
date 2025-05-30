/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import useDropdown from "../../hooks/useDropdown";
import DropdownList from "./DropdownList";

export default function Dropdown({ label, options, placeholder = "انتخاب کنید", noOptionsText = "گزینه‌ای یافت نشد", onChange }) {
    const dropdownRef = useRef();
    const inputRef = useRef();

    const {
        open,
        selected,
        filter,
        highlightedIndex,
        filtered,
        setOpen,
        setFilter,
        setHighlightedIndex,
        selectOption,
        handleKeyDown
    } = useDropdown(options, onChange);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 0);
    }, [open]);

    useEffect(() => {
        const handleClickOutside = e => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
                setHighlightedIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className="w-[340px] rounded-md flex flex-col gap-2 p-2"
            ref={dropdownRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {label && (
                <label className="text-[20px] font-bold text-black px-[10px]">
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="w-full p-[10px] border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
                >
                    <div className="flex items-center gap-2 flex-1 text-right">
                        {open ? (
                            <>
                                <HiSearch className="text-[#575757] text-[18px]" />
                                <input
                                    ref={inputRef}
                                    value={filter}
                                    onChange={e => {
                                        setFilter(e.target.value);
                                        setHighlightedIndex(0);
                                    }}
                                    placeholder="جست‌وجو..."
                                    className="flex-1 outline-none text-[16px] placeholder-[#575757] bg-transparent"
                                />
                            </>
                        ) : (
                            <span className="text-[16px] text-[#575757] flex-1 text-right">
                                {selected?.label || placeholder}
                            </span>
                        )}
                    </div>
                    <HiChevronDown className="text-[#575757] text-[20px] ml-2" />
                </button>

                {open && (
                    <DropdownList
                        options={filtered}
                        highlightedIndex={highlightedIndex}
                        onSelect={selectOption}
                        setHighlightedIndex={setHighlightedIndex}
                        noOptionsText={noOptionsText}
                    />
                )}
            </div>
        </div>
    );
}
