import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Cardview.css'

export class Cardview extends Component {
    state = {
        name: this.props.name,
        health: this.props.health,
        x: this.props.x,
        y: this.props.y,
        effects: this.props.effects.slice(),
        effecticons: Array(this.props.effects.length).fill(false),
        newEffect: "",
        prophealth: this.props.health,
        propx: this.props.x,
        propy: this.props.y,
        propeffects: this.props.effects.slice(),
    };

    componentDidUpdate() {
        const { name } = this.props;
        const { prophealth, propx, propy, propeffects } = this.state;
        if (name!==this.state.name || prophealth!==this.props.health || propx!==this.props.x || propy!==this.props.y || !this.arraysMatch(propeffects, this.props.effects)) this.setState({
            name,
            health: this.props.health,
            x: this.props.x,
            y: this.props.y,
            effects: this.props.effects.slice(),
            prophealth: this.props.health,
            propx: this.props.x,
            propy: this.props.y,
            propeffects: this.props.effects.slice(),
        });
    }

    changeVal = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitVal = (e) => {
        let newVal = e.target.value;
        if (e.key==="Enter" && Number.isInteger(parseFloat(newVal)) && !isNaN(newVal)) {
            this.props.changeVal(e.target.name, newVal);
            this.setState({ ["prop".concat(e.target.name)]: e.target.val });
        }
    }

    changeEffect = (e, i) => {
        let { effects } = this.state;
        effects[i] = e.target.value;
        this.setState({ effects });
    }

    delEffect = (i) => {
        let { effects } = this.state;
        effects.splice(i,1);
        this.setState({ effects });
        this.props.changeVal("effects", effects);
    }

    submitEffects = (e) => {
        let { newEffect, effects } = this.state;
        if (e.key==="Enter") {
            if (newEffect!=null && newEffect.length!==0 && !effects.includes(newEffect)) {
                effects.push(newEffect);
                newEffect = "";
                this.setState({ effects, newEffect });
                this.props.changeVal("effects", effects);
            }
        }
    }

    hoverOn = (i) => {
        let { effecticons } = this.state;
        effecticons[i] = true;
        this.setState({ effecticons });
    }

    hoverOff = (i) => {
        let { effecticons } = this.state;
        effecticons[i] = false;
        this.setState({ effecticons });
    }

    arraysMatch = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
    
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
    
        return true;
    }

    render() {
        const { maxHeight, title, name } = this.props;
        const { health, x, y, effects, effecticons, newEffect } = this.state;

        return (
        <div className="card" style={{height: `${maxHeight}px`, maxHeight: `${maxHeight}px`}}>
            <header className="card-header" style={{backgroundColor:this.props.headerColor}}>
                <p className="card-header-title" style={{backgroundColor:this.props.headerColor,cursor:"default"}}>{title}</p>
            </header>
            <div className="card-content">
                <div className="content">
                    <h1>Name: {name}</h1>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Health</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control is-expanded healthInput">
                                    <input
                                        className={"input ".concat(!Number.isInteger(parseFloat(health))||isNaN(health)?"is-danger":(health!==this.props.health?"is-warning":""))}
                                        name="health"
                                        type="text"
                                        placeholder="health..."
                                        value={health}
                                        onChange={this.changeVal}
                                        onKeyPress={this.submitVal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <label className="label">Position</label>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal xLabel">
                            <label className="label">X</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control is-expanded xInput">
                                    <input
                                        className={"input ".concat(!Number.isInteger(parseFloat(x))||isNaN(x)?"is-danger":(x!==this.props.x?"is-warning":""))}
                                        name="x"
                                        type="text"
                                        placeholder="x..."
                                        value={x}
                                        onChange={this.changeVal}
                                        onKeyPress={this.submitVal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal yLabel">
                            <label className="label">Y</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control is-expanded yInput">
                                    <input
                                        className={"input ".concat(!Number.isInteger(parseFloat(y))||isNaN(y)?"is-danger":(y!==this.props.y?"is-warning":""))}
                                        name="y"
                                        type="text"
                                        placeholder="y..."
                                        value={y}
                                        onChange={this.changeVal}
                                        onKeyPress={this.submitVal}
                                    />
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
                                <a
                                    className="panel-block is-active textInput"
                                    key={key}
                                    onMouseOver={() => this.hoverOn(key)}
                                    onMouseOut={() => this.hoverOff(key)}>
                                        {effecticons[key] ?
                                        <span className="panel-icon">
                                            <i
                                                className="fas fa-trash-alt"
                                                aria-hidden="true"
                                                onClick={() => this.delEffect(key)}>
                                            </i>
                                        </span>
                                        :
                                        <span className="panel-icon">
                                            <i className="fas fa-dice-d20" aria-hidden="true"></i>
                                        </span>
                                        }
                                        <div className="control">
                                            <input
                                                className={"input ".concat(ef!==this.props.effects[key]?"is-warning":"")}
                                                type="text"
                                                placeholder="effect..."
                                                value={ef}
                                                onChange={(e) => this.changeEffect(e, key)}
                                                onKeyPress={this.submitEffects}
                                            />
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
                                    <input
                                        className="input"
                                        name="newEffect"
                                        type="text"
                                        placeholder="effect..."
                                        value={newEffect}
                                        onChange={this.changeVal}
                                        onKeyPress={this.submitEffects}
                                    />
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
