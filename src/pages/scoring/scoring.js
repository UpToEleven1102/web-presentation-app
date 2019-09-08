import React from 'react'
import Iframe from "react-iframe";

class ScoringPage extends React.Component {
    constructor(props) {
        super(props)
        //
    }

    render() {
        return (
            <div>
                <Iframe
                    url={'google.com'}
                />
                <p>scoring options</p>
            </div>
        )
    }
}

export default ScoringPage