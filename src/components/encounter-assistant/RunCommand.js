import $ from 'jquery'

function RunCommand(tokens) {
    let func;
    console.log(tokens)
    switch (tokens[0]) {
    case "move":
        func = ((ents, tab) => {
            let [ ent, x, y ] = tokens.slice(1,4);
            if (ents[tab]!==null && ents[tab][ent]!==null &&
                x!==null && !isNaN(parseInt(x)) &&
                y!==null && !isNaN(parseInt(y))) {
                    return $.extend(ents[tab][ent], {
                        x: parseInt(x),
                        y: parseInt(y),
                    });
                }
            else {
                console.log("Error. Unable to move entity.");
                return ents[tab][ent];
            }
        });
        break;
    case "effect":
        func = ((ents, tab) => {
            let [ ent, effect ] = tokens.slice(1, 3);
            if (ents[tab]!==null && ents[tab][ent]!==null && effect!==null && effect!==undefined) {
                let entEffects = ents[tab][ent].effects;
                if (entEffects.find(ef => ef===effect)) {
                    return $.extend(ents[tab][ent], {
                        effects: entEffects.filter(ef => ef!==effect),
                    });
                } else {
                    return $.extend(ents[tab][ent], {
                        effects: ents[tab][ent].effects.concat([effect]),
                    });
                }
            } else if (ents[tab][ent]!=null) {
                return ents[tab][ent].effects;
            } else {
                return [];
            }
        });
        break;
    case "health":
        func = ((ents, tab) => {
            let [ ent, value ] = tokens.slice(1, 3);
            console.log(ent, value, parseInt(value))
            if (isNaN(value)) value = null;
            if (ents[tab]!==null && ents[tab][ent] && value!==null) {
                if (value.includes("+") || value.includes("-")) {
                    return $.extend(ents[tab][ent], {
                       health: +ents[tab][ent].health + +parseInt(value),
                    });
                } else {
                    return $.extend(ents[tab][ent], {
                        health: parseInt(value),
                    });
                }
            } else {
                console.log("Error. Unable to modify entity health.");
                return ents[tab][ent];
            }
        });
        break;
    case "add":
        func = ((ents, tab) => {
            // if (ents[tab] == null) { ents[tab] = {}; }
            let [ ent, health, x, y ] = tokens.slice(1,5);
            let conflict = Object.values(ents[tab]).filter(el => (
                parseInt(el.x) === parseInt(x) && parseInt(el.y) === parseInt(y)
            )).length !== 0;
            if (!ents[tab][ent] && health!==null && x!==null && x!==undefined && y!==null && y!==undefined && !conflict) {
                return {
                    health,
                    x,
                    y,
                    effects: [],
                    size: 1,
                };
            } else if (ents[tab][ent]) {
                console.log("Error. Entity with that name already exists.", ents, tab);
                console.log(!ents[tab][ent], health!==null, x!==null, y!==null, !conflict)
                return ents[tab][ent];
            } else {
                console.log("Error. Unable to add entity.", ents, tab);
                return null;
            }
        });
        break;
    case "del":
        func = ((ents, tab) => {
            let [ ent ] = tokens.slice(1,2);
            if (ents[tab]!==null && ents[tab][ent]!==null) {
                return "delete";
            }
        });
        break;
    case "poll":
        break;
    case "turn":
        break;
    case "board":
        func = (() => {
            let [ boardSize ] = tokens.slice(1,2);
            return ["board", parseInt(boardSize)];
        })
        break;
    default:
        func = null;
    }

    return func;
}

export default RunCommand;