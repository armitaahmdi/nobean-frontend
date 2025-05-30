import { useState, useMemo } from "react";

export default function useDropdown(options, onChange) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    const filtered = useMemo(
        () =>
            options.filter(opt =>
                opt.label.toLowerCase().includes(filter.toLowerCase())
            ),
        [filter, options]
    );

    const selectOption = (option) => {
        setSelected(option);
        setOpen(false);
        setFilter("");
        setHighlightedIndex(null);
        onChange?.(option);
    };

    const handleKeyDown = (e) => {
        if (!open) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex(i => (i === null || i === filtered.length - 1 ? 0 : i + 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex(i => (i === null || i === 0 ? filtered.length - 1 : i - 1));
        } else if (e.key === "Enter" && highlightedIndex !== null) {
            e.preventDefault();
            selectOption(filtered[highlightedIndex]);
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    };

    return {
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
    };
}
