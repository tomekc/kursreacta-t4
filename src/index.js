import React from "react";
import ReactDOM from "react-dom";
import { TimeboxList } from "./TimeboxList";
import { CurrentTimebox } from "./CurrentTimebox";
import PomodoroConfig from "./PomodoroConfig";

import "./styles/main.scss";

// Pojemnik na stan
class PomidorApp extends React.Component {

    constructor(props) {
        super(props);
        console.log('[App] contruct');
        this.state = {
            title: "Nauka klawiszy",
            totalTimeMinutes: 20,
            isEditable: true
        };    
    }

    componentDidMount() {
        console.log('Did mount');
    }

    componentWillUnmount() {
        console.log('Will unmount');
    }

    onTitleChange = (event) => {
        this.setState({ title: event.target.value });
    };

    onTimeChange = (event) => {
        this.setState({ totalTimeMinutes: event.target.value });
    };

    onConfirm = (event) => {
        this.setState({ isEditable: false });
    };

    onEdit = (event) => {
        console.log("On edit clicked");
        this.setState({ isEditable: true });
    };

    render() {
        console.log('[App] render');
        const { title, totalTimeMinutes, isEditable } = this.state;
        return (
            <React.StrictMode>
                <React.Fragment>
                    <TimeboxList/>
                    if (this.isEditable) {
                    <PomodoroConfig
                        title={title}
                        totalTimeMinutes={totalTimeMinutes}
                        onTitleChange={this.onTitleChange}
                        onTimeChange={this.onTimeChange}
                        isEditable={isEditable}
                        onConfirm={this.onConfirm}
                        visible={true}
                    />
                } else {
                    <CurrentTimebox
                        title={title}
                        totalTimeMinutes={totalTimeMinutes}
                        onEdit={this.onEdit}
                        isEditable={isEditable}
                        visible={true}
                    />
                }
                </React.Fragment>
            </React.StrictMode>
        );
    }
}

function App() {
    return <PomidorApp/>;
}

// === REACT HERE ===
let root = document.getElementById("root");

const element = <App/>;

ReactDOM.render(element, root);
