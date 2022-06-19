const classAbrv = (classNo) => {
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

export default classAbrv;
