import React, { useContext, useEffect, useState, memo } from 'react';
import { capitalize, getParentItemType } from '../../helpers/helpers.js';
import { getOptionsFromPropAndItemType } from '../../helpers/formHelpers.js';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { KanbanContext } from '../../contexts/KanbanContext.js'
import { v4 as uuidv4 } from 'uuid';

function Input({ prop, itemType, formState, handleInputChange }) {
    const { statuses, boards, tasks, subtasks } = useContext(KanbanContext);

    const getLabel = () => {
        let label;
        if (prop === 'text' || prop === 'status') label = prop;
        else label = getParentItemType(itemType);
        return capitalize(label);
    }

    let label = getLabel();
    const kanban = { statuses, boards, tasks, subtasks };
    let options = getOptionsFromPropAndItemType(kanban, prop, itemType);

    let content;
    if (prop === 'text') {
        content = (
            <TextField
                variant="outlined"
                id={prop}
                name={prop}
                value={formState[prop]}
                onChange={handleInputChange}
                label={label}
                required
                autoFocus // focus stays on the textField until you click another field
            />
        );
    } else {
        content = (
            <Select
                variant="outlined"
                id={prop}
                name={prop}
                value={formState[prop]}
                onChange={handleInputChange}
                label={label}
                required
            >
                {options.map(option => <MenuItem key={uuidv4()} value={option.id}>{option.text}</MenuItem>)}
            </Select>
        );
    }

    return (
        <>
            {content}
        </>
    )
}

export default memo(Input);
