import React, { memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonGroup from '@mui/material/ButtonGroup';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';

import { getFormTitle, getEditablePropsFromItemType } from '../../helpers/formHelpers.js';
import Input from '../0-subcomponents/Input.js';
import Subtask from '../6-Subtask/Subtask.js';
import DeleteButton from './DeleteButton.js';
import AddButton from './AddButton.js';

function EditDialog(
    {
        formState,
        formOpen,
        handleClose,
        handleInputChange,
        handleSubmit,
        item,
        itemType,
        subtasks = null,
    }) {

    const editableProps = getEditablePropsFromItemType(itemType); // some props like id & itemType can't be edited
    const formTitle = getFormTitle("EDIT", itemType, item);

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
        <DeleteButton item={item} itemType={itemType} />
    );

    const addSubtaskButton = (
        <Box sx={{ padding: 2 }}>
            <AddButton itemType='subtask' />
        </Box>
    );

    const formHeader = (
        <ButtonGroup variant="outlined">
            <DialogTitle>{formTitle}</DialogTitle>
            {itemType === 'task' && addSubtaskButton}
            {deleteButton}
        </ButtonGroup>
    );

    const formFooter = (
        <DialogActions>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit">Submit</Button>
        </DialogActions>
    );

    let subtasksList = null;
    if (subtasks) {
        subtasksList = (
            <Box sx={{ padding: 2 }}>
                {subtasks.length > 0 && <h4>Subtasks</h4>}
                {subtasks.map(subtask =>
                    <Box key={subtask.id} sx={{ padding: 1 }}>
                        <Subtask subtask={subtask} />
                    </Box>)}
            </Box>

        );
    }

    const editFormSection = (
        <Box sx={{ padding: 2 }}>
            {formHeader}
            {formFields}
            {formFooter}
        </Box >
    );

    return (
        <Dialog
            open={formOpen}
            onClose={handleClose}
            PaperProps={{ component: 'form', onSubmit: handleSubmit }}
        >
            {editFormSection}
            {subtasksList}
        </Dialog >
    )
}

export default memo(EditDialog);
