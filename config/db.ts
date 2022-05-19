import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase() {

  let firebaseConfig = {

      apiKey: "AIzaSyAPTLaF0KGLXOynOb8kY_sFUCH7KdqFtgI",
    
      authDomain: "react-cbs.firebaseapp.com",
    
      databaseURL: "https://react-cbs-default-rtdb.europe-west1.firebasedatabase.app",
    
      projectId: "react-cbs",
    
      storageBucket: "react-cbs.appspot.com",
    
      messagingSenderId: "779601297672",
    
      appId: "1:779601297672:web:266521883a95882c1cecbd",
    
      measurementId: "G-437EYBERZ9"
    
    };
  
    // Initialize Firebase
    
    const app = initializeApp(firebaseConfig);

    return getDatabase(app);
  }

    export default StartFirebase;