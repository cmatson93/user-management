import { useState, useEffect, useCallback } from 'react';

const isPropertyValid = (validationSchema, state, key) => {
    const propertySchema = validationSchema[key];
    const property = state[key];
    const isInputFieldRequired = propertySchema.required;
    let stateValue; // state value
    if (propertySchema.validator && propertySchema.validator.type && propertySchema.validator.type === 'array') {
        stateValue = property && property.value && property.value.length > 0;
    } else if (propertySchema.validator && propertySchema.validator.type && propertySchema.validator.type === 'object') {
        stateValue = property && property.value && Object.keys(property.value).length > 0;
    } else {
        stateValue = property && property.value; 
    }

    const stateError = property && property.error; // state error
    const isRelatedPropertyValid = propertySchema.relatedProperty && isPropertyValid(validationSchema, state, propertySchema.relatedProperty);
    return (!isInputFieldRequired || stateValue || isRelatedPropertyValid) && !stateError;
};

export const useForm = (stateSchema, validationSchema = {}, callback, labelList, stateDependency = {}) => {
    
    const [state, setState] = useState(stateSchema);
    const [disable, setDisable] = useState(true);

    // Disable button in initial render.
    useEffect(() => {
        setDisable(true);
    }, []);

    // Used to disable submit button if there's an error in state
    // or the required field in state has no value.
    // Wrapped in useCallback to cache the function to avoid intensive memory leaks
    // in every re-render in component
    const validateState = useCallback(() => {
        const hasErrorInState = Object.keys(validationSchema)
            .some(key => !isPropertyValid(validationSchema, state, key));

        return hasErrorInState;
    }, [state, validationSchema]);

    // For every changed in our state this will be fired
    // To be able to disable the button
    useEffect(() => {
            setDisable(validateState());
    }, [state, validateState]);

    const validateInput = useCallback((name, value, currentState=state) => {
        let updatedState = { ...currentState };
        let error = '';
        const propertySchema = validationSchema[name];
        
        if (
            propertySchema.required
            && !value
            && !(
                propertySchema.relatedProperty && state[propertySchema.relatedProperty] && state[propertySchema.relatedProperty].value
            )
        ) {
            error = 'This Field is required'
        }
       
        const validator = propertySchema.validator;
        if (
            validator !== null && typeof validator === 'object'
        ) {
            const regEx = validator.regEx;
            const fn = validator.fn;
            if (
                regEx && value && !regEx.test(value)
                || fn && value && !fn(value)
            ) {
                error = validator.error;
            }
            if (validator.limit && value.length > validator.limit){
                error = validator.limitError;
            }
        }

        //If this field updates other fields (it has dependents)
        if (stateDependency[name]) {
            stateDependency[name].dependents.forEach(dep => {
                let depError = '';
                const depValue = dep.conversion(value);
                const depValidator = validationSchema[dep.name].validator;
                const regEx = depValidator.regEx;
                const fn = depValidator.fn;
                if (
                    regEx && depValue && !regEx.test(depValue)
                    || fn && depValue && !fn(depValue)
                ) {
                    depError = depValidator.error;
                }
                updatedState[dep.name] = { value: depValue, error: depError };
            });
        }

        updatedState[name] = { value, error };
        
        return updatedState;
    }, [state, validationSchema, stateDependency]);

    // Used to handle every changes in every input
    const handleOnChange = useCallback(
        event => {
      
            if(event){
                const name = event.name !== undefined ? event.name : event.target !== undefined ? event.target.name : null;
                const value = event.value !== undefined ? event.value : event.target !== undefined ? event.target.value : null;
                let updatedState = validateInput(name, value);

                if (event.relatedValue) {
                    const propertySchema = validationSchema[name];
                    const relatedName = propertySchema.relatedProperty;
                    updatedState = validateInput(relatedName, event.relatedValue, updatedState);
                }
                
                setState(updatedState);
            }

        },
        [validateInput, validationSchema]
    );

    const handleOnSubmit = useCallback(
        event => {
            event.preventDefault();

            // Make sure that validateState returns false
            // Before calling the submit callback function
            if (!validateState()) {
                callback(state, labelList);
            } 
       
        },
        [state, labelList, callback, validateState]
    );

    return { state, disable, handleOnChange, handleOnSubmit };
};
