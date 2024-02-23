import React, { memo } from 'react';
import Item from '../0-subcomponents/Item.js';

function Task({ task }) {
    return (
        <Item item={task} itemType={'task'} />
    )
}

export default memo(Task);
