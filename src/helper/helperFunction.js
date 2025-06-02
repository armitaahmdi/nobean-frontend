function getShortenText(text, wordCount = 5) {
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


export { getShortenText, getInitialSelectedFilters };