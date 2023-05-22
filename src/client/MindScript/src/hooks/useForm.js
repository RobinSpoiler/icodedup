import { useState, useEffect, useMemo } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const onResetForm = () => {
        setFormState(initialForm);
    }

    /*onInputChange maneja el estado de los inputs del formulario */
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }


    /*Función que se dispara con useEffect 
    Crea un nuevo estado que verifica si las validaciones coinciden*/
    const [formValidation, setFormValidations] = useState({});

    const createValidators = () => {
        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage = 'Este campo es requerido'] = formValidations[formField];
            // console.log(formField) este es un iterador de las propiedades que vienen del arreglo formData
            // console.log(errorMessage)
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
            //returns null == validated else returns errorMessage
        }
        setFormValidations(formCheckedValues);
        // console.log(formCheckedValues); formCheckedValues retorna el objeto con nulls o los mensajes de error
    }

    /*Disclaimer: formValidationS con s viene de Register page y es un objeto, la que no 
    tiene s es el estado, tiene todas las propiedades del objeto 
    Cada vez que cambie el valor de alguna de las variables se dispara esta función
    para validar el nuevo valor*/
    useEffect(() => {
        createValidators();
    }, [formState])


    //Validar todo el objeto
    const isFormValid = useMemo(() => {
        //Todas deben de regresar null en el objeto para que el form sea válido
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation])


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}