// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { 
    getAuth,
    GithubAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
} from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5gl9t2_BdZ_O43d60EmA1cJZYHnY5XVA",
  authDomain: "twitfake-9a40c.firebaseapp.com",
  projectId: "twitfake-9a40c",
  storageBucket: "twitfake-9a40c.appspot.com",
  messagingSenderId: "663645009749",
  appId: "1:663645009749:web:f577e60bbf3b1dd00ea1dc",
  measurementId: "G-6RLZ0V3JX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//Sign in with GitHub
const githubProvider = new GithubAuthProvider();

//A function that maps the info recived from Firebase (to avoid rewriting code)
const mapUserInfo = (result) => {
  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  const credential = GithubAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;

  // The signed-in user info.
  const user = result.user;

  //I only want to get the info I will need:
  const { auth } = user;
  // auth has inside the info I'm looking for
  const { currentUser } = auth;
  // currentUser also has inside the info that I want
  const { displayName, email, photoURL } = currentUser

  return {
    displayName,
    email,
    photoURL,
    token,
  };
}

export const logInGitHub = () => signInWithPopup(auth, githubProvider)
    .then(mapUserInfo)
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        throw errorMessage;
});

export const onAuthStateChange = (onChange) => {
  return onAuthStateChanged(auth, (user) => {

    if(user){
      //From user (it has a lot of unneccessary data) I only get the info I'll need
      //so I can use the function I've created before to get them.
      const userInfo = () => {
        //I only want to get the info I will need:
        const { auth } = user;
        // auth has inside the info I'm looking for
        const { currentUser } = auth;
        // currentUser also has inside the info that I want
        const { displayName, email, photoURL } = currentUser

        return {
          name: displayName,
          email,
          photoURL,
        };
      }

      //This 'onChange' is going to be the 'setUser' function that will change the state
      onChange(userInfo);
      }
  });
};

export const logOut = () => {
  return signOut(auth);
};