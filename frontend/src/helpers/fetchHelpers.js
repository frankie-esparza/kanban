import { port } from '../components/KanbanApp';

export const fetchWrapper = async (fetchFunc) => {
    try {
        const res = fetchFunc();
        return res;
    } catch (err) {
        console.error(err.message);
    }
}
