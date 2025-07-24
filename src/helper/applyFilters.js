export function applyFilters(data, filters) {
    let result = [...data];

    if (filters.target_audience) {
        result = result.filter((item) => item.target_audience === filters.target_audience);
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

    if (filters.gender && filters.gender.length > 0) {
        result = result.filter((item) => filters.gender.includes(item.gender));
    }

    if (filters.service && filters.service.length > 0) {
        result = result.filter((item) => {
            const isOnline = filters.service.includes("آنلاین") && item.service.type === "آنلاین";
            const isInPerson = filters.service.includes("حضوری") && item.service.location && item.service.location !== "-";
            return isOnline || isInPerson;
        });
    }

    if (filters.scientificDegree && filters.scientificDegree.length > 0) {
        result = result.filter((item) =>
            filters.scientificDegree.includes(item.scientificDegree)
        );
    }

    return result;
}
