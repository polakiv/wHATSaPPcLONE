import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import { useHistory, useParams } from "react-router-dom";
//importing firebase
import { storage, firebase } from "../firebase";
import db from "../firebase";
//importing components
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";  
import ChatFooter from "./ChatFooter";
import ChatLandingScreen from "./ChatLandingScreen";
//importing material-ui
import CircularProgress from "@material-ui/core/CircularProgress";
//importing styles
import "react-toastify/dist/ReactToastify.css";
import "./Chat.css";
  
function Chat({ isRoomExist }) {
  const history = useHistory();
  const [{ user }] = useStateValue();
  const { roomId } = useParams();
  const [_roomId, set_RoomId] = useState("");
  //const [_roomId2, set_RoomId2] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [roomCreatedBy, setRoomCreatedBy] = useState("");
  const [roomOwner, setRoomOwner] = useState("");
  const [roomOwnerCoworker, setroomOwnerCoworker] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLandingScreenPhoto, setShowLandingScreenPhoto] = useState(false);

  //const [showidKtoPishet, setidKtoPishet] = useState(false); 

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")  
        .doc(roomId)
        .onSnapshot(function (doc) {
          setRoomName(doc.data()?.createdBy);
          setRoomCreatedBy(doc.data()?.createdBy);
          setRoomOwner(doc.data()?.roomOwner);
          setroomOwnerCoworker(doc.data()?.roomOwnerCoworker);
          set_RoomId(doc.data()?.id);
        //  set_RoomId2(doc.data()?.id);
        });

 


        

      /* db.collection("rooms")
        .doc(user.uid)
        .onSnapshot(function (doc) { 
          setidKtoPishet(doc.data()?.id);
        }); 
      console.log('КТО Пишет22222222222 ', showidKtoPishet);
       */
       
     
     console.log('Кому Пишут11111 ', roomOwner);


      db.collection("rooms")
        .doc(roomId)
        .collection("messages") 
      //  .where('showidKtoPishet', '==', showidKtoPishet)
      //  .where('showidKomuPishut', '==', _roomId)
          .orderBy("timestamp", "asc")
        //  .find('idKtoPishet', '==', '1635144343')
          .onSnapshot(function (doc) {
            setMessages(doc.docs.map((doc) => doc.data()));
            setLoading(true);
          });

      setShowLandingScreenPhoto(false);
    } else {
      setShowLandingScreenPhoto(true);
      history.push("/");
    }
  }, [roomId, history]);

  return (
    <div className="chat">

<p style={{fontSize:'10px',color:"red"}}> Chat.js</p>
      {roomId ? (
        <>
          <div>
            <ChatHeader
              roomCreatedBy={roomCreatedBy}
              roomOwner={roomOwner}
              roomOwnerCoworker={roomOwnerCoworker}
              roomName={roomName}
              roomId={roomId}
              _roomId={_roomId}
              messages={messages}
              db={db}
              history={history}
              isRoomExist={isRoomExist}
            />
          </div>

          <div className="chat__body">
            {loading ? (
              <ChatBody
                roomCreatedBy={roomCreatedBy}
                roomOwner={roomOwner}
                roomOwnerCoworker={roomOwnerCoworker}
                roomId={roomId}
                messages={messages}
                user={user}
                isRoomExist={isRoomExist}
              />
            ) : (
              <div className="chat__body_loading">
                <div>
                  <CircularProgress />
                </div>
              </div>
            )}
          </div>

          <div>
            <ChatFooter
              roomName={roomName}
              roomId={roomId}
              db={db}
              firebase={firebase}
              storage={storage}
            />
          </div>
        </>
      ) : (
        <ChatLandingScreen showLandingScreenPhoto={showLandingScreenPhoto} />
      )}
    </div>
  );
}

export default Chat;
