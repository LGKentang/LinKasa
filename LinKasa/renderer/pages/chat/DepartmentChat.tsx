import { useEffect, useState } from "react";
import { ref, onValue, get, getDatabase, DataSnapshot } from "firebase/database";
import { parse, format } from "date-fns";
import { useUser } from "../../session/UserSession";
import ChatLogs from "./ChatLogs";
import { database } from "../../../firebase/firebase";
import { getUserByUid } from "../../util/EmployeeHandler";
import { Autocomplete, TextField } from "@mui/material";


const DepartmentChat = (departmentTarget) => {
  const { user } = useUser();
  const [chatMessages, setChatMessages] = useState([]);
  
  
  async function fetchChatMessages(depA, depB) {
    try {
      const database = getDatabase();
      const chatPath1 = `department_chat/${depA}_${depB}/messages`;
      const chatPath2 = `department_chat/${depB}_${depA}/messages`;
  
      const chatRef1 = ref(database, chatPath1);
      const chatRef2 = ref(database, chatPath2);
  
      const snapshot1 = await get(chatRef1);
      const snapshot2 = await get(chatRef2);
  
      if (snapshot1.exists()) {
        console.log("Chat 1 Found")
        const messagesSnapshot = await get(chatRef1);
        const messages = messagesSnapshot.val();
        setChatMessages(messages || []);
      } else if (snapshot2.exists()) {
        console.log("Chat 2 Found")
        const messagesSnapshot = await get(chatRef2);
        const messages = messagesSnapshot.val();
        setChatMessages(messages || []);
      } else {
        console.log(`No chat found between ${depA} and ${depB}`);
        setChatMessages([]); 
      }
    } catch (error) {
      console.error('Error fetching chat:', error);
      // Handle errors here
    }
  }

  useEffect(() => {
    if (user && departmentTarget) {
      const depA = user.role; 
      const depB = departmentTarget.departmentTarget; 

      fetchChatMessages(depA, depB); 
    }
  }, [user, departmentTarget]);


  return (
    <div>
    {Object.values(chatMessages).map((message, index) => (
      <ChatLogs
        key={index}
        sender={message.senderName}
        message={message.message}
        isSender={!user ? false : message.sender === user.uid}
        time={format(
          parse(message.time, "yyyy-MM-dd HH:mm:ss", new Date()),
          "HH:mm"
        )}
      />
    ))}
  </div>
  );
};

export default DepartmentChat;
