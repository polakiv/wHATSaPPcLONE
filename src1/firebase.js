import firebase from 'firebase';	

const firebaseConfig = {
    apiKey: "AIzaSyBKeonwEsDddMgtSUAIq_mChi5yYSqKTd4",
    authDomain: "whatsapp-clone101.firebaseapp.com",
    databaseURL: "https://whatsapp-clone101-default-rtdb.firebaseio.com/",
    projectId: "whatsapp-clone101",
    storageBucket: "whatsapp-clone101.appspot.com",
    messagingSenderId: "416863317825",
    appId: "1:416863317825:web:25a29082e9dcdf61cd7bc0",
    measurementId: "G-8L7TL9YX2H"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);	

const db = firebaseApp.firestore();	
const auth = firebase.auth();	
const provider = new firebase.auth.GoogleAuthProvider();	
const storage = firebase.storage();

export { auth, provider, storage, firebase };	
export default db;  
