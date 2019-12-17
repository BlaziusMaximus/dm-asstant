import $ from 'jquery'

function RunCommand(tokens) {
    let func;
    // console.log(tokens)
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
        break;
    case "health":
        break;
    case "add":
        func = ((ents, tab) => {
            // if (ents[tab] == null) { ents[tab] = {}; }
            let [ ent, health, x, y ] = tokens.slice(1,5);
            let conflict = Object.values(ents[tab]).filter(el => (
                parseInt(el.x) === parseInt(x) && parseInt(el.y) === parseInt(y)
            )).length !== 0;
            if (!ents[tab][ent] && health!==null && x!==null && y!==null && !conflict) {
                return {
                    health,
                    x,
                    y,
                    effects: [],
                    size: 1,
                };
            } else {
                console.log("Error. Unable to add entity.", ents, tab);
                console.log(!ents[tab][ent], health!==null, x!==null, y!==null, !conflict)
                return ents[tab][ent];
            }
        });
        break;
    case "del":
        break;
    case "poll":
        break;
    case "turn":
        break;
    case "board":
        break;
    default:
    }

    return func;
}

export default RunCommand;