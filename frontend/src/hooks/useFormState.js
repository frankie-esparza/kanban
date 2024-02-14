import { useState } from 'react';

export default function useFormState(initialState = {}) {
    const [formState, setFormState] = useState(initialState);
    const handleInputChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });
    const handleFormReset = (e) => setFormState(initialState);
    return [formState, handleInputChange, handleFormReset];
}
