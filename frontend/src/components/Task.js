import React, { useContext, useEffect, useState, memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Input from './forms/Input.js';
import useFormState from '../hooks/useFormState.js';
import { KanbanContext } from '../contexts/KanbanContext.js';
import { v4 as uuidv4 } from 'uuid';
import { capitalize } from '../helpers/helpers.js';
import { getFormTitle, getEditablePropsFromItemType, getInitialFormState } from '../helpers/formHelpers.js';
import Box from '@mui/material/Box';
import { fetchWrapper } from '../helpers/fetchHelpers.js';

function Task({ task }) {
    const port = 5000;
    const itemType = 'task';
    const { statuses, boards, tasks, subtasks, editItem, deleteItem } = useContext(KanbanContext);
    const [subtasksShown, setSubTasksShown] = useState([]);

    useEffect(() => {
        const getSubTasksForTask = async (taskId) => {
            const res = await fetch(`http://localhost:${port}/subtasks?task_id=${taskId}`);
            const tasks = await res.json();
            setSubTasksShown(tasks);
        }
        fetchWrapper(() => getSubTasksForTask(task.id));
    }, [])

    // Form State
    let editableProps = getEditablePropsFromItemType(itemType); // some props like id & itemType can't be edited
    const kanban = { statuses, boards, tasks, subtasks };
    let initialFormState = getInitialFormState(editableProps, task, itemType, kanban);
    const [formState, handleInputChange, handleFormReset] = useFormState({ ...initialFormState });
    const [formOpen, setFormOpen] = useState(false);

    // Event Handlers
    const handleOpen = () => setFormOpen(true);
    const handleClose = () => setFormOpen(false);
    const handleDeleteClick = () => { fetchWrapper(deleteItem(itemType, task.id)) };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormOpen(false);
        handleFormReset();
        fetchWrapper(editItem(itemType, task.id, formState));
    }

    // Form Inputs
    const inputContent = (
        <ul>
            {editableProps.map(prop =>
                <li key={uuidv4()}>
                    <Box sx={{ padding: 2 }}>
                        <Input
                            prop={prop}
                            itemType={itemType}
                            formState={formState}
                            handleInputChange={handleInputChange}
                        />
                    </Box>
                </li>)}
        </ul>
    );

    let subtasksContent;
    if (subtasksShown && subtasksShown.length > 0) {
        subtasksContent = (
            <>
                <DialogContentText>Subtasks</DialogContentText>
                {subtasksShown.map(subtask =>
                    <Box key={uuidv4()} sx={{ padding: 1 }}>
                        <p>{subtask.text}</p>
                    </Box>)}
            </>
        );
    }

    // Delete Button
    let deleteButtonContent = (
        <Tooltip title={`Delete ${capitalize(itemType)}`}>
            <IconButton className="delete-button" color="primary" onClick={handleDeleteClick}><DeleteIcon /></IconButton>
        </Tooltip>
    );

    // styles
    const buttonStyles = {
        color: 'text.primary',
        bgcolor: 'background.secondary',
        padding: 2,
        textTransform: 'capitalize',
        width: 250,
        alignContent: 'center',
        minHeight: 100,
    };

    const formTitle = getFormTitle("EDIT", itemType, task);

    return (
        <>
            <ButtonGroup
                variant="contained"
                sx={buttonStyles}
                onClick={handleOpen}>
                <Box>
                    <h4> {formTitle}</h4>
                    {subtasks && subtasks.length > 0 && <p>{`${subtasks.length} subtasks`}</p>}
                </Box>

            </ButtonGroup >
            {formOpen &&
                <Dialog
                    open={formOpen}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleSubmit
                    }}
                >
                    <ButtonGroup variant="outlined">
                        <DialogTitle>{formTitle}</DialogTitle>
                        {deleteButtonContent}
                    </ButtonGroup>
                    <DialogContent>
                        {inputContent}
                        {subtasks && subtasksContent}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </Dialog >
            }
        </>
    )
}

export default memo(Task);
