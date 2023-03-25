//import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import React, {useState} from "react";
import Button from '@mui/material/Button'; // import a component from Material UI

/*function CustomComponent(props) {
    return (
        <div className="custom-component">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
    );
}*/

/*class Projects extends React.Component {
    // const [count, setCount] = useState(0); // use a state hook to store a count
    //
    // const handleCountClick = () => {
    //     setCount(count + 1);
    // define a custom event handler to modify the state
    constructor(props) {
        super(props);
        //init states
    }
    handleCountClick() {
        return "balls";
    }
    render() {
        return (
            <div className="projects">
                <h1>Projects</h1>
                <Button variant="contained">
                    Material UI Button
                </Button>
                <CustomComponent title="Component 1" description="Description 1"/>
                <CustomComponent title="Component 2" description="Description 2"/>
                <CustomComponent title="Component 3" description="Description 3"/>
                <Button variant="contained">Click me to increment count</Button>
            </div>
        );
    }
}

function Root(props) {
    return(
        <div>
            <Projects name="alksdjf;lkasdjfl;kasjdf"/>
            <div>root</div>
        </div>
    );
}*/

/*
function App() {
    return (
        <div className="App">
            <Projects />
        </div>
    );
}*/

function App() {
    const [showProjects, setShowProjects] = useState(true);
    const [projectList, setProjectList] = useState([
        { name: "Project 1", description: "Description of project 1" },
        { name: "Project 2", description: "Description of project 2" },
        { name: "Project 3", description: "Description of project 3" },
    ]);

    const toggleProjects = () => {
        setShowProjects(!showProjects);
    };

    const addProject = (project) => {
        setProjectList([...projectList, project]);
    };

    return (
        <div className="container">
            <h1>My Projects</h1>
            <button onClick={toggleProjects}>Toggle Projects</button>
            {showProjects && (
                <Projects
                    projects={projectList}
                    onAddProject={addProject}
                />
            )}
        </div>
    );
}

function Projects(props) {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onAddProject({ name, description });
        setName("");
        setDescription("");
        toggleForm();
    };

    return (
        <div>
            <h2>Project List</h2>
            {props.projects.map((project, index) => (
                <Project
                    key={index}
                    name={project.name}
                    description={project.description}
                />
            ))}
            <Button variant="contained" color="primary" onClick={toggleForm}>
                Add Project
            </Button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={handleNameChange} />
                    </label>
                    <label>
                        Description:
                        <textarea value={description} onChange={handleDescriptionChange} />
                    </label>
                    <Button type="submit" variant="contained" color="primary">
                        Add
                    </Button>
                </form>
            )}
        </div>
    );
}

function Project(props) {
    return (
        <div className="project">
            <h3>{props.name}</h3>
            <p>{props.description}</p>
        </div>
    );
}



/*ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
