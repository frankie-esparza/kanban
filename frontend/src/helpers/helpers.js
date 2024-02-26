export const capitalize = (str) => {
    if (!str) return null;
    return str[0].toUpperCase() + str.toLowerCase().slice(1);
}

export const convertToKebabCase = (str) => {
    let words = str.split(' ');
    let lowerCaseWords = words.map(word => word.toLowerCase());
    return lowerCaseWords.join('-');
}

export const convertFromKebabCase = (str) => {
    let words = str.split('-');
    let capitalizedWords = words.map(word => capitalize(word));
    return capitalizedWords.join(' ');
}

export const getParentItemType = (itemType) => {
    switch (itemType) {
        case 'task': return 'board';
        case 'subtask': return 'task';
        default: return null;
    }
}

export const getTableNameFromItemType = (itemType) => {
    if (itemType === "status") return itemType + 'es';
    else return itemType + 's';
}
