import React, { Component } from 'react';
import { Tooltip as ReactTooltip } from "react-tooltip";

class Tooltip extends Component {
    render() {
        const { text, id } = this.props
        return (
            <ReactTooltip id={id} effect="float">
                {text}
            </ReactTooltip>
        );
    }
}

export default Tooltip;
