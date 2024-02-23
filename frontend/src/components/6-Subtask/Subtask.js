import React, { memo } from 'react';
import Item from '../0-subcomponents/Item.js';

function Subtask({ subtask }) {
    return (
        <Item item={subtask} itemType={'subtask'} />
    )
}
export default memo(Subtask);
