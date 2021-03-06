import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyAX6K-PbIdDqY0m6_jGKR16V7PANAp_6as",
  authDomain: "crwm-db-271e6.firebaseapp.com",
  databaseURL: "https://crwm-db-271e6.firebaseio.com",
  projectId: "crwm-db-271e6",
  storageBucket: "crwm-db-271e6.appspot.com",
  messagingSenderId: "15468459575",
  appId: "1:15468459575:web:df90d6ffeb2de5f64e31b2"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const useRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await useRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await useRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return useRef;
};

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;
