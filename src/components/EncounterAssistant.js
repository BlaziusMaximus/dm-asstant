import React, { Component } from 'react'
import CommandLine from './encounter-assistant/CommandLine'
import Tabs from './encounter-assistant/Tabs'
import uuid from 'uuid'
import './EncounterAssistant.css'

export class EncounterAssistant extends Component {
    tabID = uuid.v4();
    state = {
        tabNames: ["New Group", ""],
        activeTab: 0,
        action: "",
        squares: Array(10).fill(Array(10).fill(null)),
        size: 10,
        stepNum: 0,
        MAX_SIZE: 500,
    };

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
            <div className="encounterAssistant">
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
        )
    }
}

export default EncounterAssistant
