import React, { Component } from "react";
import Child from "./Child";


const data = {
    "question": "",
    "type": "",
    "child": {
        "question": "",
        "type": "",
        "child": []
    }
}

class Form extends Component {
    state = {
        inputs: [{ question: "", type: "", children: {} }],
        show: false,
        count: 0
    };

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    };

    toggleComponent = idx => () => {
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
    //New Input
    addInput = () => {
        this.setState({
            inputs: this.state.inputs.concat([{ question: "" }]),
        });
    };
    //Delete Input
    removeInput = idx => () => {
        this.setState({
            inputs: this.state.inputs.filter((s, sidx) => idx !== sidx)
        });
    }
    onChange = e => {
        if (e.target.value) {
            this.setState({ InputValue: e.target.value });
        }
        if (e.target.checked || !e.target.checked) {
            this.setState({ isChecked: !this.state.isChecked })
        }
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
                            value={input.question}
                            onChange={this.inputNameChange(idx)}
                            required
                        />
                        <label className="label">Type</label>
                        <select value={input.value} className="select">
                            <option
                                checked={this.state.isChecked}
                                onChange={this.onChange}
                                type={'text'}
                                value={input.type}>
                                Text
                            </option>
                            <option
                                checked={this.state.isChecked}
                                onChange={this.onChange}
                                type={'number'}
                                value={input.type}>
                                Number
                            </option>
                            <option checked={this.state.isChecked}
                                onChange={this.onChange}
                                type={'radio'}
                                value={input.type}>
                                Yes/No
                            </option>
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