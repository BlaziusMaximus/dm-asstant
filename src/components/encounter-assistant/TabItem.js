import React, { Component } from 'react'
import $ from 'jquery'
import './TabItem.css'
import PropTypes from 'prop-types'

export class TabItem extends Component {
    state = {
        name: this.props.name,
        editIcon: {
            hover: false,
        },
        delIcon: {
            hover: false,
        },
        checkIcon: {
            hover: false,
        },
    };

    componentDidUpdate() {
        $(`#${this.props.id} input`).focus();
    }

    activateTab = () => {
        this.props.activateTab(this.props.id);
        this.setState({
            name: this.props.name,
            editIcon: {
                hover: false,
            },
            delIcon: {
                hover: false,
            },
            checkIcon: {
                hover: false,
            },
        });
    }

    onChange = (e) => {
        this.setState({ name: e.currentTarget.value });
    }

    onKeyPress = (e) => {
        if (e.key === "Enter" && this.state.name !== "") {
            this.props.setName(this.props.id, this.state.name);
        }
    }

    hoverOn = (e) => {
        let icon = this.state[e.target.id];
        icon.hover = true;
        this.setState({ [e.target.id]: icon });
    }

    hoverOff = (e) => {
        let icon = this.state[e.target.id];
        icon.hover = false;
        this.setState({ [e.target.id]: icon });
    }

    clickIcon = (e) => {
        e.stopPropagation();
        this.hoverOff(e);
        const { id } = this.props;
        switch (e.target.id) {
        case "editIcon":
            this.props.editName(id);
            break;
        case "delIcon":
            this.props.delTab(id);
            break;
        case "checkIcon":
            if (this.state.name !== "") {
                this.props.setName(id, this.state.name);
            }
            break;
        default:
        }
    }

    render() {
        const { id, name, inputTab, activeTab } = this.props;
        const { editIcon, delIcon, checkIcon } = this.state;

        return (
        inputTab ?
        <li
            id={id}
            className={"group inputTab ".concat(activeTab?"is-active":"")}
            onClick={this.activateTab}>
            <p>
                <input
                    className="input is-small"
                    type="text"
                    placeholder="alias..."
                    value={this.state.name}
                    ref={(inp) => this.tabInput = inp}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                />
                <span className="icon is-small">
                    <i
                        className="fas fa-check"
                        aria-hidden="true"
                        id="checkIcon"
                        onMouseOver={this.hoverOn}
                        onMouseOut={this.hoverOff}
                        onClick={this.clickIcon}
                        style={checkIcon.hover?{color: "red"}:null}>
                    </i>
                </span>
            </p>
        </li>
        :
        <li
            id={id}
            className={"group displayTab ".concat(activeTab?"is-active":"")}
            onClick={this.activateTab}>
            <p style={{backgroundColor: this.props.highlighted?this.props.tabColor:""}}>
                <span>{name}</span>
                {activeTab ?
                <span className="icons">
                <span className="icon is-small">
                    <i
                        className="far fa-edit"
                        aria-hidden="true"
                        id="editIcon"
                        onMouseOver={this.hoverOn}
                        onMouseOut={this.hoverOff}
                        onClick={this.clickIcon}
                        style={editIcon.hover?{color: "red"}:null}>
                    </i>
                </span>
                <span className="icon is-small">
                    <i
                        className="fas fa-trash-alt"
                        aria-hidden="true"
                        id="delIcon"
                        onMouseOver={this.hoverOn}
                        onMouseOut={this.hoverOff}
                        onClick={this.clickIcon}
                        style={delIcon.hover?{color: "red"}:null}>
                    </i>
                </span>
                </span>
                :(name === "" ?
                <span className="icon is-small">
                    <i className="fas fa-plus" aria-hidden="true"></i>
                </span>
                :null)}
            </p>
        </li>
        );
    }
}

TabItem.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    inputTab: PropTypes.bool.isRequired,
    activeTab: PropTypes.bool.isRequired,
    activateTab: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
    editName: PropTypes.func.isRequired,
    delTab: PropTypes.func.isRequired,
};

export default TabItem
