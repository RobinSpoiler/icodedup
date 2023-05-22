import { /*singInWithGoogle*/ registerUserWithEmailPassword,loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./"
//Los thunks son acciones asíncronas

//Esta función va a cambiar el estado checking disparando checkingCredentials: Recibe email and password
export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

// // export const startGoogleSignIn = () => {
// //     return async (dispatch) => {
// //         dispatch(checkingCredentials());
// //         const result = await singInWithGoogle();
// //         console.log({ result })
// //         if (result.ok == 'Failed to collect user data') {
// //             dispatch(logout(result.errorMessage));
// //         } else {
// //             dispatch(login(result))
// //         }
// //     }
// // }


/*Create user con email y password*/
export const startCreatingUserWithEmailPassword = ({ email, password, displayName, firstLastName, secondLastName, campus, id }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName, firstLastName, secondLastName, campus, id })
        // console.log("Thunks", ok, uid, photoURL, errorMessage);
        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, displayName, email, photoURL, errorMessage }));
        // console.log(logout(errorMessage))
    }
}

//Login CON EMAIL Y PASSWORD
export const startLoginWithEmailPassword = ({ email, password }) => {
    
    return async (dispatch) => {
        
        //Se hace este dispatch para controlar el estado de non auth checkin auth
        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password });

        // console.log("Result StartLoginWithEmailAndPassword", { result })

        if (!result.ok) {
            dispatch(logout(result));
        } else {
            dispatch(login(result))
        }
        
    }
}

/*Log out action to dispatch */
export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(logout());
    }
}