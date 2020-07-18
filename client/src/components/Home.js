import React from 'react';
import Image from 'react-bootstrap/Image';

export default function Home(props) {

    return(
          <Landing/>
    )
}

function Landing() {
    return(
        <React.Fragment>
        <div style={{width : '100%', height: "300px", overflow: "hidden"}}>
        <Image src="https://source.unsplash.com/1600x900/?code" responsive/>
        </div>
        <h1>Welcome to JSONstore! Perfect for storing all your JSON data.</h1>
        </React.Fragment>
    )
}