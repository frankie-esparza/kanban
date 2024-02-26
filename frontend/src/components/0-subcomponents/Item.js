import React, { useContext, useEffect, useState, memo } from 'react';
import useFormState from '../../hooks/useFormState.js';
import { KanbanContext } from '../../contexts/KanbanContext.js';
import { getEditablePropsFromItemType, getInitialFormState } from '../../helpers/formHelpers.js';
import axios from 'axios';
import ItemCard from '../0-subcomponents/ItemCard.js';
import EditDialog from '../0-subcomponents/EditDialog.js';

function Item({ item, itemType }) {
    const port = 5000;
    const { statuses, boards, tasks, subtasks, editItem, deleteItem } = useContext(KanbanContext);
    const [subtasksOfTask, setSubtasksOfTask] = useState([]);

    // Form State
    const kanban = { statuses, boards, tasks, subtasks };
    const editableProps = getEditablePropsFromItemType(itemType); // some props like id can't be edited
    let initialFormState = getInitialFormState(editableProps, itemType, kanban, item);

    const [formState, handleInputChange, handleFormReset] = useFormState({ ...initialFormState });
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        const getSubtasksOfTask = async (id) => {
            axios
                .get(`http://localhost:${port}/subtasks?task_id=${id}`)
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
    const handleDeleteClick = () => deleteItem(itemType, item.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        editItem(itemType, item.id, formState);
        setFormOpen(false);
        handleFormReset();
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
                        handleDeleteClick={handleDeleteClick}
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
