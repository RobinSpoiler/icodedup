//Proveedores de autenticación
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authSlice } from '../store/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

//Función para autenticar con Google
// export const singInWithGoogle = async () => {
//     try {
//         const result = await signInWithPopup(FirebaseAuth, googleProvider); //el segundo argumento es el proveedor
//         const credentials = GoogleAuthProvider.credentialFromResult(result);
//         // console.log({credentials});
//         const { displayName, email, photoURL, uid } = result.user;
//         return {
//             ok: 'User data collected',

//             //User info
//             displayName, email, photoURL, uid
//         }
//     }
//     catch (error) {

//         const errorCode = error.code;
//         const errorMessage = error.message;
//         const email = error.customData.email;
//         const credential = GoogleAuthProvider.credentialFromError(error);

//         return {
//             ok: 'Failed to collect user data',
//             errorMessage
//         }
//     }
// }


//Proveedor para registrarse con usuario y password
export const registerUserWithEmailPassword = async ({ email, password, displayName, firstLastName, secondLastName, campus, id }) => {
    try {
        // console.log({ id, email, password, displayName })
        /*createUserWithEmailAndPassword solo llama el auth, email y password para trabajar */
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user; //cosas que vienen del usuario de Firebase
        // console.log("Provider", resp);
        await updateProfile(FirebaseAuth.currentUser, { displayName }); //Así sabemos que estamos modificando el usuario actual

        return {
            ok: true,
            uid, photoURL, email, displayName, firstLastName, secondLastName, campus, id
        }

    } catch (error) {
        /*Aquí se pondrían las validaciones para errores de Firebase */
        return { ok: false, errorMessage: error.message }
    }
}

/*Autenticación con email y password */
export const loginWithEmailPassword = async ({email, password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password); //el segundo argumento es el proveedor
        // console.log({credentials});
        const { displayName, photoURL, uid } = resp.user;
        return {
            ok: true,
            uid, photoURL, displayName, email
        }
    }
    catch (error) {

        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

/* LogOut from the app = not authenticated */
export const logoutFirebase =  async() => {
    return await FirebaseAuth.signOut();
}