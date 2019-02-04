import React from "react";
import data from './data';

class Child extends React.Component {
    state = {
        inputs: data,
        show: false,
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    };
    inputNameChange = id => e => {
        const newInputs = this.state.inputs.map((input, sid) => {
            if (id !== sid) return input;
            return { ...input, question: e.target.value };
        });

        this.setState({ inputs: newInputs });
    };
    inputTypeChange = id => e => {
        const newTypes = this.state.inputs.map((type, sid) => {
            if (id !== sid) return type;
            return { ...type, type: e.target.value };
        });
        this.setState({ inputs: newTypes });
    }
    //Add sub-input
    toggleComponent = e => {
        this.setState({
            show: this.state.inputs.concat(data),
        });
    }
    //Add Input at the same level
    addInput = e => {
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
    //Submit Input
    handleSubmit = () => {
        let form_obj = this.state.inputs;
        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        let open = indexedDB.open('myDatabase', 1)
        open.onupgradeneeded = function () {
            let db = open.result
            db.createObjectStore('form', { autoIncrement: true })
        }
        open.onsuccess = function () {
            let db = open.result
            let tx = db.transaction('form', 'readwrite')
            let store = tx.objectStore('form')
            store.put(form_obj)
            tx.oncomplete = function () {
                db.close()
            }
        }
    };

    render() {
        const { show } = this.state;
        return (
            <div onSubmit={this.handleSubmit}>
                {this.state.inputs.map((input, id) => (
                    <div className="input" key={id + 1}>
                        <label htmlFor={input.question} className="label">Question:</label>
                        <input
                            onChange={this.inputNameChange(id)}
                            className="input"
                            type={input.type}
                            value={input.question}
                        >
                        </input>
                        <label className="label">Type</label>
                        <select value={this.state.value} onChange={this.inputTypeChange(id)} className="select">
                            <option type={input.type} value="text">Text</option>
                            <option type={input.type} value="number">Number</option>
                            <option type={input.type} value="yes/no">Yes/No</option>
                        </select>

                        <button
                            type="button"
                            onClick={this.addInput}
                            className="btn btn_add"
                        >
                            Add input at the same level
                        </button>
                        <button
                            type="button"
                            onClick={this.toggleComponent}
                            className="btn btn_add"
                        >
                            Add sub-input
                        </button>
                        <button
                            type="button"
                            onClick={this.removeInput(id)}
                            className="btn btn_delete"
                        >
                            Delete input
                        </button>
                        <button
                            type="button"
                            className="btn btn_submit"
                            onClick={this.handleSubmit}
                        >
                            Submit
                    </button>
                        {show && <Child {...this.state} />}
                    </div>
                ))}
            </div >
        );
    }
};
export default Child;
