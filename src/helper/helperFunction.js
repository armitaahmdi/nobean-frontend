function getShortenText(text, wordCount = 5) {
    if (!text || typeof text !== 'string') return '';
    const words = text.split(" ");
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ");
}

function getInitialSelectedFilters(config) {
    return Object.keys(config).reduce((acc, key) => {
        acc[key] = "";
        return acc;
    }, {});
}

function getExcerpt(text, length = 200) {
    if (!text || typeof text !== 'string') return '';
    return text.length > length ? text.slice(0, length) + "..." : text;
}


export { getShortenText, getInitialSelectedFilters, getExcerpt };