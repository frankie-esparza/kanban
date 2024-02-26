import { useReducer, useEffect } from 'react';

export default function useLocalStorageReducer(key, defaultValue, reducer) {
    const [state, dispatch] = useReducer(reducer, defaultValue, () => {
        return JSON.parse(window.localStorage.getItem(key) || JSON.stringify(defaultValue));
    })

    // When state is updated, update the corresponding value in Local Storage
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, dispatch]
}
