import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";

export function Authorize() {

    // signup 
    const registerUser = async (fullname, email, password) => {

        const defaultprofileimg = "https://static.thenounproject.com/png/65476-200.png";

        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // console.log(user);

            await updateProfile(user, {
                displayName: fullname,
                photoURL: defaultprofileimg
            }).then(() => {

                //  set name to local storage
                // setLocalName(user.displayName);


                // redirect to index.html
                window.location.href = '../signin.html';
            });



        } catch (err) {
            console.error("Error registeration users : ", err);
        }

    }

    // signin 
    const loginUser = (email, password) => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // console.log(userCredential.user);

                // set name to local storage
                setLocalName(userCredential.user.displayName);
                

                // redirect to index.html
                window.location.href = '../index.html';

            })
            .catch((error) => {
                console.error("Error Logging : ", error.message);
            });
    }

    // signout 
    const logoutUser = () => {

        signOut(auth).then(() => {

            // unset name from local storage 
            unsetLocalName();

            window.location.href = '../signin.html';
        }).catch((error) => {
            console.log("Error logging out : ", error.message);
        });
    }

    // reset password 
    const resetPassword = async (email, msg) => {

        try {

            await sendPasswordResetEmail(auth, email);
            msg.textContent = "Password reset email send. Please check your inbox.";
            msg.style.color = "green";
            msg.style.fontSize = "11px";

        } catch (err) {
            console.log("Error sending password reset email : ", err.message);

            msg.textContent = `Error : ${err.message}`;
            msg.style.color = "red";
        }

    }

    // google signin 
    const googleLogin = () => {

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {

                // console.log(result.user);

                //  set name to local storage
                 setLocalName(result.user.displayName);

                // redirect to index.html
                window.location.href = '../index.html';

            }).catch((error) => {
                console.log("Error with google sign-in : ", error.message);
            });
    }

    // auth check 
    const isLoggedIn = () => {

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                return true;
            } else {
                // redirect to index.html
                window.location.href = '../signin.html';
            }
        });

    }

    // get user info 
    const getUser = (callback) => {
        // callback('hello sir');

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                callback(userdata);
            }
        });

    }

    const setLocalName = (userdata) => {
        localStorage.setItem('username',userdata);
    }

    const unsetLocalName = () => {
        localStorage.removeItem('username');
    }


    return { registerUser, loginUser, logoutUser, resetPassword, googleLogin, isLoggedIn, getUser }
}