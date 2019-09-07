import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getStudents, postStudent} from '../../services/students'
import Modal from 'react-modal'
import './add-student.css'

class AddStudentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            name: '',
            url: '',
            modalOpen: false,
            student: null
        }
    }

    reset() {
        getStudents().then(students => {
            this.setState({students})
        })
        this.setState({name: '', url: ''})
    }

    componentDidMount() {
        this.reset()
    }

    submitData = async () => {
        const res = await postStudent({
            name: this.state.name,
            url: this.state.url
        });
        this.reset()
    }

    editStudent = (student) => {
        this.setState({modalOpen: true, student: student})
    }

    render() {
        return (<div>
            <div className="header">
                <h1>Add Student Info</h1>

                <div className="field">
                    <label htmlFor='name'>Name: </label>
                    <input id='name' name='name' value={this.state.name} type="text" onChange={e => this.setState({name: e.target.value})}/>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    <label htmlFor="url">URL: </label>
                    <input id='url' name='url' value={this.state.url} type="text" onChange={e => this.setState({url: e.target.value})}/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button type='submit' onClick={this.submitData}>Submit</button>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">URL</th>
                        <th scope="col">Action</th>
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
                            <td><button onClick={() => this.editStudent(student)} type={'button'} className={'btn' +
                            ' btn-success'}>Edit</button></td>
                        </tr>
                    ))}
                    </tbody>

                </table>
                <Modal
                    isOpen={this.state.modalOpen}
                >
                    <p>{JSON.stringify(this.state.student)}</p>
                    <button onClick={() => this.setState({modalOpen: false})}>Cancel</button>
                    <button >Submit</button>
                </Modal>
            </div>
        </div>)
    }


}

export default AddStudentPage
