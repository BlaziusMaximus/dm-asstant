import React, { Component } from 'react'
import $ from 'jquery'
import CommandLine from './encounter-assistant/CommandLine'
import Tabs from './encounter-assistant/Tabs'
import ViewInstance from './encounter-assistant/ViewInstance'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import './EncounterAssistant.css'

export class EncounterAssistant extends Component {
    state = {
        entities: [{}],
        tabNames: ["New Group", ""],
        tabColors: [
            "lightcoral",
            "lightblue",
            "lightgreen",
            "lightgoldenrodyellow",
            "lightsalmon",
            "lightseagreen",
            "lightslategrey",
        ],
        highlightedTabs: [],
        activeTab: 0,
        action: "",
        commandsToRun: [],
    };

    componentDidMount() {
        if (this.props.state!=null) this.setState(this.props.state);
    }

    addTab = () => {
        let { boardSize, entities } = this.state;
        entities.push({});
        this.setState({ tabNames: this.state.tabNames.concat([""]), entities });
        this.props.updateState(this.state);
    }

    delTab = (index) => {
        let { tabNames, entities } = this.state;
        tabNames.splice(index, 1);
        entities.splice(index, 1);
        this.setState({ tabNames, entities, activeTab: null });
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

    submitCommand = (tokens) => {
        let { commandsToRun } = this.state;
        commandsToRun.push(tokens);
        this.setState({ commandsToRun });
    }

    completeCommands = () => {
        if (this.state.commandsToRun.length > 0) {
            this.setState({ commandsToRun: [] });
        }
    }

    updateEnts = (ents) => {
        let { entities, activeTab } = this.state;
        entities[activeTab] = ents;
        this.setState({ entities });
    }

    render() {
        const { tabNames, activeTab, entities, tabColors, commandsToRun } = this.state;
        // cardEnt - does a card need to be displayed

        return (
        <div className="encounterAssistant">
            <CommandLine
                submitCommand={this.submitCommand}
            />
            <Tabs
                tabID={uuid.v4()}
                addTab={this.addTab}
                delTab={this.delTab}
                activeTab={this.state.activeTab}
                activateTab={this.activateTab}
                setTabName={this.setTabName}
                tabColors={tabColors}
                highlightedTabs={this.state.highlightedTabs}
            />


            {activeTab != null && tabNames.length-1 >= activeTab && tabNames[activeTab] !== "" ?
            <ViewInstance
                width={this.props.width}
                height={this.props.height}
                entities={entities[activeTab]}
                name={tabNames[activeTab]}
                color={tabColors[activeTab]}
                tabColors={tabColors}
                commandsToRun={commandsToRun}
                completeCommands={this.completeCommands}
                getGhostEnts={this.getGhostEnts}
                updateEnts={this.updateEnts}
                highlightTabs={this.highlightTabs}
                unHighlightTabs={this.unHighlightTabs}
                activateTab={this.activateTab}
            />
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
