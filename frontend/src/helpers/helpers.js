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

// ----------------------------------------------
// GET ITEM TYPES
// ----------------------------------------------
// itemType can be 'status', 'board', 'task', or 'subtask
export const getChildItemType = (itemType) => {
    switch (itemType) {
        case 'board': return 'task';
        case 'task': return 'subtask';
        default: return null;
    }
}

export const getParentItemType = (itemType) => {
    switch (itemType) {
        case 'task': return 'board';
        case 'subtask': return 'task';
        default: return null;
    }
}

// ----------------------------------------------
// GET KEYS
// ----------------------------------------------
// the key is used to look up the items
// in the kanban object of KanbanContext
export const getKeyFromItemType = (itemType) => {
    if (itemType === "status") return itemType + 'es';
    else return itemType + 's';
}

export const getChildKeyFromItemType = (itemType) => {
    let childItemType = getChildItemType(itemType);
    return childItemType + 's';
}

export const getParentKeyFromItemType = (itemType) => {
    let parentItemType = getParentItemType(itemType);
    if (parentItemType) return parentItemType + 's';
}
