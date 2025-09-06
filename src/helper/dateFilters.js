// utils/dateFilters.js

export function filterByDateRange(items, fieldName = "created_at", range = "1m") {
    if (!Array.isArray(items)) return [];

    const now = new Date();
    let fromDate;

    switch (range) {
        case "7d":
            fromDate = new Date(now);
            fromDate.setDate(now.getDate() - 7);
            break;
        case "1m":
            fromDate = new Date(now);
            fromDate.setMonth(now.getMonth() - 1);
            break;
        case "3m":
            fromDate = new Date(now);
            fromDate.setMonth(now.getMonth() - 3);
            break;
        case "all":
        default:
            return items;
    }

    return items.filter((item) => {
        const date = new Date(item[fieldName]);
        return date >= fromDate && date <= now;
    });
}
