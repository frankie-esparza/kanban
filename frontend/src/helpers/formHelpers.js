import { capitalize } from './helpers';

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
        case 'task': return ['text', 'status_id', 'board_id'];
        case 'subtask': return ['text', 'status_id', 'task_id'];
        default: return null;
    }
}

export const getOptionsFromPropAndItemType = (kanban, prop) => {
    switch (prop) {
        case 'text': return null;
        case 'status_id': return kanban.statuses;
        case 'board_id': return kanban.boards;
        case 'task_id': return kanban.tasks;
        default: return null;
    }
}

export const getInitialFormState = (editableProps, itemType, kanban, item = null) => {
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
    return kanban.subtasks.filter(subtask => subtask.id === item.id);
}
