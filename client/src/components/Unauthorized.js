import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function Unauthorized(props) {
    return(
        (props.loading) ? <Spinner animation="border"/> : <LinkToLogin/>
    )
}

function LinkToLogin(){
    return(
        <div className="container" style={{paddingTop: 30}}>
            <h1>Seems like you are not logged in.</h1>
            <a href="/login">Click here to login</a>
        </div>
    )
}