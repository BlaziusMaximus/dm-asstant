import React, { Component } from 'react'
import $ from 'jquery'
import Battlemap from './Battlemap'
import Listview from './Listview'
import Cardview from './Cardview'
import PropTypes from 'prop-types'

export class ViewInstance extends Component {
    state = {
        selectedSquare: null,
        boardSize: 10,
    };

    componentDidUpdate() {
        let { boardSize } = this.state;
        let { entities } = this.props;

        // run commands in prop queue
        this.props.commandsToRun.forEach(comm => {
            let ent, x, y, effect, value, health, size;
            switch(comm[0]) {
            case "move":
                [ ent, x, y ] = comm.slice(1,4);
                if (entities!=null && entities[ent]!=null &&
                    x!=null && !isNaN(parseInt(x)) &&
                    y!=null && !isNaN(parseInt(y))) {
                        entities[ent] = $.extend(entities[ent], {
                            x: parseInt(x),
                            y: parseInt(y),
                        });
                    }
                else {
                    console.log("Error. Unable to move entity.");
                }
                break;
            case "effect":
                [ ent, effect ] = comm.slice(1, 3);
                if (entities!=null && entities[ent]!=null && effect!=null) {
                    let entEffects = entities[ent].effects;
                    if (entEffects.find(ef => ef===effect)) {
                        entities[ent] = $.extend(entities[ent], {
                            effects: entEffects.filter(ef => ef!==effect),
                        });
                    } else {
                        entities[ent] = $.extend(entities[ent], {
                            effects: entities[ent].effects.concat([effect]),
                        });
                    }
                }
                break;
            case "health":
                [ ent, value ] = comm.slice(1, 3);
                if (isNaN(value)) value = null;
                if (entities!=null && entities[ent]!=null && value!=null) {
                    if (value.includes("+") || value.includes("-")) {
                        entities[ent] = $.extend(entities[ent], {
                            health: +entities[ent].health + +parseInt(value),
                        });
                    } else {
                        entities[ent] = $.extend(entities[ent], {
                            health: parseInt(value),
                        });
                    }
                } else {
                    console.log("Error. Unable to modify entity health.");
                }
                break;
            case "add":
                [ ent, health, x, y ] = comm.slice(1,5);
                let conflict = Object.values(entities).filter(el => (
                    parseInt(el.x) === parseInt(x) && parseInt(el.y) === parseInt(y)
                )).length !== 0;
                if (entities[ent]==null && health!=null && x!=null && y!=null && conflict===false) {
                    entities[ent] = {
                        health,
                        x,
                        y,
                        effects: [],
                        size: 1,
                    };
                } else if (entities[ent]!=null) {
                    console.log("Error. Entity with that name already exists.", entities);
                    console.log(entities[ent]==null, health!=null, x!=null, y!=null, conflict===false)
                } else if (conflict===true) {
                    console.log("Error. Entity already exists at the location.", conflict);
                } else {
                    console.log("Error. Unable to add entity.", entities);
                }
                break;
            case "del":
                [ ent ] = comm.slice(1,2);
                if (entities!=null && entities[ent]!=null) {
                    delete entities[ent];
                } else {
                    console.log("Error. Unable to delete entity.");
                }
                break;
            case "board":
                [ size ] = comm.slice(1,2);
                if (size!=null) {
                    boardSize = parseInt(size);
                } else {
                    console.log("Error. Unable to modify board size.");
                }
                break;
            default:
            }
            
            this.setState({ boardSize });
            this.props.updateEnts(entities);
        });

        this.props.completeCommands();
    }

    handleSquareDrop = (x, y, evt) => {
        evt.preventDefault();
        let { entities } = this.props;
        let ent = evt.dataTransfer.getData('Text');
        if (!$(evt.currentTarget).hasClass("is-local-ent") && entities[ent] != null) {
            entities[ent] = $.extend(entities[ent], {
                x: parseInt(x),
                y: parseInt(y),
            });
            this.props.updateEnts(entities);
        }
    }

    changeEntVal = (name, value) => {
        let { selectedSquare } = this.state;
        let { entities } = this.props;
        entities[selectedSquare][name] = value;
        this.props.updateEnts(entities);
    }

    changeEntEffects = (effects) => {
        
    }

    render() {
        const { selectedSquare, boardSize } = this.state;
        const { entities, color, tabColors } = this.props;
        const cardEnt = selectedSquare!=null && entities!=null ? entities[selectedSquare] : null;
        console.log(entities)
        return (
        <div className="viewInstance columns" style={{width: "100%", margin:0}}>
            <div className="column is-4" style={{padding:0,textAlign:"center"}}>
            <Battlemap
                boardSize={boardSize}
                squareSize={(this.props.width*(4/12)-boardSize)*.95/boardSize}
                selectedSquare={selectedSquare}
                selectSquare={(square) => this.setState({ selectedSquare: square })}
                tabColors={tabColors}
                localEnts={entities}
                ghostEnts={this.props.getGhostEnts()}
                highlightTabs={this.props.highlightTabs}
                unHighlightTabs={this.props.unHighlightTabs}
                activateTab={(localSq, ghostSqs, ghostSqEnts) => {
                    if (!localSq && ghostSqs.length===1 && ghostSqEnts.length===1) {
                        this.props.unHighlightTabs();
                        this.props.activateTab(ghostSqs[0]);
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
            {cardEnt != null ?
            <Cardview
                maxHeight={(this.props.width*(4/12)-boardSize)*.95}
                headerColor={color}
                title={this.props.name}
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
        );
    }
}

ViewInstance.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    tabColors: PropTypes.array.isRequired,
    commandsToRun: PropTypes.array.isRequired,
    completeCommands: PropTypes.func.isRequired,
    getGhostEnts: PropTypes.func.isRequired,
    updateEnts: PropTypes.func.isRequired,
};

export default ViewInstance;
