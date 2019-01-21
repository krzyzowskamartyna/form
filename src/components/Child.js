import React from "react";

class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            inputs: [{ question: "", type: "", children: {} }],
            show: false
        };
    }

    render() {
        //   const { children: { } } = this.state;
        return (
            <div >
                <div className="input" >
                    <label className="label">Question</label>
                    <input
                        type="text"
                        className="input"
                        value={this.state.value}

                    />
                    <label className="label">Type</label>
                    <select value={this.state.value} className="select">
                        <option type="text" value="text">Text</option>
                        <option type="number" value="number">Number</option>
                        <option type="radio" value="radio">Yes/No</option>
                    </select>

                </div>
            </div>
        );
    }


}
export default Child;
