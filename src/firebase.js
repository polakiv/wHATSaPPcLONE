import firebase from 'firebase';	

const firebaseConfig = {
   /* apiKey: "AIzaSyBKeonwEsDddMgtSUAIq_mChi5yYSqKTd4",
    authDomain: "whatsapp-clone101.firebaseapp.com",
    databaseURL: "https://whatsapp-clone101-default-rtdb.firebaseio.com/",
    projectId: "whatsapp-clone101",
    storageBucket: "whatsapp-clone101.appspot.com",
    messagingSenderId: "416863317825",
    appId: "1:416863317825:web:25a29082e9dcdf61cd7bc0",
    measurementId: "G-8L7TL9YX2H"*/
    apiKey: "AIzaSyDBdctlfkGMTPVFdvqjqSwOwAsHcl0ihY0",
    authDomain: "whatsappclone-26e2b.firebaseapp.com",
    projectId: "whatsappclone-26e2b",
    storageBucket: "whatsappclone-26e2b.appspot.com",
    messagingSenderId: "559155370037",
    appId: "1:559155370037:web:071c449d1ec76182abb97c",
    measurementId: "G-5FY2QBETVW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);	

const db = firebaseApp.firestore();	
const auth = firebase.auth();	
const provider = new firebase.auth.GoogleAuthProvider();	
const storage = firebase.storage();

export { auth, provider, storage, firebase };	
export default db;  
