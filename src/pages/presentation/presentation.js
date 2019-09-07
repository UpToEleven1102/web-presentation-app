import React, {useState} from 'react'
import './presentation.css';
import Modal from 'react-modal'
import Iframe from './components/iframe'
import {getStudents} from "../../services/students";

class PresentationPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUrl: 'www.google.com',
            students: [],
            student: 0
        }
    }

    componentDidMount() {
        getStudents().then(students => {
            this.setState({students})
        })
        setInterval(() => {
            this.setState({currentUrl: this.state.currentUrl + Math.random()})
        }, 5000)
    }

    render() {
        return (
            <div>
                <div className="header">
                    <table>
                        <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">URL</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{JSON.stringify(this.state.students)}*/}
                        {this.state.students.map(student => (
                            <tr>
                                <th scope="row">{student.id}</th>
                                <td><img style={{height: 100}} src={student.image}/></td>
                                <td>{student.name}</td>
                                <td>{student.url}</td>
                                <td>{'Timer here'}</td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                    <Modal
                        isOpen={false}
                    >
                        <Iframe url={this.state.currentUrl}/>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default PresentationPage