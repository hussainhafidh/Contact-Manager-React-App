// import { useState, useEffect } from "react";
// import Form from "../Form";
// import List from "../List";
// function Contacts() {
//   const [contacts, setContacts] = useState([
//     { full_name: "Superman", phone_number: "12346544" },
//     { full_name: "Adonis", phone_number: "5676789" },
//     { full_name: "Hussain", phone_number: "7677155837" },
//   ]);
//   useEffect(() => {
//     console.log(contacts);
//   }, [contacts]);

//   return (
//     <div id="container">
      
//       <div id="box">
//         <List contacts={contacts} />      
//         <Form addContacts={setContacts} contacts={contacts} />
//       </div>

//       <div id="footer">
//         <span>Powered by Hussaiin</span>  
//       </div>

//     </div>
//   );
// }

// export default Contacts;

// const firebaseConfig = {
//   apiKey: "AIzaSyC-fcBN9DUhC81EgxZPrMI5vRyahPRZwfA",
//   authDomain: "sample-app-ef97e.firebaseapp.com",
//   projectId: "sample-app-ef97e",
//   storageBucket: "sample-app-ef97e.appspot.com",
//   messagingSenderId: "994573923824",
//   appId: "1:994573923824:web:a02ad8b118d3b6f1a91935"
// };

import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Form from "../Form";
import List from "../List";

const firebaseConfig = {
  apiKey: "AIzaSyC-fcBN9DUhC81EgxZPrMI5vRyahPRZwfA",
  authDomain: "sample-app-ef97e.firebaseapp.com",
  projectId: "sample-app-ef97e",
  storageBucket: "sample-app-ef97e.appspot.com",
  messagingSenderId: "994573923824",
  appId: "1:994573923824:web:a02ad8b118d3b6f1a91935"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const contactsRef = database.ref("contacts");
  
    contactsRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase data:", data); // Log the received data
      if (data) {
        setContacts(Object.values(data));
      } else {
        setContacts([]); // Make sure it's always an array
      }
    });
  
    return () => contactsRef.off("value");
  }, []);
  

  const addContact = (newContact) => {
    database.ref("contacts").push(newContact);
  };
  
  return (
    <div id="container">
      <div id="box">
        <List contacts={contacts} />
        <Form addContacts={setContacts} contacts={contacts} /> {/* Make sure addContacts is correctly passed */}
      </div>
  
      <div id="footer">
        <span>Powered by Hussaiin</span>
      </div>
    </div>
  );
}

export default Contacts;
