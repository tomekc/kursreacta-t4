import React from "react";
import uuidv4 from "./utils";

import PomodoroCreator from "./PomodoroCreator";

export class Timebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            title: props.title,
            time: props.totalTimeMinutes
        };
    }

    onEdit = () => {
        this.setState((prevState) => {
            return {
                isEditing: !prevState.isEditing
            };
        });
    };

    titleChanged = (event) => {
        this.setState({
            title: event.target.value
        });
    };

    timeChanged = (event) => {
        this.setState({
            time: event.target.value
        });
    };

    handleEdit = (params) => {
        console.log("Edycja timeboksa, nowe wartości:", params);
        this.props.onEdit(this.props.identifier, {
            title: params.title,
            totalTimeMinutes: params.minutes
        });
        this.setState({
            isEditing: false
        })
    };

    render() {
        const { identifier, title, totalTimeMinutes, onDelete } = this.props;
        const { isEditing } = this.state;
        return (
            <div className="Timebox">
                <div className="tiny">{identifier}</div>
                <h3>{title}</h3>
                <p>{totalTimeMinutes} min.</p>
                <TimeboxEditorInline
                    visible={isEditing}
                    title={title}
                    minutes={totalTimeMinutes}
                    onEdit={this.handleEdit}
                />
                <div>
                    <button onClick={onDelete}>Usuń</button>
                    <button onClick={this.onEdit}>{isEditing ? "Anuluj" : "Zmień"}</button>
                </div>
            </div>
        );
    }
}

export class TimeboxEditorInline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            minutes: props.minutes
        };
    }

    titleChanged = (e) => {
        console.log("Nowy tytul: ", e.target.value);
        this.setState({
            title: e.target.value
        });
    };

    timeChanged = (e) => {
        console.log("Nowy czas: ", e.target.value);
        this.setState({
            minutes: e.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault(); // aby się formularz nie zasubmitował
        this.props.onEdit({
            ...this.state
        });
    };

    render() {
        const { visible } = this.props;
        if (!visible) {
            return null;
        }
        return (
            <form className="inline-form" onSubmit={this.handleSubmit}>
                <div className="inline-form-row">
                    <label>
                        Zadanie: <input type="text" value={this.state.title} onChange={this.titleChanged} />
                    </label>
                </div>
                <div className="inline-form-row">
                    <label>
                        Czas: <input type="number" value={this.state.minutes} onChange={this.timeChanged} />
                    </label>
                </div>
                <div>
                    <button>OK</button>
                </div>
            </form>
        );
    }
}

export class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { key: 1, title: "Obieranie ogórków", totalTimeMinutes: 30 },
            { key: 2, title: "Szatkowanie cebuli", totalTimeMinutes: 22 },
            { key: 3, title: "Obieranie zieminaków", totalTimeMinutes: 25 }
        ]
    };

    handleCreate = (box) => {
        this.setState((prevState) => {
            const nowy = {
                key: uuidv4(),
                title: box.title || "Przykładowy task",
                totalTimeMinutes: box.totalTimeMinutes || 25
            };
            const timeboxes = [nowy, ...prevState.timeboxes];
            return { timeboxes };
        });
    };

    handleDelete = (key) => {
        console.log("Kasowanie");
        this.setState((prevState) => {
            const timeboxes = prevState.timeboxes.filter((tb) => tb.key !== key);
            return { timeboxes };
        });
    };

    updateTimebox = (key, newTimebox) => {
        this.setState((prevState) => {
            const timeboxes = prevState.timeboxes.map((tb) => {
                return tb.key === key ? newTimebox : tb;
            });
            return { timeboxes };
        });
    };

    handleEdit = (key, data) => {
        this.setState((prevState) => {
            const timeboxes = prevState.timeboxes.map((tb) => {
                return tb.key === key ? { ...tb, ...data } : tb;
            });
            return { timeboxes };
        });
    };

    render() {
        return (
            <>
                <PomodoroCreator onCreate={this.handleCreate} />
                {this.state.timeboxes.map((box) => (
                    <Timebox
                        key={box.key}
                        identifier={box.key}
                        title={box.title}
                        totalTimeMinutes={box.totalTimeMinutes}
                        onDelete={() => {
                            this.handleDelete(box.key);
                        }}
                        onEdit={this.handleEdit}
                        isEditing={false}
                    />
                ))}
            </>
        );
    }
}
