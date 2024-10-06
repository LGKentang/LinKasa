import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { parse, format } from "date-fns";
import { useUser } from "../../session/UserSession";
import ChatLogs from "./ChatLogs";
import { database } from "../../../firebase/firebase";
import {getUserByUid} from "../../util/EmployeeHandler";


const GlobalChat = () => {
  const [chatMessages, setChatMessages] = useState([]); 
  const { user } = useUser();

  useEffect(() => {
    const globalChatRef = ref(database, "global_chat/");

    const unsubscribe = onValue(globalChatRef, async (snapshot) => {
      if (snapshot.exists()) {
        const chatData = snapshot.val();
        if (chatData) {
          const messageKeys = Object.keys(chatData);
          const messages = await Promise.all(
            messageKeys.map(async (messageKey) => {
              const message = chatData[messageKey];
              const userData = await getUserByUid(message.sender);
              const role = userData && userData.role ? userData.role : null;

              return {
                ...message,
                role: role
              };
            })
          );
          setChatMessages(messages);
        } else {
          console.log("No messages in 'global_chat'");
        }
      } else {
        console.log("'global_chat' directory does not exist");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);



  return (
    <div>
      {chatMessages.map((message, index) => (
        <ChatLogs
          key={index}
          sender={message ? message.role : "wait"}
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

export default GlobalChat;
