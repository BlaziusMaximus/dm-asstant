import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Listview.css'

export class Listview extends Component {
    renderItem = (name, health, maxHealth) => {
        let perc = parseInt(health)/parseInt(maxHealth)*100;
        console.log(name, this.props.highlighted)
        return (
        <div
            className={"listEnt columns ".concat(this.props.selected===name?"is-selected":this.props.highlighted===name?"is-highlighted":"")}
            key={name}
            style={{ height: `${this.props.height}px` }}
            onClick={() => this.props.handleClick(name)}
            onMouseOver={() => this.props.highlightItem(name)}
            onMouseOut={() => this.props.unHighlightItem()}>
                <div className="entName column is-narrow">
                    <h3 className="title is-5">{name}</h3>
                </div>
                <div
                    className="entHealth column"
                    style={{
                        background: `linear-gradient(to right, #4f934f ${perc}%, #db4343 0)`,
                    }}>
                        <h3 className="title is-5">{health}/{maxHealth} | {Math.floor(perc)}%</h3>
                </div>
        </div>
        );
    }

    render() {
        const { entNames, localEnts, maxHeight } = this.props;

        return (
        <div className="listview" style={{height: `${maxHeight}px`, maxHeight: `${maxHeight}px`}}>
            {entNames.length > 0 ?
                entNames.map(name => this.renderItem(name, localEnts[name].health, localEnts[name].maxHealth))
            :
            <div className="blankList">
                <div className="blankWrapper">
                    <h1 className="title is-3">No entities to display</h1>
                    <h2 className="subtitle is-5">Try adding to entity to display a list item here</h2>
                </div>
            </div>
            }
        </div>
        );
    }
}

Listview.propTypes = {
    entNames: PropTypes.array.isRequired,
    localEnts: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    maxHeight: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
};

export default Listview;
