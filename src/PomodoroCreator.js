import React from "react";

export class PomodoroCreator extends React.Component {
    constructor(props) {
        super(props);
        // Referencje do pól formularza
        this.titleInput = React.createRef();
        this.minutesInput = React.createRef();
    }

    handleSubmit = (event) => {
        console.log("Dodajemy:", this.titleInput.current.value);
        event.preventDefault(); // aby się formularz nie zasubmitował
        this.props.onCreate({
            title: this.titleInput.current.value,
            totalTimeMinutes: this.minutesInput.current.value
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="TimeboxCreator">
                <div>Tworzenie pomidora</div>
                <div>
                    <label>
                        Co robisz? <input ref={this.titleInput} type="text" />
                    </label>
                </div>
                <div>
                    <label>
                        Ile minut? <input ref={this.minutesInput} type="number" />
                    </label>
                </div>
                <div>
                    <button>Utwórz</button>
                </div>
            </form>
        );
    }
}

export default PomodoroCreator;