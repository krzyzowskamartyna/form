import React, { Component } from "react";
import Child from "./Child";
import data from './data';

class Form extends Component {
    state = {
        inputs: [],
        show: false
    }

    //Generate sub-input
    toggleComponent = () => e => {
        this.setState(state => ({
            show: !state.show
        }));
    };

    //New Input
    addInput = (id) => {
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
                <form className="form" >
                    <h1>Form Builder</h1>
                    {this.state.inputs.map((input, id) => (
                        <div key={id}>
                            <button
                                type="button"
                                onClick={this.toggleComponent(id)}
                                className="btn btn_add"
                            >
                                {show ? "Delete input" : "Add input"}
                            </button>
                            {show && <Child {...this.state} />}
                            <button
                                type="button"
                                onClick={this.removeInput(id)}
                                className="btn btn_delete"
                            >
                                Delete form
                        </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={this.addInput}
                        className="btn btn_add"
                    >
                        Add new form
                        </button>
                </form>
            </div>
        );
    }

}
export default Form;