import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Battlemap.css'

export class Battlemap extends Component {
    

    renderRow = (row, rowkey) => {
        const { boardSize, squareSize, localEnts, ghostEnts } = this.props;
        return (
        <tr className="battlemapRow" key={rowkey}>
            {row.map((square, sqkey) => {
                // everything here happens at an individual square
                let localSq = Object.keys(localEnts).filter(ent => {
                    return parseInt(localEnts[ent].x)===sqkey && parseInt(localEnts[ent].y)===boardSize-rowkey-1;
                })[0];
                let ghostSqs = [];
                // console.log(ghostEnts)
                ghostEnts.forEach((tab, tabkey) => {
                    Object.keys(tab).forEach(ent => {
                        if (parseInt(tab[ent].x)===sqkey && parseInt(tab[ent].y)===boardSize-rowkey-1) {
                            ghostSqs.push(tabkey);
                        }
                    });
                });
                if (localSq) ghostSqs = [];
                return (
                <td
                    className={"battlemapSquare ".concat(localSq?"is-local-ent":"")}
                    key={sqkey}
                    style={{
                        width: squareSize,
                        height: squareSize,
                        // backgroundColor: ghostSqs.length!==0 ? "#b2764e" : "",
                        backgroundColor: ghostSqs.length!==0?ghostSqs.length===1?this.props.tabColors[ghostSqs[0]%this.props.tabColors.length]:"black":"",
                    }}
                    onMouseOver={() => ghostSqs.length!==0?this.props.highlightTabs(ghostSqs):null}
                    onMouseOut={() => ghostSqs.length!==0?this.props.unHighlightTabs():null}
                    onClick={() => {}}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => this.props.handleDrop(sqkey, boardSize-rowkey-1, e)}>
                        {localSq?
                        <div
                            className="cell"
                            draggable="true"
                            onDragStart={(evt) => {
                                let dt = evt.dataTransfer;
                                dt.setData('Text', localSq);
                            }}>
                        </div>
                        :null}
                </td>);
            })}
        </tr>
        );
    }

    render() {
        return (
        <table className="battlemap" tabIndex="0" style={{margin: `${this.props.squareSize/4}px`}}>
        <tbody>
            {this.props.squares.map((row, key) => 
                this.renderRow(row, key)
            )}
        </tbody>
        </table>
        );
    }
}

Battlemap.propTypes = {
    boardSize: PropTypes.number.isRequired,
    squares: PropTypes.array.isRequired,
    squareSize: PropTypes.number.isRequired,
    // selectedSquare: PropTypes.number.isRequired,
    localEnts: PropTypes.object.isRequired,
    ghostEnts: PropTypes.array.isRequired,
};

export default Battlemap;
