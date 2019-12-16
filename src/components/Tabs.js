import React, { Component } from 'react'
import TabItem from './TabItem'
import PropTypes from 'prop-types'
import uuid from 'uuid';

export class Tabs extends Component {
    state = {
        tabs: [{
            id: this.props.tabID,
            name: "New Group",
            input: false,
        }, {
            id: uuid.v4(),
            name: "",
            input: false,
        }],
        activeTab: this.props.tabID,
    };

    addTab = () => {
        let { tabs } = this.state;
        tabs.push({
            id: uuid.v4(),
            name: "",
            input: false,
        });
        this.setState({ tabs });
        this.props.addTab();
    }

    activateTab = (tab) => {
        let { tabs, activeTab } = this.state;
        if (activeTab === tab) return;
        tabs = tabs.map(tab => {
            tab.input = false;
            return tab;
        });
        let newTabI = tabs.findIndex(x => x.id === tab && x.name === "");
        if (newTabI && tabs[newTabI]) tabs[newTabI].input = true;
        this.setState({ activeTab: tab, tabs });
        this.props.activateTab(tabs.findIndex(x => x.id === tab));
    }

    setTabName = (id, name) => {
        let { tabs } = this.state;
        let tabI = tabs.findIndex(x => x.id === id);
        if (tabI >= 0 && tabs[tabI] != null) {
            tabs[tabI].input = false;
            if (tabs[tabI].name === "") this.addTab();
            tabs[tabI].name = name;
        }
        this.setState({ tabs });
        this.props.setTabName(tabI, name);
    }

    editTabName = (id) => {
        let { tabs } = this.state;
        let tabI = tabs.findIndex(x => x.id === id);
        if (tabI >= 0 && tabs[tabI] != null) {
            tabs[tabI].input = true;
        }
        this.setState({ tabs });
    }

    delTab = (id) => {
        let { tabs } = this.state;
        let tabI = tabs.findIndex(x => x.id === id);
        if (tabI >= 0 && tabs[tabI] != null) {
            tabs.splice(tabI, 1);
        }
        this.setState({ tabs });
    }

    render() {
        return (
        <div className="tabs is-boxed">
        <ul>
            {this.state.tabs.map(tab => 
                <TabItem
                    id={tab.id}
                    name={tab.name}
                    inputTab={tab.input}
                    activeTab={tab.id === this.state.activeTab}
                    activateTab={this.activateTab}
                    setName={this.setTabName}
                    editName={this.editTabName}
                    delTab={this.delTab}
                    key={tab.id}
                />
            )}
        </ul>
        </div>
        )
    }
}

Tabs.propTypes = {
    tabID: PropTypes.string.isRequired,
    addTab: PropTypes.func.isRequired,
    activateTab: PropTypes.func.isRequired,
    setTabName: PropTypes.func.isRequired,
};

export default Tabs
