import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from '../firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import avatar2 from './images/avatar2.PNG';


function Chat() {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => (setMessages(snapshot.docs.map((doc) => doc.data()))));


        }
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })


        setInput("");
    }


    return (
        <div className="chat-container">

            <div className="chat-header">
                <div className="chats-user-image">
                    <img src={avatar2} alt="not" height="100px" width="100px" />
                </div>

                <div className="chat-header-info">
                    <h3>{roomName}</h3>
                    <div><b>last seen</b> : {new Date(messages[messages?.length - 1]?.timestamp?.toDate()).toUTCString()}</div>

                </div>

                <div className="chat-header-right">
                    <IconButton>
                        <SearchOutlined style={{ fill: "#C2C2C2" }} />
                    </IconButton>
                    <IconButton>
                        <AttachFile style={{ fill: "#C2C2C2" }} />

                    </IconButton>
                    <IconButton>
                        <MoreVert style={{ fill: "#C2C2C2" }} />
                    </IconButton>
                </div>
            </div>

            <div className="chat-body">
                {messages.map((message) => (
                    <div className={`chat-message ${message.name === user.displayName && " message-receiver"}`}>
                        <span className="message-sender ">
                            {message.name}
                        </span>

                        <div className="message">
                            {message.message}

                        </div>
                        <span className="time-stamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </div>


                ))}


            </div>

            <div className="chat-footer">

                <InsertEmoticonIcon style={{ fill: "#C2C2C2" }} />
                <form>
                    <input type="text" placeholder='Type a message' value={input} onChange={(e) => {
                        setInput(e.target.value);
                    }} />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>

                <MicIcon style={{ fill: "#C2C2C2" }} />

            </div>

        </div>
    )
}

export default Chat;
