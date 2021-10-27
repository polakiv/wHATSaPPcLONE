import React from 'react';
import Avatar from '@material-ui/core/Avatar';

function UserAvatar( { photoURL, onClick }) {
    return (
        <div style={{cursor: 'pointer'}}>
            <div style={{fontSize:'10px'}}> UserAvatar.js</div>
            <Avatar 
                src={photoURL} 
                onClick={onClick}
            />
        </div>
    )
}

export default UserAvatar