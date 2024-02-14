
import { capitalize, getParentKeyFromItemType } from './helpers';

export const getFormTitle = (formType, itemType, item) => {
    switch (formType) {
        case 'ADD': return `${capitalize(formType)} ${capitalize(itemType)}`;
        case 'EDIT': return `${capitalize(item.text)}`;
        default: return null;
    }
}

export const getEditablePropsFromItemType = (itemType) => {
    switch (itemType) {
        case 'status': return ['text'];
        case 'board': return ['text'];
        case 'task': return ['text', 'status', 'parentId'];
        case 'subtask': return ['text', 'status', 'parentId'];
        default: return null;
    }
}

export const getOptionsFromPropAndItemType = (kanban, prop, itemType) => {
    switch (prop) {
        case 'text': return null;
        case 'status': return kanban.statuses;
        default: return kanban[getParentKeyFromItemType(itemType)];
    }
}

export const getInitialFormState = (editableProps, item, itemType, kanban) => {
    let initialFormState = {};
    editableProps.forEach(prop =>
        initialFormState[prop] = (item ? item[prop] : getDefaultValue(kanban, prop, itemType))
    );
    return initialFormState;
}

function getDefaultValue(kanban, prop, itemType) {
    if (prop === 'text') return '';
    let options = getOptionsFromPropAndItemType(kanban, prop, itemType);
    return options[0].id;
}

export const getSubtasks = (item, kanban) => {
    if (!item) return null;
    return kanban.subtasks.filter(subtask => subtask.parentId === item.id);
}
