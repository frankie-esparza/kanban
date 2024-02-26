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

function AddDialog(
    {
        formState,
        formOpen,
        handleClose,
        handleInputChange,
        handleSubmit,
        itemType,
    }) {

    const editableProps = getEditablePropsFromItemType(itemType); // some props like id & itemType can't be edited
    const formTitle = getFormTitle("ADD", itemType);

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

    const formHeader = (
        <ButtonGroup variant="outlined">
            <DialogTitle>{formTitle}</DialogTitle>
        </ButtonGroup>
    );

    const formFooter = (
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
        </DialogActions>
    );

    const addFormSection = (
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
            {addFormSection}
        </Dialog >
    )
}

export default memo(AddDialog);
