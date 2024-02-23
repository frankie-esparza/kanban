import React, { memo } from 'react';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function LabeledSwitch({ handleChange, checked }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <DarkModeIcon />
            <Switch
                checked={!checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'switch' }} />
            <LightModeIcon />
        </Box>
    );
}

export default memo(LabeledSwitch);
