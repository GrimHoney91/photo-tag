import {initializeApp} from 'firebase/app';

const config = {
    apiKey: "AIzaSyCIfy18AW3wdGUkCYqx0tMOClJhkola7HU",
    authDomain: "tag-app-c4b80.firebaseapp.com",
    projectId: "tag-app-c4b80",
    storageBucket: "tag-app-c4b80.appspot.com",
    messagingSenderId: "238020392600",
    appId: "1:238020392600:web:2e2d1191cd2ef8a86482ed"
};

const firebaseApp = initializeApp(config);

export default firebaseApp;