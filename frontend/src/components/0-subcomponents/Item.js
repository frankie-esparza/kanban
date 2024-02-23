import React, { useContext, useEffect, useState, memo } from 'react';
import useFormState from '../../hooks/useFormState.js';
import { KanbanContext } from '../../contexts/KanbanContext.js';
import { getEditablePropsFromItemType, getInitialFormState } from '../../helpers/formHelpers.js';
import axios from 'axios';
import ItemCard from '../0-subcomponents/ItemCard.js';
import EditDialog from '../0-subcomponents/EditDialog.js';

function Item({ item, itemType }) {
    const port = 5000;
    const id = item.id;
    const { statuses, boards, tasks, subtasks, editItem, deleteItem } = useContext(KanbanContext);
    const [subtasksOfTask, setSubtasksOfTask] = useState([]);

    // Get Subtasks & store in Local State
    useEffect(() => {
        if (itemType === 'task') {
            const getSubtasksOfTask = async (id) => {
                axios
                    .get(`http://localhost:${port}/subtasks?task_id=${id}`)
                    .then((res) => setSubtasksOfTask(res.data))
                    .catch((err) => console.error(err.message))
            }
            getSubtasksOfTask(id);
        }
    }, [id, itemType])


    // Event Handlers
    const handleOpen = () => setFormOpen(true);
    const handleClose = () => setFormOpen(false);
    const handleDeleteClick = () => deleteItem(itemType, id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        editItem(itemType, id, formState);
        setFormOpen(false);
        handleFormReset();
    }

    // Form State
    const kanban = { statuses, boards, tasks, subtasks };
    const editableProps = getEditablePropsFromItemType(itemType); // some props like id can't be edited
    let initialFormState = getInitialFormState(editableProps, item, itemType, kanban);
    const [formState, handleInputChange, handleFormReset] = useFormState({ ...initialFormState });
    const [formOpen, setFormOpen] = useState(false);

    return (
        <>
            <ItemCard
                item={item}
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
