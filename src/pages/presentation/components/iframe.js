import React from 'react'

class Iframe extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.url}</p>
            </div>
        )
    }
}

export default Iframe