import React, { Component } from 'react'
import './CommandLine.css'
import PropTypes from 'prop-types'

export class CommandLine extends Component {
    state = {
        command: "",
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.runCommand(this.state.command);
        this.setState({ command: "" });
    }

    render() {
        return (
        <div className="columns commandLine" style={{width: "100%"}}>
        <div className="column is-half">
        <form onSubmit={this.onSubmit}>
        <div className="field commandField">
            <div className="control commInp">
                <input
                    className="input is-rounded"
                    type="text"
                    name="command"
                    placeholder="command..."
                    value={this.state.command}
                    onChange={this.onChange}
                />
            </div>
            <div className="control commBtn">
                <button className="button is-rounded is-info">Enter</button>
            </div>
        </div>
        </form>
        </div>
        </div>
        )
    }
}

CommandLine.propTypes = {
    runCommand: PropTypes.func.isRequired,
};

export default CommandLine
