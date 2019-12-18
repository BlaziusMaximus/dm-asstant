import React, { Component } from 'react'
import $ from 'jquery'
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
        tabColors: [
            "lightcoral",
            "lightblue",
            "lightgreen",
            "lightgoldenrodyellow",
            "lightsalmon",
            "lightseagreen",
            "lightslategrey"
        ],
        highlightedTabs: [],
        activeTab: 0,
        action: "",
        boardSize: 10,
        squares: [[]],
        selectedSquare: null,
        entities: [{}],
    };

    componentDidMount() {
        if (this.props.state!=null) this.setState(this.props.state);
        let { boardSize } = this.state;
        this.setState({ squares: [Array(boardSize).fill(Array(boardSize).fill(null))] });
    }

    addTab = () => {
        let { squares, boardSize, entities } = this.state;
        squares.push(Array(boardSize).fill(Array(boardSize).fill(null)));
        entities.push({});
        this.setState({ tabNames: this.state.tabNames.concat([""]), squares, entities });
        this.props.updateState(this.state);
    }

    delTab = (index) => {
        let { tabNames, squares, entities } = this.state;
        tabNames.splice(index, 1);
        squares.splice(index, 1);
        entities.splice(index, 1);
        this.setState({ tabNames, squares, entities, activeTab: null });
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

    getGhostEnts = () => {
        let { activeTab, entities } = this.state;
        let ghostEnts = [];
        entities.forEach((tab, i) => {
            if (i !== activeTab) {
                ghostEnts.push(tab);
            } else {
                ghostEnts.push({});
            }
        });
        return ghostEnts;
    }

    highlightTabs = (tabs) => {
        this.setState({ highlightedTabs: tabs });
    }

    unHighlightTabs = () => {
        this.setState({ highlightedTabs: [] });
    }

    handleSquareDrop = (x, y, evt) => {
        evt.preventDefault();
        let { entities, activeTab } = this.state;
        let ent = evt.dataTransfer.getData('Text');
        if (!$(evt.currentTarget).hasClass("is-occupied") && entities[activeTab][ent] != null) {
            entities[activeTab][ent] = $.extend(entities[activeTab][ent], {
                x: parseInt(x),
                y: parseInt(y),
            });
            this.setState({ entities })
        }
    }

    runCommand = (ent, command) => {
        let { activeTab, entities } = this.state;
        entities[activeTab][ent] = command(entities, activeTab);
        this.setState({ entities });
    }

    render() {
        const { tabNames, activeTab, boardSize, squares, selectedSquare, entities } = this.state;
        
        return (
        <div className="encounterAssistant">
            <CommandLine
                runCommand={this.runCommand}
            />
            <Tabs
                tabID={this.tabID}
                addTab={this.addTab}
                delTab={this.delTab}
                activeTab={this.state.activeTab}
                activateTab={this.activateTab}
                setTabName={this.setTabName}
                tabColors={this.state.tabColors}
                highlightedTabs={this.state.highlightedTabs}
            />
            {activeTab !== null && tabNames.length-1 >= activeTab && tabNames[activeTab] !== "" ?
            <div className="columns" style={{width: "100%", margin:0}}>
                <div className="column is-4" style={{padding:0,textAlign:"center"}}>
                <Battlemap
                    boardSize={boardSize}
                    squares={activeTab!=null&&tabNames[activeTab]!==""&&squares.length>activeTab?squares[activeTab]:[[]]}
                    squareSize={(this.props.width*(4/12)-boardSize)*.95/boardSize}
                    selectedSquare={selectedSquare}
                    tabColors={this.state.tabColors}
                    localEnts={entities[activeTab]?entities[activeTab]:{}}
                    ghostEnts={this.getGhostEnts()}
                    highlightTabs={this.highlightTabs}
                    unHighlightTabs={this.unHighlightTabs}
                    activateTab={(localSq, ghostSqs) => localSq?null:(ghostSqs.length===1?this.activateTab(ghostSqs[0]):null)}
                    handleDrop={this.handleSquareDrop}
                />
                </div>
                <div className="column is-4" style={{backgroundColor: "black"}}>

                </div>
                <div className="column is-4" style={{backgroundColor: "red"}}>
                    
                </div>
            </div>
            :null}
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
