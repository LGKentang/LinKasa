// import { database } from "../../firebase/firebasey";
// import { getDatabase, push, ref, set, get } from "firebase/database";

// function checkOrCreateChat(depA, depB, sender, message) {
//   const chatRef = database.ref("department_chat");

//   chatRef.once("value")
//     .then((snapshot) => {
//       // Check if "department_chat" node exists
//       if (!snapshot.exists()) {
//         // If it doesn't exist, create it and add the first chat entry
//         chatRef.push({
//           depA: depA,
//           depB: depB,
//           chatLogs: {
//             autoId1: {
//               sender: sender,
//               time: firebase.database.ServerValue.TIMESTAMP,
//               message: message
//             }
//           }
//         });
//       } else {
//         let chatExists = false;

//         snapshot.forEach((childSnapshot) => {
//           const chat = childSnapshot.val();
//           // Check if a chat session exists between depA and depB
//           if (
//             (chat.depA === depA && chat.depB === depB) ||
//             (chat.depA === depB && chat.depB === depA)
//           ) {
//             chatExists = true;
//             const chatKey = childSnapshot.key;

//             // Add the message to the existing chat session
//             chatRef.child(chatKey + '/chatLogs').push({
//               sender: sender,
//               time: firebase.database.ServerValue.TIMESTAMP,
//               message: message
//             });
//           }
//         });

//         // If no chat session exists, create a new one
//         if (!chatExists) {
//           chatRef.push({
//             depA: depA,
//             depB: depB,
//             chatLogs: {
//               autoId1: {
//                 sender: sender,
//                 time: firebase.database.ServerValue.TIMESTAMP,
//                 message: message
//               }
//             }
//           });
//         }
//       }
//     })
//     .catch((error) => {
//       console.error("Error checking/creating chat:", error);
//     });
// }