import React, { Component, PropTypes } from 'react';
require('./view-edit-toggle-field.scss');

class ViewEditToggleField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.text,
            hasBeenSubmitted: false,
            shouldSubmit: true,
            isEditMode: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (!nextProps.clearTextOnClick && !nextState.isEditMode) {
            nextState.value = nextProps.text;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.state.hasBeenSubmitted = false;
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleFocus() {
        this.setState({
            isEditMode: true,
            value: this.props.clearTextOnClick ? '' : this.state.value
        });
    }

    handleKeyDown(event) {
        switch (event.key) {
            case 'Escape': {
                this.setState({
                    value: this.props.text
                });
                this.state.shouldSubmit = false;
                event.target.blur();
                break;
            }

            case 'Enter': {
                this.state.shouldSubmit = true;
                this.handleSubmit(event);
                break;
            }
        }
    }

    handleSubmit(event) {
        if (!this.state.hasBeenSubmitted && this.state.shouldSubmit) {
            this.state.hasBeenSubmitted = true;
            event.target.blur();

            this.setState({
                isEditMode: false
            });

            if (event.target.value != '') {
                this.props.handleSubmit(event);
            }

            if (this.props.resetToOriginalOnSubmit) {
                this.setState({
                    value: this.props.text
                });
            }
        }
    }

    render() {
        const stateClass = this.state.isEditMode ? 'view-edit-toggle-field-edit-mode' : 'view-edit-toggle-field';

        return (
            <div className={`${stateClass} ${this.props.type}-view-edit-toggle-field`}>
                {
                    this.props.isReadOnly
                        ? <input type="text" value={this.props.task.Name} disabled />
                        : (
                            <input
                                value={this.state.value}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={(event) => this.handleSubmit(event)}
                                onKeyDown={this.handleKeyDown}
                            />
                        )
                }
            </div>
        );
    }
}

ViewEditToggleField.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    clearTextOnClick: PropTypes.bool,
    resetToOriginalOnSubmit: PropTypes.bool,
    isReadOnly: PropTypes.bool,

    handleSubmit: PropTypes.func.isRequired
};

ViewEditToggleField.defaultProps = {
    text: '',
    clearTextOnClick: false,
    resetToOriginalOnSubmit: false,
    isReadOnly: false
};

export default ViewEditToggleField;
