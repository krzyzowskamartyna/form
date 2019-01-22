import React, { Component } from "react";
import Child from "./Child";
import data from './data';

class Form extends Component {
    state = {
        inputs: data,
        show: false,
        checked: false
    };

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    };

    //Generate sub-input
    toggleComponent = () => e => {
        this.setState(state => ({
            show: !state.show
        }));
    };

    inputNameChange = id => e => {
        const newInputs = this.state.inputs.map((input, sid) => {
            if (id !== sid) return input;
            return { ...input, question: e.target.value };
        });

        this.setState({ inputs: newInputs });
    };

    //New Input
    addInput = () => {
        this.setState({
            inputs: this.state.inputs.concat(data),
        });
    };

    //Delete Input
    removeInput = id => () => {
        this.setState({
            inputs: this.state.inputs.filter((s, sid) => id !== sid)
        });
    }

    //Change Input Value !!
    onChange = e => {
        if (e.target.checked || !e.target.checked) {
            this.setState({ isChecked: !this.state.isChecked })
        }
    }

    //Toggle button (show JSON)
    status = () => {
        this.state.checked === false
            ? this.setState({ checked: true })
            : this.setState({ checked: false });
    }

    render() {
        const { show } = this.state;
        return (
            <div>
                <form className="form">
                    <h1>Form Builder</h1>
                    {this.state.inputs.map((input, id) => (
                        <div className="input" key={id}>
                            <label htmlFor={input.question} className="label">Question</label>
                            <input
                                type={input.type}
                                className="input"
                                value={input.question}
                                onChange={this.inputNameChange(id)}
                                required
                            />
                            <label className="label">Type</label>
                            <select value={this.state.value} onChange={this.onChange} className="select">
                                <option
                                    checked={this.state.isChecked}
                                    onChange={this.onChange}
                                    type={input.type}
                                    name="text"
                                    value={input.type}
                                >
                                    Text
                            </option>
                                <option
                                    checked={this.state.isChecked}
                                    onChange={this.onChange}
                                    type={input.type}
                                    name="number"
                                    value={input.type}>
                                    Number
                            </option>
                                <option checked={this.state.isChecked}
                                    onChange={this.onChange}
                                    type={input.type}
                                    name="radio"
                                    value={input.type}>
                                    Yes/No
                            </option>
                            </select>
                            <button
                                type="button"
                                onClick={this.removeInput(id)}
                                className="btn btn_delete"
                            >
                                Delete input
              </button>
                            <button
                                type="button"
                                onClick={this.toggleComponent(id)}
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
                <div>
                    <input
                        className="checkbox"
                        type="checkbox"
                        onClick={this.status}
                    />
                    {this.state.checked ? <pre>{JSON.stringify(this.state.inputs, null, 2)}</pre> : 'Show JSON'}
                </div>
            </div>

        );
    }
}

export default Form;