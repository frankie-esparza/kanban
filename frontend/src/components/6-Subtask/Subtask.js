import React, { useContext, useEffect, useState, memo } from 'react';
import useFormState from '../../hooks/useFormState.js';
import { KanbanContext } from '../../contexts/KanbanContext.js';
import { getEditablePropsFromItemType, getInitialFormState } from '../../helpers/formHelpers.js';
import ItemCard from '../0-subcomponents/ItemCard.js';
import EditDialog from '../0-subcomponents/EditDialog.js';

function Subtask({ subtask }) {
    const itemType = 'subtask';
    const id = subtask.id;
    const { statuses, boards, tasks, subtasks, editItem, deleteItem } = useContext(KanbanContext);

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
    let initialFormState = getInitialFormState(editableProps, subtask, itemType, kanban);
    const [formState, handleInputChange, handleFormReset] = useFormState({ ...initialFormState });
    const [formOpen, setFormOpen] = useState(false);

    return (
        <>
            <ItemCard
                item={subtask}
                itemType={itemType}
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
                        item={subtask}
                        itemType={itemType}
                    />
                </>
            }
        </>
    )
}

export default memo(Subtask);
