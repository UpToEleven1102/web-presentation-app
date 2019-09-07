import React from 'react'
import Iframe from "../presentation/components/iframe";

class ScoringPage extends React.Component {
    constructor(props) {
        super(props)
        //
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <Iframe url={'google.com'}/>
                    </div>
                    <p>scoring options</p>
                </div>
            </div>
        )
    }
}

export default ScoringPage