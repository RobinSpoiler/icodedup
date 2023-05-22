import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //states: 'checking', 'not-authenticated', 'auth'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
        //Información que esta fluyendo en el Store
    },

    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated',
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated',
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
        },

        //         //Verifica si sigue autenticado (Loading state, evita dobles submits)
        checkingCredentials: (state) => {
            state.status = 'checking';
        },

    },
});

// Action creators are generated for each case reducer function
//Estas son las funciones que vamos a disparar
export const { login, logout, checkingCredentials } = authSlice.actions;

// export default authSlice.reducer