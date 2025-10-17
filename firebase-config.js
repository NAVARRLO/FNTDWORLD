// Firebase Configuration
const firebaseConfig = {
    // TODO: Замените на ваши данные из Firebase Console
    apiKey: "ваш_apiKey",
    authDomain: "ваш_authDomain",
    projectId: "ваш_projectId",
    storageBucket: "ваш_storageBucket",
    messagingSenderId: "ваш_messagingSenderId",
    appId: "ваш_appId"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Export for use in other files
window.db = db;