import React, { useContext, useState, memo } from 'react';
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
import Input from './Input';
import useFormState from '../../hooks/useFormState';
import { KanbanContext, KanbanDispatchContext } from '../../contexts/KanbanContext';
import { v4 as uuidv4 } from 'uuid';
import { capitalize } from '../../helpers/helpers';
import {
    getFormTitle,
    getEditablePropsFromItemType,
    getInitialFormState,
    getSubtasks
} from '../../helpers/formHelpers';
import Box from '@mui/material/Box';

function Form({ formType, itemType, item = null }) {
    // Contexts
    const kanban = useContext(KanbanContext); // holds board, task, subtask, status data
    const dispatch = useContext(KanbanDispatchContext); // holds add/edit/delete actions for the above

    // Form State
    let editableProps = getEditablePropsFromItemType(itemType); // some props like id & itemType can't be edited
    let initialFormState = getInitialFormState(editableProps, item, itemType, kanban);
    const [formState, handleInputChange, handleFormReset] = useFormState({ ...initialFormState });
    const [formOpen, setFormOpen] = useState(false);

    // Other Form setup
    const formTitle = getFormTitle(formType, itemType, item);
    const subtasks = (itemType === 'task') ? getSubtasks(item, kanban) : null;

    // Event Handlers
    const handleOpen = () => setFormOpen(true);
    const handleClose = () => setFormOpen(false);
    const handleDeleteClick = () => dispatch({ type: 'DELETE', oldItem: item });

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormOpen(false);
        handleFormReset();
        updateKanbanContext();
    }
    function updateKanbanContext() {
        switch (formType) {
            case 'ADD': return dispatch({ type: 'ADD', newItem: { ...formState }, itemType: itemType });
            case 'EDIT': return dispatch({ type: 'EDIT', newItem: { ...formState }, oldItem: item });
            default: return null;
        }
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

    // Subtasks (if applicable)
    // - only tasks can have subtasks
    // - each subtask can be edited (Note the recursion below, each subtask contains a Form component)
    let subtasksContent;
    if (subtasks && subtasks.length > 0) {
        subtasksContent = (
            <>
                <DialogContentText>Subtasks</DialogContentText>
                {subtasks && subtasks.map(subtask =>
                    <Box key={uuidv4()} sx={{ padding: 1 }}>
                        <Form formType='EDIT' itemType='subtask' item={subtask} />
                    </Box>)}
            </>
        );
    }

    // Delete Button
    let deleteButtonContent;
    if (formType === 'EDIT') {
        deleteButtonContent = (
            <Tooltip title={`Delete ${capitalize(itemType)}`}>
                <IconButton className="delete-button" color="primary" onClick={handleDeleteClick}><DeleteIcon /></IconButton>
            </Tooltip>
        );
    }

    // styles
    const buttonStyles = {
        color: 'text.primary',
        bgcolor: (formType === 'EDIT' ? 'background.secondary' : 'background.primary'),
        padding: (formType === 'EDIT' ? 2 : 1),
        textTransform: (formType === 'EDIT' ? 'capitalize' : 'uppercase'),
        width: (formType === 'EDIT' ? 250 : null),
        alignContent: 'center',
        minHeight: (formType === 'EDIT' ? 100 : null),
    };

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
                        {formType === 'EDIT' && deleteButtonContent}
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

export default memo(Form);
