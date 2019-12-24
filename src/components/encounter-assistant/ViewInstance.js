import React, { Component } from 'react'
import $ from 'jquery'
import Battlemap from './encounter-assistant/Battlemap'
import Listview from './encounter-assistant/Listview'
import Cardview from './encounter-assistant/Cardview'
import PropTypes from 'prop-types'
import uuid from 'uuid'

export class ViewInstance extends Component {
    state = {
        entities: {},
        selectedSquare: null,
        boardSize: 10,
    };

    componentDidUpdate() {
        let { entities, boardSize } = this.state;

        // run commands in prop queue
        this.props.commandsToRun.forEach(comm => {
            switch(comm[0]) {
            case "move":
                let [ ent, x, y ] = tokens.slice(1,4);
                if (entities[tab]!==null && entities[tab][ent]!==null &&
                    x!==null && !isNaN(parseInt(x)) &&
                    y!==null && !isNaN(parseInt(y))) {
                        entities[ent] = $.extend(entities[tab][ent], {
                            x: parseInt(x),
                            y: parseInt(y),
                        });
                    }
                else {
                    console.log("Error. Unable to move entity.");
                }
                break;
            case "effect":
                let [ ent, effect ] = tokens.slice(1, 3);
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
                let [ ent, value ] = tokens.slice(1, 3);
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
                let [ ent, health, x, y ] = tokens.slice(1,5);
                let conflict = Object.values(entities).filter(el => (
                    parseInt(el.x) === parseInt(x) && parseInt(el.y) === parseInt(y)
                )).length !== 0;
                if (entities[ent]==null && health!=null && x!=null && y!=null && conflict==null) {
                    entities[ent] = {
                        health,
                        x,
                        y,
                        effects: [],
                        size: 1,
                    };
                } else if (entities[ent]) {
                    console.log("Error. Entity with that name already exists.", entities);
                    console.log(entities[ent]==null, health!=null, x!=null, y!=null, conflict==null)
                } else if (conflict) {
                    console.log("Error. Entity already exists at the location.", conflict);
                } else {
                    console.log("Error. Unable to add entity.", entities);
                }
                break;
            case "del":
                let [ ent ] = tokens.slice(1,2);
                if (entities!=null && entities[ent]!=null) {
                    delete entities[ent];
                } else {
                    console.log("Error. Unable to delete entity.");
                }
                break;
            case "board":
                let [ size ] = tokens.slice(1,2);
                if (size!=null) {
                    boardSize = parseInt(size);
                } else {
                    console.log("Error. Unable to modify board size.");
                }
                break;
            default:
            }
        });

        this.setState({ entities, boardSize });
        this.props.completeCommands();
    }

    render() {
        return (
        <div className="viewInstance">
            
        </div>
        );
    }
}

ViewInstance.propTypes = {
    commandsToRun: PropTypes.array.isRequired,
    completeCommands: PropTypes.func.isRequired,
};

export default ViewInstance;
