import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { View, Text } from 'react-native'

const useDebouncedValue = (input: string = '', time: number=500 ) => {
    
    const [debouncedValue, setDebouncedValue] = useState(input);

    useEffect(() => {
        
        const timeout = setTimeout(() => {
            setDebouncedValue(input);
        }, time);

        return () => {
            clearTimeout(timeout)
        }
    }, [input])

    return debouncedValue;

}

export default useDebouncedValue
