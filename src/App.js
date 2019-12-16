import React from 'react';
import './App.css';
import CommandLine from './components/CommandLine'
import Tabs from './components/Tabs'
import uuid from 'uuid';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.tabID = uuid.v4();

        this.state = {
            tabNames: ["New Group", ""],
            activeTab: 0,
            action: "",
            squares: Array(10).fill(Array(10).fill(null)),
            size: 10,
            stepNum: 0,
            MAX_SIZE: 500,
        };
    }

    addTab = () => {
        this.setState({ tabNames: this.state.tabNames.concat([""]) });
    }

    activateTab = (index) => {
        this.setState({ activeTab: index });
    }

    setTabName = (index, name) => {
        let { tabNames } = this.state;
        tabNames[index] = name;
        this.setState({ tabNames });
    }
    
    render() {
        return (
            <div className="App">
                <CommandLine
                    runCommand={(c) => {console.log(c)}}
                />
                <Tabs
                    tabID={this.tabID}
                    addTab={this.addTab}
                    activateTab={this.activateTab}
                    setTabName={this.setTabName}
                />
            </div>
        );
    }
}

export default App;
