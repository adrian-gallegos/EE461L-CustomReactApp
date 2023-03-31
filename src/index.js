import ReactDOM from 'react-dom/client';
//import axios from 'axios'
import React, {useState} from "react";
import Button from '@mui/material/Button'; // import a component from Material UI

// Define some sample data for projects and hardware sets
const projects = [
  {
    name: "Project 1",
    hardwareSets: [
      {
        name: "Hardware Set 1",
        checkedOut: 2,
        total: 100,
      },
      {
        name: "Hardware Set 2",
        checkedOut: 3,
        total: 100,
      },
    ],
    joined: true,
  },
  {
    name: "Project 2",
    hardwareSets: [
      {
        name: "Hardware Set 3",
        checkedOut: 1,
        total: 100,
      },
      {
        name: "Hardware Set 4",
        checkedOut: 0,
        total: 100,
      },
    ],
    joined: false,
  },
];

function ProjectList() {
  const [projectList, setProjectList] = useState(projects);
  const [checkoutQty, setCheckoutQty] = useState(1);
  const [checkinQty, setCheckinQty] = useState(1);
  const [messages, setMessages] = useState([]);

  function handleJoinClick(index) {
  const newProjectList = [...projectList];
  const projectId = index + 1;
  const url = projectList[index].joined ? `http://localhost:5000/leave_project/${projectId}` : `http://localhost:5000/join_project/${projectId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.alert(data.message); // Display a pop-up message
      setMessages(messages => [...messages, data.message]);
    });

  newProjectList[index].joined = !newProjectList[index].joined;
  setProjectList(newProjectList);
}

function handleCheckout(index, hardwareIndex) {
  const newProjectList = [...projectList];
  const hardwareSet = newProjectList[index].hardwareSets[hardwareIndex];
  const projectId = index + 1;
  const hardwareSetId = hardwareIndex + 1;
  const url = `http://localhost:5000/checkout_hardware/${projectId}/${checkoutQty}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.alert(data.message); // Display a pop-up message
      setMessages(messages => [...messages, data.message]);
    });

  hardwareSet.checkedOut += checkoutQty;
  setProjectList(newProjectList);
}

function handleCheckin(index, hardwareIndex) {
  const newProjectList = [...projectList];
  const hardwareSet = newProjectList[index].hardwareSets[hardwareIndex];
  const projectId = index + 1;
  const hardwareSetId = hardwareIndex + 1;
  const url = `http://localhost:5000/checkin_hardware/${projectId}/${checkinQty}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.alert(data.message); // Display a pop-up message
      setMessages(messages => [...messages, data.message]);
    });

  hardwareSet.checkedOut -= checkinQty;
  setProjectList(newProjectList);
}

  return (
      <div>
        <h1>User Projects</h1>
        <ul>
          {projectList.map((project, index) => (
              <li key={index}>
                <h2>{project.name}</h2>
                <button onClick={() => handleJoinClick(index)}>
                  {project.joined ? "Leave" : "Join"}
                </button>
                <ul>
                  {project.hardwareSets.map((hardwareSet, hardwareIndex) => (
                      <li key={hardwareIndex}>
                        {hardwareSet.name}: {hardwareSet.checkedOut} of{" "}
                        {hardwareSet.total} checked out
                        <div>
                          <input
                              type="number"
                              min="1"
                              max={hardwareSet.total - hardwareSet.checkedOut}
                              value={checkoutQty}
                              onChange={(e) => setCheckoutQty(parseInt(e.target.value))}
                          />
                          <button
                              onClick={() => handleCheckout(index, hardwareIndex)}
                              disabled={
                                  hardwareSet.checkedOut >= hardwareSet.total ||
                                  checkoutQty <= 0
                              }
                          >
                            Checkout
                          </button>
                        </div>
                        <div>
                          <input
                              type="number"
                              min="1"
                              max={hardwareSet.checkedOut}
                              value={checkinQty}
                              onChange={(e) => setCheckinQty(parseInt(e.target.value))}
                          />
                          <button
                              onClick={() => handleCheckin(index, hardwareIndex)}
                              disabled={hardwareSet.checkedOut <= 0 || checkinQty <= 0}
                          >
                            Checkin
                          </button>
                        </div>
                        {hardwareSet.message && <p>{hardwareSet.message}</p>}
                      </li>
                  ))}
                </ul>
              </li>
          ))}
        </ul>
      </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ProjectList />);
