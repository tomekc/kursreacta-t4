import React from "react";
import { sprintf } from "sprintf-js";
import classNames from 'classnames';

export class CurrentTimebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            paused: false,
            pausesCount: 0,
            elapsedSeconds: 0
        };
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onPause = this.onPause.bind(this);
    }

    onStart() {
        console.log("START", this.state);
        this.setState({
            running: true,
            paused: false
        });
        this.startTimer();
    }

    onStop() {
        console.log("=STOP=", this.state);
        this.setState({
            running: false,
            paused: false,
            elapsedSeconds: 0
        });
        this.stopTimer();
    }

    onPause() {
        this.setState((prevState) => {
            if (prevState.paused) {
                // czyli odpalamy
                this.startTimer();
            } else {
                this.stopTimer();
            }
            return {
                paused: !prevState.paused,
                pausesCount: prevState.paused ? prevState.pausesCount : prevState.pausesCount + 1
            };
        });
    }

    startTimer() {
        this.interval = window.setInterval(() => {
            this.setState((prevState) => ({
                // Nawiasy zeby kompilator Babela nie zgupial
                elapsedSeconds: prevState.elapsedSeconds + 0.5
            }));
        }, 500);
    }

    stopTimer() {
        window.clearInterval(this.interval);
    }

    render() {
        const { running, paused, pausesCount, elapsedSeconds } = this.state;
        const { title, totalTimeMinutes, onEdit, isEditable } = this.props;
        const totalTimeSeconds = totalTimeMinutes * 60;
        const totalSecondsLeft = totalTimeSeconds - elapsedSeconds;

        const minutesLeft = Math.floor(totalSecondsLeft / 60);
        const secondsLeft = Math.floor(totalSecondsLeft % 60);

        const progress = (elapsedSeconds / totalTimeSeconds) * 100.0;
        return (
            <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
                <h1>{title}</h1>
                <Clock minutes={minutesLeft} seconds={secondsLeft} />
                <ProgressBar percent={progress} big="true"/>
                <div>
                    <button onClick={this.onStart} disabled={running}>
                        Start
                    </button>
                    <button onClick={this.onStop} disabled={!running}>
                        Stop
                    </button>
                    <button onClick={this.onPause} disabled={!running}>
                        {paused ? "Wznów" : "Pauza"}
                    </button>
                    <button onClick={onEdit}>Edytuj</button>
                    <span> Liczba przerw: {pausesCount}</span>
                </div>
            </div>
        );
    }
}

export function Clock({ className = "", minutes = 0, seconds = 0 }) {
    const tekst = sprintf("%02d:%02d", minutes, seconds);
    return <h2 className="Clock">zostało {tekst}</h2>;
}

export function ProgressBar({ percent = 33, big = false }) {

    const pgbar = classNames('progress__bar', {
        'progress__bar--big': big
    });

    return (
        <div className="progress">
            <div className={pgbar} style={{ width: `${percent}%` }} />
        </div>
    );
}

