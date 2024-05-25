import React, { memo } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { getFormTitle } from '../../helpers/formHelpers.js';
import EditIcon from '@mui/icons-material/Edit';

function ItemCard({ item, itemType, handleOpen, numSubtasks = null }) {
    const formTitle = getFormTitle("EDIT", itemType, item);

    // styles
    const styles = {
        fontSize: 20,
        color: 'text.primary',
        bgcolor: 'background.secondary',
        padding: 2,
        width: 250,
        alignContent: 'center',
        minHeight: itemType === 'task' ? 100 : 50,
    };
    const boardStyles = {
        fontSize: 30,
        alignContent: 'center',
        textTransform: 'capitalize',
    };
    const boardTitleAndDeleteButtonStyles = { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' };
    const editButtonStyles = { paddingInline: 2 };

    const editButton = (
        <Box sx={editButtonStyles}>
            {(itemType === 'board') && <EditIcon />}
        </Box>
    );

    const titleSection = (
        <Box sx={boardTitleAndDeleteButtonStyles}>
            <h4> {formTitle}</h4>
            {editButton}
        </Box>
    );

    return (
        <ButtonGroup
            variant={(itemType === 'board') ? 'text' : 'outlined'}
            sx={(itemType === 'board') ? boardStyles : styles}
            onClick={handleOpen}>
            <Box>
                {titleSection}
                <p>{numSubtasks > 0 ? `${numSubtasks} Subtasks` : ''}</p>

            </Box>
        </ButtonGroup >
    )
}

export default memo(ItemCard);
