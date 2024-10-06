import React, { useRef, useState, useEffect } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CellTower from "@mui/icons-material/CellTower";
import ChatBubble from "@mui/icons-material/ChatBubble";
import { styled } from "@mui/system";
import ChatLogs, { ChatMessage } from "./ChatLogs";
import GlobalChat from "./GlobalChat";
import Send from "@mui/icons-material/Send";
import { Timestamp } from "firebase/firestore";
import { getDatabase, push, ref, set, get, child } from "firebase/database";
import { useUser } from "../../session/UserSession";
import { database } from "../../../firebase/firebase";
import { parse, format } from "date-fns";
import DepartmentChat from "./DepartmentChat";
import { allRoles } from "../../util/DepartmentHandler";
import { chat_auth, department_auth } from "../auth/Authorize";

interface ChatLog {
  sender: string;
  message: string;
  time: Timestamp;
}

const RectangularIconButton = styled(IconButton)({
  borderRadius: "0",
});

const ChatRoom = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [globalChat, setGlobalChat] = useState(true);
  const [message, setMessage] = useState("");
  const database = getDatabase();
  const { user, login, logout } = useUser();
  const chatContainerRef = useRef(null);
  const chatContainerRef_2 = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  

  const toggleChat1= () => {
    setIsHovered(prev => !prev);
  };

  useEffect(() => {

    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey && event.key === "c") {
       handleHover()
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  // const chat_object = [
  //   { depA: "COO", depB: "CFO" },
  //   { depA: "CEO", depB: "COO" },
  // ];



  const addNewSession = (dep1 : string, dep2 : string) => {

  }


  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department); 
    console.log(department)
  };

  const toggleChat = (src: string) => {
    if (src === "global" && globalChat) setGlobalChat(!globalChat);
    if (src === "department" && !globalChat) setGlobalChat(!globalChat);
  };

  const handleHover = () => {
    setIsHovered((prev) => !prev);

    if (chatContainerRef.current) {
      setScrollPosition(chatContainerRef.current.scrollTop);
    }
    if (chatContainerRef_2.current) {
      setScrollPosition(chatContainerRef_2.current.scrollTop);
    }
  };

  const submitMessage = async () => {
    if (message === "") return;

    if (globalChat) {
      get(ref(database, "global_chat/"))
        .then((snapshot) => {
          if (!snapshot.exists()) {
            set(ref(database, "global_chat/"), true)
              .then(() => {
                console.log("'global_chat' directory created");
              })
              .catch((error) => {
                console.error("Error creating 'global_chat' directory:", error);
              });
          }

          push(ref(database, "global_chat/"), {
            sender: user.uid,
            message: message,
            time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          })
            .then((newChildRef) => {
              setTimeout(() => {
                if (chatContainerRef.current) {
                  chatContainerRef.current.scrollTop =
                    chatContainerRef.current.scrollHeight;
                }
              }, 0);
              console.log("Message added to the global chat:", newChildRef.key);
            })
            .catch((error) => {
              console.error("Error adding message:", error);
            });
        })
        .catch((error) => {
          console.error("Error checking global_chat directory:", error);
        });
    } else {
      console.log('not global');
      const dep1 = user.role;
      const dep2 = selectedDepartment;
  
      const departmentChatRef1 = ref(database, `department_chat/${dep1}_${dep2}`);
      const departmentChatRef2 = ref(database, `department_chat/${dep2}_${dep1}`);
  
      Promise.all([get(departmentChatRef1), get(departmentChatRef2)])
          .then((snapshots) => {
              const [snapshot1, snapshot2] = snapshots;
  
              if (!snapshot1.exists() && !snapshot2.exists()) {
                  set(departmentChatRef1, {
                      depA: dep1,
                      depB: dep2,
                      messages: [{
                          sender: user.uid,
                          senderName: user.name,
                          message: message,
                          time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                      }]
                  })
                  .then(() => {
                      console.log(`Department chat between ${dep1} and ${dep2} created`);
                  })
                  .catch((error) => {
                      console.error("Error creating department chat:", error);
                  });
              } else {
                  const existingChatRef = snapshot1.exists() ? departmentChatRef1 : departmentChatRef2;
                  const messagesRef = child(existingChatRef, 'messages');
  
                  push(messagesRef, {
                      sender: user.uid,
                      senderName: user.name,
                      message: message,
                      time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                  })
                  .then((newChildRef) => {
                      setTimeout(() => {
                          if (chatContainerRef.current) {
                              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                          }
                      }, 0);
                      console.log("Message added to department chat:", newChildRef.key);
                  })
                  .catch((error) => {
                      console.error("Error adding message to department chat:", error);
                  });
              }
          })
          .catch((error) => {
              console.error("Error checking department chats:", error);
          });
      }
  
      setMessage("");
  };
  
  //   else {

  //     console.log('not global')
  //     const dep1 = user.role; 
  //     const dep2 = selectedDepartment;
    
  //     const departmentChatRef = ref(database, `department_chat/${dep1}_${dep2}`);
  //     const idepartmentChatRef = ref(database, `department_chat/${dep2}_${dep1}`);

  //     const snapshot1 = await get(ref(database, `department_chat/${dep1}_${dep2}`))
  //     const snapshot2 = await get(idepartmentChatRef)
    
  //     get(departmentChatRef)
  //       .then((snapshot) => {
  //         if (!snapshot.exists()) {
  //           set(departmentChatRef, {
  //             depA: dep1,
  //             depB: dep2,
  //             messages: [{
  //               sender : user.uid,
  //               senderName : user.name,
  //               message : message,
  //               time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  //             }]
  //           })
  //           .then(() => {
  //             console.log(`Department chat between ${dep1} and ${dep2} created`);
  //           })
  //           .catch((error) => {
  //             console.error("Error creating department chat:", error);
  //           });
  //         } else {

  //           const messagesRef = child(departmentChatRef, 'messages');
    
  //           push(messagesRef, {
  //             sender: user.uid,
  //             senderName : user.name,
  //             message: message,
  //             time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  //           })
  //           .then((newChildRef) => {
  //             setTimeout(() => {
  //               if (chatContainerRef.current) {
  //                 chatContainerRef.current.scrollTop =
  //                   chatContainerRef.current.scrollHeight;
  //               }
  //             }, 0);
  //             console.log("Message added to department chat:", newChildRef.key);
  //           })
  //           .catch((error) => {
  //             console.error("Error adding message to department chat:", error);
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error checking department chat:", error);
  //       });
  //   }

  //   setMessage("");
  // };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    const chatContainer_2 = chatContainerRef_2.current;

    const handleContentChange = () => {
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
      if (chatContainer_2) {
        chatContainer_2.scrollTop = chatContainer_2.scrollHeight;
      }
    };

    if (chatContainer) {
      handleContentChange();
      chatContainer.addEventListener("DOMSubtreeModified", handleContentChange);
    }
    if (chatContainer_2) {
      handleContentChange();
      chatContainer_2.addEventListener(
        "DOMSubtreeModified",
        handleContentChange
      );
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener(
          "DOMSubtreeModified",
          handleContentChange
        );
      }
      if (chatContainer_2) {
        chatContainer_2.removeEventListener(
          "DOMSubtreeModified",
          handleContentChange
        );
      }
    };
  }, [globalChat]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "-30vh",
        right: "1vw",
        zIndex: 1000,
      }}
    >
      <Paper
        elevation={3}
        style={{
          width: "400px",
          height: "500px",
          position: "absolute",
          bottom: isHovered ? "200px" : "-255px",
          transition: "bottom 0.5s ease-in-out",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <Typography variant="h6" sx={{ fontFamily: "Montserrat" }}>
          Chat Room (C)
        </Typography>
        <Divider />
        <Grid container spacing={0}>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <RectangularIconButton
              style={{
                width: "100%",
                backgroundColor: globalChat ? "#4e8cd9" : "white",
              }}
              onClick={() => toggleChat("department")}
            >
              <CellTower style={{ color: globalChat ? "white" : "grey" }} />
            </RectangularIconButton>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ textAlign: "center" }}
            onClick={() => toggleChat("global")}
          >
            <RectangularIconButton
              style={{
                width: "100%",
                backgroundColor: !globalChat ? "#4e8cd9" : "white",
              }}
            >
              <ChatBubble style={{ color: !globalChat ? "white" : "grey" }} />
            </RectangularIconButton>
          </Grid>
        </Grid>
        <Divider />

        {globalChat ? (
          <Grid marginTop={"20px"} container style={{ height: "63%" }}>
            <div
              ref={chatContainerRef}
              style={{
                width: "100%",
                height: "100%",
                overflowY: "scroll",
              }}
              className="scrollbar-custom"
            >
              <GlobalChat />
            </div>
          </Grid>
        ) 
        
        : 
        
        (
          <Grid marginTop={"20px"} container style={{ height: "63%" }}>
            <Autocomplete
              onMouseEnter={()=>setIsHovered(true)}
              onMouseLeave={()=>setIsHovered(true)}
              style={{ width: "100%" }}
              value={selectedDepartment}
              onChange={(event, newValue) => {
                setSelectedDepartment(newValue);
              }}
              options={allRoles}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Paper
              ref={chatContainerRef_2}
              style={{ width: "100%", height: "80%", overflowY: "scroll" }}
            >
              <DepartmentChat departmentTarget={selectedDepartment}/>
            </Paper>
          </Grid>
        )}

        <Grid>

          
          {globalChat && user ? 
          
            chat_auth.includes(user.role) ?  
            <TextField
            margin="normal"
            required
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitMessage();
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton color="primary" edge="end" onClick={submitMessage}>
                  <Send />
                </IconButton>
              ),
              sx: { borderRadius: "20px" },
            }}
          />
            : ""
          
          :
          
          user && department_auth.includes(user.role) ? 
          
          <TextField
          margin="normal"
          required
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitMessage();
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton color="primary" edge="end" onClick={submitMessage}>
                <Send />
              </IconButton>
            ),
            sx: { borderRadius: "20px" },
          }}
        />
          
          :
          
          ""
          
          }
        
         

        </Grid>
      </Paper>
      <Box
        style={{
          width: "400px",
          height: "50px",
          backgroundColor: "lightblue",
        }}
      >
        Hover here
      </Box>
    </div>
  );
};

export default ChatRoom;
