import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import { IconButton } from '@material-ui/core';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
            setRooms(
                snapshot.docs.map((doc) => (

                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                ))
            )
        );

        return () => {
            unsubscribe();
        }
    }, []);



    return (
        <div className="sidebar-container">

            <div className="sidebar-header">
                <div className="sidebar-user-image">
                    <img src={user?.photoURL} alt="" />
                </div>
                <div className="sidebar-right-side">
                    <IconButton>
                        <ForumRoundedIcon style={{ fill: "#2884FF" }} />
                    </IconButton>
                    <div>All</div>
                </div>

            </div>

            <div className="sidebar-search-container">
                <div className="sidebar-search">

                    <SearchOutlinedIcon style={{ fill: "#C2C2C2" }} />
                    <input placeholder="Search Room" type="text" />

                </div>
            </div>

            <div className="sidebar-groups">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>

        </div>
    )
}

export default Sidebar;
