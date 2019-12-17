import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import EncounterAssistant from './components/EncounterAssistant'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import uuid from 'uuid'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homePageName: "Home",
            navPages: [{
                id: uuid.v4(),
                name: "Encounter Assistant",
                component: "encounter-assistant",
            }, {
                id: uuid.v4(),
                name: "test",
                component: "encounter-assistant",
            }],
            colorThemes: [{
                base: "#d82b2b",
                darkShade: "#b22323",
                lightShade: "#ff3232",
                darkTint: "d80000",
                lightTint: "d85656",
                pureHue: "#2bd8d8",
            }],
            currentColorTheme: 0,
        };
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route path="/" render={props => (
                        <Navbar
                            home={"Home"}
                            pages={this.state.navPages}
                            colorTheme={this.state.colorThemes[this.state.currentColorTheme]}
                        />
                    )} />
                    <Route path="/encounter-assistant" component={EncounterAssistant} />
                </div>
            </Router>
        );
    }
}

export default App;
