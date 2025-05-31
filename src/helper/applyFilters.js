export function applyFilters(data, filters) {
    let result = [...data];

    if (filters.badges) {
        result = result.filter((item) => item.badge === filters.badges);
    }

    if (filters.categories) {
        result = result.filter((item) => item.category === filters.categories);
    }

    if (filters.sortOptions === "قیمت") {
        result.sort((a, b) => a.price - b.price);
    } else if (filters.sortOptions === "بیشترین انجام") {
        result.sort((a, b) => b.participants - a.participants);
    } else if (filters.sortOptions === "بیشترین امتیاز") {
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
}
