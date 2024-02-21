import { port } from '../components/KanbanApp';

export const fetchWrapper = async (fetchFunc) => {
    try {
        fetchFunc();
    } catch (err) {
        console.error(err.message);
    }
}
