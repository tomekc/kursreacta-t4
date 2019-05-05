import React from "react";
import ReactDOM from "react-dom";
import TimeboxList from "./timebox_list"
import CurrentTimebox from "./current_timebox";
import PomodoroConfig from "./pomodoro_config"

// Pojemnik na stan
class PomidorApp extends React.Component {
    state = {
        title: "Nauka klawiszy",
        totalTimeMinutes: 20,
        isEditable: true
    };

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
        const { title, totalTimeMinutes, isEditable } = this.state;
        return (
            <React.Fragment>
                <PomodoroConfig
                    title={title}
                    totalTimeMinutes={totalTimeMinutes}
                    onTitleChange={this.onTitleChange}
                    onTimeChange={this.onTimeChange}
                    isEditable={isEditable}
                    onConfirm={this.onConfirm}
                />
                <TimeboxList />
                <CurrentTimebox
                    title={title}
                    totalTimeMinutes={totalTimeMinutes}
                    onEdit={this.onEdit}
                    isEditable={isEditable}
                />
            </React.Fragment>
        );
    }
}

function App() {
    return <PomidorApp />;
}

// === REACT HERE ===
let root = document.getElementById("root");

const element = <App />;

ReactDOM.render(element, root);
