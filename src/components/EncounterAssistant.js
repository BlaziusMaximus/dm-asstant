import React, { Component } from 'react'
import CommandLine from './encounter-assistant/CommandLine'
import Tabs from './encounter-assistant/Tabs'
import Battlemap from './encounter-assistant/Battlemap'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import './EncounterAssistant.css'

export class EncounterAssistant extends Component {
    tabID = uuid.v4();
    state = {
        tabNames: ["New Group", ""],
        activeTab: 0,
        action: "",
        boardSize: 10,
        squares: [[]],
        selectedSquare: null,
        stepNum: 0,
        MAX_SIZE: 500,
    };

    componentDidMount() {
        console.log(this.props.state)
        if (this.props.state!=null) this.setState(this.props.state);
        let { boardSize } = this.state;
        this.setState({ squares: [Array(boardSize).fill(Array(boardSize).fill(null))] });
    }

    addTab = () => {
        let { squares, boardSize } = this.state;
        squares.push(Array(boardSize).fill(Array(boardSize).fill(null)));
        this.setState({ tabNames: this.state.tabNames.concat([""]), squares });
        this.props.updateState(this.state);
    }

    delTab = (index) => {
        let { tabNames, squares } = this.state;
        tabNames.splice(index, 1);
        squares.splice(index, 1);
        this.setState({ tabNames, squares });
        this.props.updateState(this.state);
    }

    activateTab = (index) => {
        this.setState({ activeTab: index });
        this.props.updateState(this.state);
    }

    setTabName = (index, name) => {
        let { tabNames } = this.state;
        tabNames[index] = name;
        this.setState({ tabNames });
        this.props.updateState(this.state);
    }

    render() {
        const { tabNames, activeTab, boardSize, squares, selectedSquare } = this.state;
        
        return (
        <div className="encounterAssistant">
            <CommandLine
                runCommand={(c) => {console.log(c)}}
            />
            <Tabs
                tabID={this.tabID}
                addTab={this.addTab}
                delTab={this.delTab}
                activateTab={this.activateTab}
                setTabName={this.setTabName}
            />
            <div className="columns" style={{width: "100%", margin:0}}>
                <div className="column is-4" style={{padding:0,textAlign:"center"}}>
                <Battlemap
                    boardSize={boardSize}
                    squares={tabNames[activeTab]!==""&&squares.length>activeTab?squares[activeTab]:[[]]}
                    squareSize={(this.props.width*(4/12)-boardSize)*.95/boardSize}
                    selectedSquare={selectedSquare}
                />
                </div>
                <div className="column is-4" style={{backgroundColor: "black"}}>

                </div>
                <div className="column is-4" style={{backgroundColor: "red"}}>
                    
                </div>
            </div>
        </div>
        )
    }
}

EncounterAssistant.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    state: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
};

export default EncounterAssistant
