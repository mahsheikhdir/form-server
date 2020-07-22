import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default function Unauthorized(props) {
    return(
        (props.loading) ? <Spinner animation="border"/> : <LinkToLogin/>
    )
}

function LinkToLogin(){
    return(
        <Jumbotron style={{paddingTop: 30}} flush>
            <ion-icon name="help-outline"></ion-icon><h1>Seems like you are not logged in.</h1>
            <a href="/login">Click here to login</a>
        </Jumbotron>
    )
}