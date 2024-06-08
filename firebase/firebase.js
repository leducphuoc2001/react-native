import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,   
    signInWithEmailAndPassword,
    sendEmailVerification,  
    //read data from Firebase    
} from "firebase/auth"
//ref = reference to a "collection"
import { 
    getDatabase, 
    ref as firebaseDatabaseRef, 
    set as firebaseSet,
    child,
    get,
    onValue,
} from "firebase/database"
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAiaszLKP7mA88UlhUKptR-9Wzp03OUrEU",
    authDomain: "exe3-5529f.firebaseapp.com",
    databaseURL: "https://exe3-5529f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "exe3-5529f",
    storageBucket: "exe3-5529f.appspot.com",
    appId: '1:543296499024:android:035eed02aee08be6ced055',
    messagingSenderId: "543296499024",
}  
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const firebaseDatabase = getDatabase()
const database = getFirestore();
export {
    auth,
    firebaseDatabase,
    database,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    firebaseSet,
    firebaseDatabaseRef,
    sendEmailVerification,
    child,
    get,
    onValue, //reload when online DB changed
    signInWithEmailAndPassword,
}

