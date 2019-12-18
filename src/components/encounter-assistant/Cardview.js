import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Cardview.css'

export class Cardview extends Component {
    render() {
        const { title, name, health, x, y, effects } = this.props;

        return (
        <div className="card">
            <header className="card-header" style={{backgroundColor:this.props.headerColor}}>
                <p className="card-header-title" style={{backgroundColor:this.props.headerColor,cursor:"default"}}>{title}</p>
            </header>
            <div className="card-content">
                <div className="content">
                    <h1>Name: {name}</h1>
                    <div className="field">
                        <label className="label">Health</label>
                        <div className="control healthInput">
                            <input className="input" type="text" placeholder="health..." value={health} />
                        </div>
                    </div>
                    <label className="label">Position</label>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">X</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control is-expanded xInput">
                                    <input className="input" type="text" placeholder="x..." value={x} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Y</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control is-expanded yInput">
                                    <input className="input" type="text" placeholder="y..." value={y} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Effects</label>
                        <nav className="panel effectsPanel">
                            {effects !== null && effects.length !== 0 ?
                            effects.map((ef, key) => {
                                return (
                                <a className="panel-block is-active textInput" key={key}>
                                    <span className="panel-icon">
                                        <i className="fas fa-dice-d20" aria-hidden="true"></i>
                                    </span>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="effect..." value={ef} />
                                    </div>
                                </a>
                                );
                            })
                            :null}
                            <a className="panel-block is-active textInput">
                                <span className="panel-icon">
                                    <i className="fas fa-dice-d20" aria-hidden="true"></i>
                                </span>
                                <div className="control">
                                    <input className="input" type="text" placeholder="effect..." />
                                </div>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

Cardview.propTypes = {
    headerColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    health: PropTypes.string.isRequired,
    x: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    y: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    effects: PropTypes.array.isRequired,
};

export default Cardview;
