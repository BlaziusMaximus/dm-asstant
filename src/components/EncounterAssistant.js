import React, { Component } from 'react'
import $ from 'jquery'
import CommandLine from './encounter-assistant/CommandLine'
import Tabs from './encounter-assistant/Tabs'
import Battlemap from './encounter-assistant/Battlemap'
import Listview from './encounter-assistant/Listview'
import Cardview from './encounter-assistant/Cardview'
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
        if (!$(evt.currentTarget).hasClass("is-local-ent") && entities[activeTab][ent] != null) {
            entities[activeTab][ent] = $.extend(entities[activeTab][ent], {
                x: parseInt(x),
                y: parseInt(y),
            });
            this.setState({ entities })
        }
    }

    runCommand = (ent, command) => {
        let { entities, activeTab } = this.state;
        let newEnt = command(entities, activeTab);
        if (newEnt!==null) entities[activeTab][ent] = newEnt;
        this.setState({ entities });
    }

    changeEntVal = (name, value) => {
        let { entities, activeTab, selectedSquare } = this.state;
        entities[activeTab][selectedSquare][name] = value;
        this.setState({ entities });
    }

    changeEntEffects = (effects) => {

    }

    render() {
        const { tabNames, activeTab, boardSize, squares, selectedSquare, entities, tabColors } = this.state;
        // cardEnt - does a card need to be displayed
        const cardEnt = activeTab!==null && selectedSquare!==null && selectedSquare!==undefined && entities!==null && entities[activeTab]!==undefined && entities[activeTab][selectedSquare]!==undefined ? entities[activeTab][selectedSquare] : null;
        console.log(cardEnt)
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
                tabColors={tabColors}
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
                    selectSquare={(square) => this.setState({ selectedSquare: square })}
                    tabColors={tabColors}
                    localEnts={entities[activeTab]?entities[activeTab]:{}}
                    ghostEnts={this.getGhostEnts()}
                    highlightTabs={this.highlightTabs}
                    unHighlightTabs={this.unHighlightTabs}
                    activateTab={(localSq, ghostSqs, ghostSqEnts) => {
                        if (!localSq && ghostSqs.length===1 && ghostSqEnts.length===1) {
                            this.unHighlightTabs();
                            this.activateTab(ghostSqs[0]);
                            this.setState({ selectedSquare: ghostSqEnts[0] });
                        } else if (!localSq) {
                            this.setState({ selectedSquare: null });
                        }
                    }}
                    handleDrop={this.handleSquareDrop}
                />
                </div>
                <div className="column is-4" style={{backgroundColor: "black"}}>
                <Listview
                />
                </div>
                <div className="column is-4 cardCol">
                {cardEnt !== null ?
                <Cardview
                    maxHeight={(this.props.width*(4/12)-boardSize)*.95}
                    headerColor={tabColors[activeTab]}
                    title={tabNames[activeTab]}
                    name={selectedSquare}
                    health={cardEnt ? cardEnt.health : null}
                    x={cardEnt ? cardEnt.x : null}
                    y={cardEnt ? cardEnt.y : null}
                    effects={cardEnt ? cardEnt.effects : null}
                    changeVal={this.changeEntVal}
                />
                :
                <div className="blankCard">
                    <h1 className="title is-3">No entity selected</h1>
                    <h2 className="subtitle is-5">Selected an entity on the Battlemap to display a card here</h2>
                </div>
                }
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
