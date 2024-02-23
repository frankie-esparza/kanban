import React, { memo } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { getFormTitle } from '../helpers/formHelpers.js';

function TaskCard({ task, numSubtasks, handleOpen }) {
    const itemType = 'task';
    const formTitle = getFormTitle("EDIT", itemType, task);

    const styles = {
        color: 'text.primary',
        bgcolor: 'background.secondary',
        padding: 2,
        textTransform: 'capitalize',
        width: 250,
        alignContent: 'center',
        minHeight: 100,
    };

    return (
        <ButtonGroup
            variant="contained"
            sx={styles}
            onClick={handleOpen}>
            <Box>
                <h4> {formTitle}</h4>
                <p>{numSubtasks > 0 ? `${numSubtasks} Subtasks` : ''}</p>
            </Box>
        </ButtonGroup >
    )
}

export default memo(TaskCard);
