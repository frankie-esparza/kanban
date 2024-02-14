import { v4 as uuidv4 } from 'uuid';
import { getKeyFromItemType } from '../helpers/helpers';

export default function KanbanReducer(state, action) {
    let newState = { ...state };
    let oldItem;
    let newItem;
    let newItems;
    let key;

    switch (action.type) {
        case "ADD":
            let itemType = action.itemType;
            key = getKeyFromItemType(itemType);

            newItem = {
                id: uuidv4(),
                itemType: itemType,
                ...action.newItem
            };
            newItems = [...state[key], newItem];
            newState[key] = newItems;
            return newState;

        case "EDIT":
            key = getKeyFromItemType(action.oldItem.itemType);
            oldItem = action.oldItem;

            newItem = {
                id: oldItem.id,
                itemType: oldItem.itemType,
                ...action.newItem
            }
            newItems = state[key].map(item => (item.id === newItem.id) ? newItem : item);
            newState[key] = newItems;
            return newState;

        case "DELETE":
            key = getKeyFromItemType(action.oldItem.itemType);
            oldItem = action.oldItem;
            newItems = state[key].filter(item => (item.id !== oldItem.id));
            newState[key] = newItems;
            return newState;
        default:
            return state;
    }
}
