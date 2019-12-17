import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Battlemap.css'

export class Battlemap extends Component {
    renderRow = (row, rowkey) => {
        return (
        <tr className="battlemapRow" key={rowkey}>
            {row.map((square, sqkey) => this.renderSquare(square, sqkey))}
        </tr>
        );
    }

    renderSquare = (square, key) => {
        return (
        <td
            className="battlemapSquare"
            key={key}
            style={{
                width: this.props.squareSize,
                height: this.props.squareSize,
            }}
            onClick={() => {}}>
        </td>
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
};

export default Battlemap;
