import React, { Component } from "react";
import Child from "./Child";

//const json = '';

class Form extends Component {
    state = {
        question: "",
        inputs: [{ question: "" }],
        show: false,
        count: 0
    };
    nameChange = e => {
        this.setState({ question: e.target.value });
    };
    toggleComponent = idx => () => {
        // log(`${this.state.show ? "Unmounting" : "Mounting"}`);
        this.setState(state => ({
            show: !state.show
        }));
    };


    inputNameChange = idx => e => {
        const newInputs = this.state.inputs.map((input, sidx) => {
            if (idx !== sidx) return input;
            return { ...input, question: e.target.value };
        });

        this.setState({ inputs: newInputs });
    };

    addInput = () => {
        this.setState({
            inputs: this.state.inputs.concat([{ question: [] }]),
        });
    };

    removeInput = idx => () => {
        this.setState({
            inputs: this.state.inputs.filter((s, sidx) => idx !== sidx)
        });
    }

    render() {
        const { show } = this.state;
        return (

            <form className="form">
                <h2>Form Builder</h2>
                {this.state.inputs.map((input, idx) => (
                    <div className="input" key={idx}>
                        <label htmlFor={input.question} className="label">Question</label>
                        <input
                            type="text"
                            className="input"
                            value={this.state.value}
                            onChange={this.inputNameChange(idx)}
                        />
                        <label className="label">Type</label>
                        <select value={this.state.value} className="select">
                            <option type="text" value="text">Text</option>
                            <option type="number" value="number">Number</option>
                            <option type="radio" value="radio">Yes/No</option>
                        </select>
                        <button
                            type="button"
                            onClick={this.removeInput(idx)}
                            className="btn btn_delete"
                        >
                            Delete input
              </button>
                        <button
                            type="button"
                            onClick={this.toggleComponent(idx)}
                            className="btn btn_add"
                        >
                            {show ? "Remove sub-input" : "Add sub-input"}
                        </button>

                        {show && <Child />}

                    </div>
                ))}
                <button
                    type="button"
                    onClick={this.addInput}
                    className="btn btn_add"
                >
                    Add input
              </button>

            </form>
        );
    }
}

export default Form;