import React , {useEffect, useState} from 'react';
import axios from 'axios';

export default function Home(props) {

    return(
        <div className="container" style={{paddingTop: 30}}>
          <Landing/>
        </div>
        
    )
}

function Landing() {
    return(
        <h1>Welcome to JSONstore! Perfect for storing all your JSON data.</h1>
    )
}