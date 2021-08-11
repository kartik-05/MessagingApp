import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import './SidebarChat.css';
import db from '../firebase';
import avatar3 from './images/avatar3.PNG';


function SidebarChat({ addNewChat, id, name }) {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))
        }
    }, [id]);

    const createChat = () => {
        const roomName = prompt("please enter room name");
        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            });
        }
    }


    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarchat-container">
                <div className="sidebarchat-user-image">
                    <img src={avatar3} alt="" />
                </div>
                <div className="sidebarchat-info">
                    <h4>{name}</h4>
                    <div>{messages[0]?.message}</div>
                </div>

            </div>


        </Link>

    ) : (
        <>
            <div className="sidechat-create-room" onClick={createChat}>
                <h1>Add New Chat Room</h1>
                <PostAddRoundedIcon />
            </div>
            <div className="sidechat-available-chatroom">
                Available chat rooms
                <ChevronRightRoundedIcon style={{ fill: "#E5E5E5" }} />
            </div>
        </>
    );
}

export default SidebarChat;
