import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Battlemap.css'

export class Battlemap extends Component {
    

    renderRow = (row, rowkey) => {
        const { boardSize, squareSize, localEnts, ghostEnts, tabColors } = this.props;
        return (
        <tr className="battlemapRow" key={rowkey}>
            {row.map((square, sqkey) => {
                // everything here happens at an individual square
                let localSq = Object.keys(localEnts).filter(ent => {
                    return parseInt(localEnts[ent].x)===sqkey && parseInt(localEnts[ent].y)===boardSize-rowkey-1;
                })[0];
                let ghostSqs = [];
                ghostEnts.forEach((tab, tabkey) => {
                    Object.keys(tab).forEach(ent => {
                        if (parseInt(tab[ent].x)===sqkey && parseInt(tab[ent].y)===boardSize-rowkey-1) {
                            ghostSqs.push(tabkey);
                        }
                    });
                });
                if (localSq) ghostSqs = [];
                let ghostConflicts = ghostSqs.map((sq,i) => {
                                // color                            starting %                      ending %
                    return `${tabColors[sq%tabColors.length]} ${(100/ghostSqs.length)*(i)}% ${(100/ghostSqs.length)*(i+1)}%`;
                });
                let ghostColor = ghostSqs.length!==0?ghostSqs.length===1?tabColors[ghostSqs[0]%tabColors.length]:"":"";
                return (
                <td
                    className={"battlemapSquare ".concat(localSq?"is-local-ent":(ghostSqs.length!==0?"is-ghost-ent":""))}
                    key={sqkey}
                    style={{
                        width: squareSize,
                        height: squareSize,
                        // backgroundColor: ghostSqs.length!==0 ? "#b2764e" : "",
                        backgroundColor: ghostColor,
                        background: ghostSqs.length>1?`linear-gradient(135deg, ${ghostConflicts})`:"null",
                    }}
                    onMouseOver={() => ghostSqs.length!==0?this.props.highlightTabs(ghostSqs):null}
                    onMouseOut={() => ghostSqs.length!==0?this.props.unHighlightTabs():null}
                    onClick={() => {this.props.unHighlightTabs(); this.props.activateTab(localSq, ghostSqs)}}
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
