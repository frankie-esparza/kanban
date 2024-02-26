import React, { useContext, useEffect, useState, memo } from 'react';
import useFormState from '../../hooks/useFormState.js';
import { KanbanContext } from '../../contexts/KanbanContext.js';
import { convertToKebabCase } from '../../helpers/helpers.js';
import { getEditablePropsFromItemType, getInitialFormState } from '../../helpers/formHelpers.js';
import { axiosKanban } from '../../contexts/KanbanContext.js';
import ItemCard from '../0-subcomponents/ItemCard.js';
import EditDialog from '../0-subcomponents/EditDialog.js';
import { useNavigate } from 'react-router-dom';

function Item({ item, itemType }) {
    const navigate = useNavigate();
    const { statuses, boards, tasks, subtasks, editItem, deleteItem } = useContext(KanbanContext);
    const [subtasksOfTask, setSubtasksOfTask] = useState([]);

    // Form State
    const kanban = { statuses, boards, tasks, subtasks };
    const editableProps = getEditablePropsFromItemType(itemType); // some props like id can't be edited
    let initialFormState = getInitialFormState(editableProps, itemType, kanban, item);

    const [formState, handleInputChange, handleFormReset] = useFormState({ ...initialFormState });
    const [formOpen, setFormOpen] = useState(false);

    // Get Subtasks of Task (only if item is a Task - i.e. not a Subtask)
    useEffect(() => {
        const getSubtasksOfTask = async (id) => {
            axiosKanban
                .get(`subtasks?task_id=${id}`)
                .then((res) => setSubtasksOfTask(res.data))
                .catch((err) => console.error(err.message))
        }

        // If item is a Task, Get Subtasks & store in Local State
        if (itemType === 'task') {
            console.log(item.text, '--- getting subtasks');
            getSubtasksOfTask(item.id);
        }
    }, [subtasks, item.id, item.text, itemType])

    // Event Handlers
    const handleOpen = () => setFormOpen(true);
    const handleClose = () => setFormOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        editItem(itemType, item.id, formState);
        setFormOpen(false);
        handleFormReset();

        // If the name of the board changed, navigate to the board
        if (itemType === 'board') {
            let newRoute = convertToKebabCase(formState.text);
            navigate(`/${newRoute}`)
        }
    }

    return (
        <>
            <ItemCard
                item={item}
                itemType={itemType}
                numSubtasks={subtasksOfTask.length}
                handleOpen={handleOpen}
            />
            {formOpen &&
                <>
                    <EditDialog
                        formState={formState}
                        formOpen={formOpen}
                        handleClose={handleClose}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        subtasks={subtasksOfTask}
                        item={item}
                        itemType={itemType}
                    />
                </>
            }
        </>
    )
}

export default memo(Item);
