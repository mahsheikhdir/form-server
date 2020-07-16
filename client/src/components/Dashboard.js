import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Redirect } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import Unauthorized from './Unauthorized';

export default function Dashboard(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function calls() {
      try {
        const res = await axios.get('/loggedIn', { withCredentials: true });
        if (res.status == 200) {
          setLoggedIn(true);
          setLoading(false);
        }
        const projectResponse = await axios.get('/projects', {
          withCredentials: true,
        });
        if (projectResponse.status == 200) {
          setProjects(projectResponse.data.projects);
        }
      } catch (error) {
        console.log('Error', error);
        setLoading(false);
      }
    }
    calls();
  }, []);

  return loggedIn ? (
    <Projects projects={projects} />
  ) : (
    <Unauthorized loading={loading} />
  );
}

function Projects(props) {
  return (
    <div className="container" style={{ paddingTop: 30 }}>
      <DashNavigation />
    </div>
  );
}

function DashNavigation(props) {
  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Your API Keys">
        <ApiPage />
      </Tab>
      <Tab eventKey="profile" title="Projects">
        <ProjectPage />
      </Tab>
      <Tab eventKey="contact" title="Export">
        <p>poop</p>
      </Tab>
      <Tab eventKey="account" title="Account">
        <p>poop</p>
      </Tab>
    </Tabs>
  );
}

function ProjectPage(props) {
  const [projects, setProjects] = useState([]);
  const [newSite, setSite] = useState('');

  useEffect(() => {
    async function calls() {
      try {
        const projectResponse = await axios.get('/projects', {
          withCredentials: true,
        });
        if (projectResponse.status == 200) {
          setProjects(projectResponse.data.projects);
        }
      } catch (error) {
        console.log('Error', error);
      }
    }
    calls();
  }, []);

  function handleChange(e) {
    setSite(e.target.value);
  }

  function handleClick(e) {
    if (newSite !== '') {
      axios
        .post('/projects', { name: newSite }, { withCredentials: true })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="tab-border container">
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Project Name</th>
              <th>Forms</th>
              <th>Total Size</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={i}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.forms.toString()}</td>
            <td>{formatBytes(p.size-15,3)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="container" style={{ paddingTop: 30 }}>
        <h5>Add another Project</h5>
        <InputGroup className="mb-3" onChange={handleChange} value={newSite}>
          <FormControl />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={handleClick}>
              Create Project
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <p>Refresh to see changes</p>
      </div>
    </div>
  );
}

function ApiPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function calls() {
      try {
        const projectResponse = await axios.get('/projects', {
          withCredentials: true,
        });
        if (projectResponse.status == 200) {
          setProjects(projectResponse.data.projects);
        }
      } catch (error) {
        console.log('Error', error);
      }
    }
    calls();
  }, []);

  return (
    <div className="container tab-border">
      <Tab.Container id="left-tabs-example" defaultActiveKey="1">
        <Row>
          <Col sm={3} className="simple-border">
            <h5 style={{ textAlign: 'center' }}>Site Name</h5>
            <Nav variant="pills" className="flex-column">
              {projects.map((p, i) => (
                <Nav.Item key={p.id}>
                  <Nav.Link eventKey={p.id}>{p.name}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9} className="simple-border">
            <h5 style={{ textAlign: 'center' }}>API Key</h5>
            <hr />
            <Tab.Content>
              {projects.map((p, i) => (
                <Tab.Pane eventKey={p.id} key={p.id}>
                  <h4 style={{ display: 'inline-block' }}>
                    <span className="badge badge-dark">{p.name}</span>
                  </h4>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">
                        https://example.com/users/
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      defaultValue={p.api_key}
                    />
                  </InputGroup>
                </Tab.Pane>
              ))}
            </Tab.Content>
            <p>
              POST your data to this URL. Add an additional form to your url to
              seperate data within each project. Requests with no form will
              store data into the "default" form that is included with every
              project.
            </p>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}