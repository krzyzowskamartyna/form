import React from "react";
import data from './data';
import Condition from "./Condition";

class Child extends React.Component {
    state = {
        inputs: data,
        sub_input: data.question,
        sub_type: data.type,
        show: false
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    };
    inputNameChange = id => e => {
        const newInputs = this.state.inputs.map((input, sid) => {
            if (id !== sid) return input;
            return { ...input, sub_input: e.target.value };
        });

        this.setState({ inputs: newInputs });
    };
    inputTypeChange = id => e => {
        const newTypes = this.state.inputs.map((type, sid) => {
            if (id !== sid) return type;
            return { ...type, sub_type: e.target.value };
        });

        this.setState({ inputs: newTypes });
    }

    /*toggleComponent = (id) => {
        this.setState(state => ({
            show: !state.show,
        }));
    };*/
    toggleComponent = e => {
        this.setState({
            show: this.state.inputs.concat(data),
        });
    }
    //Brother
    addInput = e => {
        this.setState({
            inputs: this.state.inputs.concat(data),
        });
    };

    render() {
        const { show } = this.state;
        return (
            <div onSubmit={this.props.handleSubmit} >
                {this.state.inputs.map((input, id) => (
                    <div className="input" key={id}>

                        <label htmlFor={input.question} className="label">Question</label>
                        <input
                            onChange={this.inputNameChange(id)}
                            className="input"
                            type={input.type}
                            value={input.sub_input.question}
                        >

                        </input>
                        <label className="label">Type</label>
                        <select value={this.state.value} onChange={this.inputTypeChange(id)} className="select">
                            <option type={input.sub_input.type} value="text">Text</option>
                            <option type={input.sub_input.type} value="number">Number</option>
                            <option type={input.sub_input.type} value="radio">Yes/No</option>
                        </select>
                        <button
                            type="button"
                            onClick={this.addInput}
                            className="btn btn_add"
                        >
                            Add Brother
                        </button>

                        <button
                            type="button"
                            onClick={(e) => this.toggleComponent(id)}
                            className="btn btn_add"
                        >
                            {show ? "Remove sub-input" : "Add sub-input"}
                        </button>

                        {show && <Child />}

                    </div>
                ))}


            </div>
        );
    }
};


export default Child;
