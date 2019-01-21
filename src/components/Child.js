import React from "react";

class Child extends React.Component {
    state = {
        inputs: [],
        show: false
    }
    toggleComponent = () => {
        this.setState(state => ({
            show: !state.show,
        }));
    };

    render() {
        const { show } = this.state;
        return (
            <div >
                <div className="input" >
                    <label className="label">Question</label>
                    <input
                        type="text"
                        className="input"
                        value={this.props.question}
                    />
                    {this.props.data}
                    <label className="label">Type</label>
                    <select value={this.props.value} className="select">
                        <option type="text" value="text">Text</option>
                        <option type="number" value="number">Number</option>
                        <option type="radio" value="radio">Yes/No</option>
                    </select>
                    <button
                        type="button"
                        onClick={this.toggleComponent}
                        className="btn btn_add"
                    >
                        {show ? "Remove sub-input" : "Add sub-input"}
                    </button>

                    {show && <Child />}
                </div>
            </div>
        );
    }
}
export default Child;
