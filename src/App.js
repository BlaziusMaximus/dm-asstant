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
            width: 0,
            height: 0,
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
            pageStates: [{},{}],
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
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    updatePage = (page, state) => {
        let { pageStates } = this.state;
        pageStates[page] = state;
        this.setState({ pageStates });
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
                    <Route path="/encounter-assistant" render={props => (
                        <EncounterAssistant
                            width={this.state.width}
                            height={this.state.height}
                            state={this.state.pageStates[0]}
                            updateState={(state) => this.updatePage(0, state)}
                        />
                    )} />
                </div>
            </Router>
        );
    }
}

export default App;
