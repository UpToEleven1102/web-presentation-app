import React from 'react'

class LoginPage extends React.Component {
    login = () => {
        this.props.setUser({name: 'Huyen'})
    }
    render() {
        return (
            <div>
                <input placeholder={'name'} />
                <input placeholder={'password'} />
                <button onClick={this.login}>Submit</button>
            </div>
        );
    }
}

export default LoginPage