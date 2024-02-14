
import { teal } from '@mui/material/colors';
const goobsTeal = '#1a9c97'
const darkGrey = '#21212D';
const medGrey = '#2C2C38';
const lightGrey = '#CACAD4';
const white = '#fff';

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            ...teal,
            ...(mode === 'dark' && {
                default: white,
            }),
        },
        ...(mode === 'dark' && {
            background: {
                default: darkGrey,
                secondary: medGrey,
                active: goobsTeal,
            },
        }),
        ...(mode === 'light' && {
            background: {
                default: white,
                secondary: lightGrey,
                active: goobsTeal,
            },
        }),
        text: {
            ...(mode === 'light'
                ? {
                    primary: darkGrey,
                    secondary: lightGrey
                }
                : {
                    primary: white,
                    secondary: lightGrey
                }),
        },
    },
});
