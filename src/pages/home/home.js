import React from 'react'
import Iframe from 'react-iframe'
import './home.css';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    {/*<h2>Class Home Page</h2>*/}
                    <Iframe url="https://idatavisualizationlab.github.io/CS3366/"
                            width="1300px"
                            height="900px"
                        // id="myId"
                        // className="myClassname"
                            margin-top="30px"
                            display="initial"
                            position="relative"
                    />
                </div>
            </div>
        );
    }
}

export default HomePage