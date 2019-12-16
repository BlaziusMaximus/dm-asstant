import React from 'react';
import './App.css';
import EncounterAssistant from './components/EncounterAssistant'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" render={props => (
                        <Link to="/encounter-assistant">encounter assistant</Link>
                    )} />
                    <Route path="/encounter-assistant" component={EncounterAssistant} />
                </div>
            </Router>
        );
    }
}

export default App;
