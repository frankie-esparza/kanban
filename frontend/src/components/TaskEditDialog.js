import React, { memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Input from './forms/Input.js';
import { v4 as uuidv4 } from 'uuid';
import { capitalize } from '../helpers/helpers.js';
import { getFormTitle, getEditablePropsFromItemType } from '../helpers/formHelpers.js';
import Box from '@mui/material/Box';

function TaskEditDialog(
    {
        formState,
        formOpen,
        handleClose,
        handleDeleteClick,
        handleInputChange,
        handleSubmit,
        subtasks,
        task
    }) {
    const itemType = 'task';
    const editableProps = getEditablePropsFromItemType(itemType); // some props like id & itemType can't be edited
    const formTitle = getFormTitle("EDIT", itemType, task);

    const formFields = (
        <DialogContent>
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
        </DialogContent>

    );

    const deleteButton = (
        <Tooltip title={`Delete ${capitalize(itemType)}`}>
            <IconButton className="delete-button" color="primary" onClick={handleDeleteClick}><DeleteIcon /></IconButton>
        </Tooltip>
    );

    const formHeader = (
        <ButtonGroup variant="outlined">
            <DialogTitle>{formTitle}</DialogTitle>
            {deleteButton}
        </ButtonGroup>
    );

    const formFooter = (
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
        </DialogActions>
    );

    const subtasksList = (
        <Box sx={{ padding: 1 }}>
            {subtasks.length > 0 && <h4>Subtasks</h4>}
            {subtasks.map(subtask =>
                <Box key={subtask.id} sx={{ padding: 5 }}>
                    <p>{subtask.text}</p>
                </Box>)}
        </Box>
    );

    return (
        <Dialog
            open={formOpen}
            onClose={handleClose}
            PaperProps={{ component: 'form', onSubmit: handleSubmit }}
        >
            {formHeader}
            {formFields}
            {formFooter}
            {subtasksList}
        </Dialog >
    )
}

export default memo(TaskEditDialog);
