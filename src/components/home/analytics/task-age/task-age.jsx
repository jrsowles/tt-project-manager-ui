// npm modules
import React from 'React';

// styles
require('./task-age.scss');

class TaskAge extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.isVisible;
    }

    render() {
        return (
            <div id="task-age">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>Some elder task</td>
                            <td style={{textAlign: 'right', color: '#cc2320'}}>2w 4d</td>
                        </tr>
                        <tr>
                            <td>Some aging task</td>
                            <td style={{textAlign: 'right', color: '#d8854e'}}>1w 2d</td>
                        </tr>
                        <tr>
                            <td>Some fledgling task</td>
                            <td style={{textAlign: 'right'}}>3d 4h</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

TaskAge.propTypes = {
    isVisible: React.PropTypes.bool.isRequired
};

export default TaskAge;
