import React, {Fragment} from 'react'
import Iframe from "react-iframe";
import {getPresentingStudent, getStudents} from "../../services/students";

class ScoringPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            presenting_student: null,
            name: ''
        }
    }

    async componentDidMount() {
        const students = await getStudents()
        await this.setState({students})
        await this.getPresentingStudent()
        this.interval = setInterval(this.getPresentingStudent, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getPresentingStudent = async () => {
        const presenting_student = await getPresentingStudent()
        await this.setState({presenting_student: presenting_student})
    }

    setUser = () => {
        this.setState({student: {name: this.state.name}})
    }

    render() {
        const content = this.state.presenting_student && this.state.presenting_student.id ? <div>
            <Iframe
                width={'100%'}
                height={'500px'}
                url={this.state.presenting_student.url}
            />
            { !this.state.student &&
                <div>
                    <input type="text" placeholder={'name'} onChange={e => this.setState({name: e.target.value})}/>
                    <button onClick={this.setUser}>Submit</button>
                </div>
            }
            { this.state.student &&
                <div>
                    <p>Your name: {this.state.student.name}</p>
                    <p>show score based on state.student.name and presenting_student.id -
                        {this.state.student.name} & {this.state.presenting_student.id}</p>
                </div>
            }
        </div> : <div>
            <p>No presentation.</p>
        </div>

        return (
            <Fragment>
                {content}
            </Fragment>
        )
    }
}

export default ScoringPage