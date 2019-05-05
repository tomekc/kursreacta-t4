import React from "react";
import uuidv4 from "./utils";

import PomodoroCreator from "./PomodoroCreator";
import { Timebox } from "./Timebox";

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
