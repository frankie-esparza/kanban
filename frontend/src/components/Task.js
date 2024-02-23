import React, { useContext, useEffect, useState, memo } from 'react';
import useFormState from '../hooks/useFormState.js';
import { KanbanContext } from '../contexts/KanbanContext.js';
import { getEditablePropsFromItemType, getInitialFormState } from '../helpers/formHelpers.js';
import axios from 'axios';
import TaskCard from './TaskCard.js';
import TaskEditDialog from './TaskEditDialog.js';

function Task({ task }) {
    const port = 5000;
    const itemType = 'task';
    const { statuses, boards, tasks, subtasks, editItem, deleteItem } = useContext(KanbanContext);
    const [subtasksOfTask, setSubtasksOfTask] = useState([]);

    // Get Subtasks & store in Local State
    useEffect(() => {
        const getSubtasksOfTask = async (taskId) => {
            axios
                .get(`http://localhost:${port}/subtasks?task_id=${taskId}`)
                .then((res) => setSubtasksOfTask(res.data))
                .catch((err) => console.error(err.message))
        }
        getSubtasksOfTask(task.id);
    }, [task.id])


    // Event Handlers
    const handleOpen = () => setFormOpen(true);
    const handleClose = () => setFormOpen(false);
    const handleDeleteClick = () => deleteItem(itemType, task.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        editItem(itemType, task.id, formState);
        setFormOpen(false);
        handleFormReset();
    }

    // Form State
    const kanban = { statuses, boards, tasks, subtasks };
    const editableProps = getEditablePropsFromItemType(itemType); // some props like id can't be edited
    let initialFormState = getInitialFormState(editableProps, task, itemType, kanban);
    const [formState, handleInputChange, handleFormReset] = useFormState({ ...initialFormState });
    const [formOpen, setFormOpen] = useState(false);

    return (
        <>
            <TaskCard
                task={task}
                numSubtasks={subtasksOfTask.length}
                handleOpen={handleOpen}
            />
            {formOpen &&
                <>
                    <TaskEditDialog
                        formState={formState}
                        formOpen={formOpen}
                        handleClose={handleClose}
                        handleDeleteClick={handleDeleteClick}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        subtasks={subtasksOfTask}
                        task={task}
                    />
                </>
            }
        </>
    )
}

export default memo(Task);
