import React, { useContext, useEffect, useState, memo } from 'react';
import useFormState from '../../hooks/useFormState.js';
import { KanbanContext } from '../../contexts/KanbanContext.js';
import Button from '@mui/material/Button';

import { getEditablePropsFromItemType, getInitialFormState } from '../../helpers/formHelpers.js';
import AddDialog from '../0-subcomponents/AddDialog.js';

function AddButton({ itemType }) {
    const { statuses, boards, tasks, subtasks, addItem } = useContext(KanbanContext);

    // Form State
    const kanban = { statuses, boards, tasks, subtasks };
    const editableProps = getEditablePropsFromItemType(itemType); // some props like id can't be edited
    let initialFormState = getInitialFormState(editableProps, itemType, kanban);
    const [formState, handleInputChange, handleFormReset] = useFormState({ ...initialFormState });
    const [formOpen, setFormOpen] = useState(false);

    // Event Handlers
    const handleOpen = () => setFormOpen(true);
    const handleClose = () => setFormOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formState', formState);
        addItem(itemType, formState);
        setFormOpen(false);
        handleFormReset();
    }

    const styles = {
        color: 'text.primary',
        bgcolor: 'background.secondary',
        padding: 4,
        textTransform: 'capitalize',
        width: 250,
        alignContent: 'center',
        minHeight: itemType === 'task' ? 100 : 50,
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
                styles={styles}
            >
                {`Add ${itemType}`}
            </Button>

            {formOpen &&
                <>
                    <AddDialog
                        formState={formState}
                        formOpen={formOpen}
                        handleClose={handleClose}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        itemType={itemType}
                    />
                </>
            }
        </>
    )
}

export default memo(AddButton);
