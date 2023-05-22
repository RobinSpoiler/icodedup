import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout } from '../store/auth'
import { FirebaseAuth } from "../firebase/config";

/*Cuando el estado de la autenticación cambia se vuelve a disparar
Este es un observer */
export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //onAuthStateChange permite "estar pendiente" del estado
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            // console.log(user)

            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }))
        })
    }, []);

    return (
        status
    )
}
