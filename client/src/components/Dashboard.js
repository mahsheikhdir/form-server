import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Redirect } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import downloadFile from 'js-file-download';

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
      <DashNavigation projects={props.projects} />
    </div>
  );
}

function DashNavigation(props) {
  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Your API Keys">
        <ApiPage projects={props.projects} />
      </Tab>
      <Tab eventKey="profile" title="Projects">
        <ProjectPage projects={props.projects} />
      </Tab>
      <Tab eventKey="manage" title="Manage">
        <ExportPage projects={props.projects} />
      </Tab>
    </Tabs>
  );
}

function ExportPage(props) {
  const [projects, setProjects] = useState([]);
  function handleClick(e) {
    axios.get('/projects', { withCredentials: true }).then((res) => {
      const filename =
        'allData' + '-' + new Date().toJSON().slice(0, 10) + '.json';
      downloadFile(JSON.stringify(res.data, null, '\t'), filename);
    });
  }

  function getAllData(id) {
    axios.get('/project/' + id, { withCredentials: true }).then((res) => {
      const filename =
        'allData' + id + '-' + new Date().toJSON().slice(0, 10) + '.json';
      downloadFile(JSON.stringify(res.data, null, '\t'), filename);
    });
  }

  function getFormData(id, form) {
    axios
      .get('/project/' + id + '/' + form, { withCredentials: true })
      .then((res) => {
        const filename =
          id + '-' + form + '-' + new Date().toJSON().slice(0, 10) + '.json';
        downloadFile(JSON.stringify(res.data, null, '\t'), filename);
      });
  }
  return (
    <div className="container tab-border">
      <Tab.Container id="left-tabs-example" defaultActiveKey="1">
        {props.projects.length == 0 ? (
          <p>No Projects...</p>
        ) : (
          <Row>
            <Col sm={3} className="simple-border">
              <h5 style={{ textAlign: 'center' }}>Project Name</h5>
              <Nav variant="pills" className="flex-column">
                {props.projects.map((p, i) => (
                  <Nav.Item key={p.id}>
                    <Nav.Link eventKey={p.id}>{p.name}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9} className="simple-border">
              <h5 style={{ textAlign: 'center' }}>Manage</h5>
              <hr />
              <Tab.Content>
                {props.projects.map((p, i) => (
                  <Tab.Pane eventKey={p.id} key={p.id}>
                    <p>
                      Downloads are in JSON format. Forms and new data will be
                      updated immediately.
                    </p>
                    <Button onClick={(e) => getAllData(p.id)}>
                      Download ALL Data
                    </Button>
                    <hr />

                    <p>
                      Individual Form data can be downloaded using the buttons
                      below.
                    </p>
                    {props.projects[p.id - 1]['forms'].map((f, i) => (
                      <div key={i}>
                        <Button onClick={(e) => getFormData(p.id, f)}>
                          Download from {f}
                        </Button>
                        <br />
                        <br />
                      </div>
                    ))}
                    <hr />
                    <p>Deleted projects cannot be restored.</p>
                    <Button className="btn-danger">Delete Project</Button>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        )}
      </Tab.Container>
    </div>
  );
}

function ProjectPage(props) {
  const [newSite, setSite] = useState('');

  function handleChange(e) {
    setSite(e.target.value);
  }

  function handleClick(e) {
    if (newSite !== '') {
      axios
        .post('/projects', { name: newSite }, { withCredentials: true })
        .then((res) => {
          console.log(res);
          window.location.reload(false);
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
            {props.projects.map((p, i) => (
              <tr key={i}>
                <td>{p.id}</td>
                <td>{p.name} </td>
                <td>{p.forms.toString()}</td>
                <td>{formatBytes(p.size - 15, 3)}</td>
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
      </div>
    </div>
  );
}

function ApiPage(props) {
  return (
    <div className="container tab-border">
      <Tab.Container id="left-tabs-example" defaultActiveKey="1">
        {props.projects.length == 0 ? (
          <p>No Projects...</p>
        ) : (
          <Row>
            <Col sm={3} className="simple-border">
              <h5 style={{ textAlign: 'center' }}>Project Name</h5>
              <Nav variant="pills" className="flex-column">
                {props.projects.map((p, i) => (
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
                {props.projects.map((p, i) => (
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
                      <FormControl defaultValue={p.api_key} />
                    </InputGroup>
                    <p>
                      POST your data to this URL. Add an additional form to your
                      url to seperate data within each project. Requests with no
                      form will store data into the "default" form that is
                      included with every project.
                    </p>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        )}
      </Tab.Container>
    </div>
  );
}

function formatBytes(a, b = 2) {
  if (0 === a) return '0 Bytes';
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    ' ' +
    ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  );
}
