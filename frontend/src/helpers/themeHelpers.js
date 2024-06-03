
import { grey } from '@mui/material/colors';
const accent = '#A3CEF3'
const darkGrey = '#21212D';
const medGrey = '#2C2C38';
const lightGrey = '#CACAD4';
const white = '#fff';

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: accent,
            secondary: lightGrey,
            ...grey,
            ...(mode === 'dark' && {
                default: white,
            }),
            accent
        },
        ...(mode === 'dark' && {
            background: {
                default: darkGrey,
                secondary: medGrey,
                active: accent,
            },
        }),
        ...(mode === 'light' && {
            background: {
                default: white,
                secondary: lightGrey,
                active: accent,
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
        }
    },
});
