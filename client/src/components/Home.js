import React from 'react';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Home(props) {
  return <Landing />;
}

function Landing() {
  return (
    <React.Fragment>
      <Jumbotron className="hero" fluid>
        <div className="container">
          <Jumbotron className="inner-hero shadow">
            <h1 className="display-4">
              JSONStore {'{'} {'}'}
            </h1>
            <h3>Making JSON storage easier for everyone.</h3>
          </Jumbotron>
        </div>
      </Jumbotron>

      <Container>
        <Row>
          <Col><InfoCard icon="arrow-forward-circle-outline" title="Send JSON" text="Using a personal API key you can send any sort of JSON data to our servers."/></Col>
          <Col><InfoCard icon="library-outline" title="Organize with Projects" text="You can organize your JSON data using projects where each project has it's own API key."/></Col>
          <Col><InfoCard icon="folder-open-outline" title="Export" text="Easily preview and export your data to a JSON file."/></Col>
        </Row>
      </Container>

      <Jumbotron style={{marginTop: 20, textAlign: "center"}} fluid>
        <div className="container">
        <h3>Ready to try it out?</h3>
            <Button style={{marginTop: 20}}>Create a Project</Button>
        </div>
      </Jumbotron>

      <Jumbotron style={{marginTop: 20, marginBottom: 0, padding: 10}}fluid>
        <div className="container">
            
            <p style={{margin: 0, fontSize: 12}}>mahsheikhdir@gmail.com | © 2020 All Rights Reserved</p>
        </div>
      </Jumbotron>
    </React.Fragment>
  );
}

function InfoCard(props) {
  return (
    <Card className="info-card" style={{width: "18rem", height: "18rem"}}>
      <Card.Body>
        <div className="info-icon">
        <ion-icon className="info-icon" name={props.icon}></ion-icon>
        </div>
        <Card.Title style={{fontStyle: "bold"}}>{props.title}</Card.Title>
        <Card.Text>
          {props.text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
