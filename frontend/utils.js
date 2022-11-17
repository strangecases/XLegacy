export const classAbrv = (classNo) => {
    if (classNo === 1 || classNo === "1") {
        return "st class";
    }
    if (classNo === 2 || classNo === "2") {
        return "nd class";
    }
    if (classNo === 3 || classNo === "3") {
        return "rd class";
    }
    return "th class";
};

export const stringOverflow = (string, noOfChars) => {
    if (noOfChars >= 9 && string.length > noOfChars) {
        return `${string.slice(0, noOfChars)}...`;
    }
    if (noOfChars >= 6 && noOfChars < 9 && string.length > noOfChars) {
        return `${string.slice(0, noOfChars)}..`;
    }
    return string;
};
