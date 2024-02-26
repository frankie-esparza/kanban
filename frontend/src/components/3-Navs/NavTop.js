import { memo } from 'react';
import Box from '@mui/material/Box';
import Item from '../0-subcomponents/Item';
import AddButton from '../0-subcomponents/AddButton';

function NavTop({ board }) {
    const navTopStyles = { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'background.secondary' };
    const addButtonStyles = { marginBottom: 3 };

    return (
        <Box sx={navTopStyles}>
            <Item item={board} itemType='board' />
            <Box sx={addButtonStyles}>
                <AddButton itemType='task' />
            </Box>

        </Box>
    );
}

export default memo(NavTop);
