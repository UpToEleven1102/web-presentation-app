import React, {Component, Fragment} from 'react'
import Modal from 'react-modal'

import {getStudents, postStudent} from '../../services/students'
import LoginPage from '../signin/signin'
import './add-student.css'

class AddStudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            id: '',
            name: '',
            url: '',
            image: '',
            modalOpen: false,
            student: null,
            user: null
        }
    }

    reset() {
        getStudents().then(students => {
            this.setState({students})
        });
        this.setState({name: '', url: '', image: ''})
    }

    componentDidMount() {
        this.reset()
    }

    submitData = async () => {
        await postStudent({
            id: this.state.students.length+1,
            name: this.state.name,
            url: this.state.url || "https://en.wikipedia.org/wiki/Special:Random",
            image: this.state.image || "https://source.unsplash.com/random/" + (this.state.students.length + 1),
        });
        this.reset()
    }

    editStudent = (student) => {
        this.setState({modalOpen: true, student: student})
    };

    render() {
        const content = !this.state.user ? <LoginPage
            success={(user) => this.setState({user})}
        /> : <div>
            <div className="header">
                <h3>Add Student Info</h3>

                <div className="field">
                    <label htmlFor='name'>Name: </label>
                    <input id='name' name='name'
                           value={this.state.name} type="text"
                           onChange={e => this.setState({name: e.target.value})}/>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    <label htmlFor='image'>Image Link: </label>
                    <input id='image' name='image'
                           value={this.state.image}
                           type="text" onChange={e => this.setState({image: e.target.value})}/>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    <label htmlFor="url">URL: </label>
                    <input id='url' name='url'
                           value={this.state.url} type="text"
                           onChange={e => this.setState({url: e.target.value})}/>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button type='submit' onClick={this.submitData}>Submit</button>
                </div>

                <div>
                    <table className="table">
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
                        {this.state.students.map(student => (
                            <tr>
                                <th scope="row">{student.id}</th>
                                <td><img alt={student.name} style={{height: 100}} src={student.image}/></td>
                                <td>{student.name}</td>
                                <td>{student.url}</td>
                                <td><button onClick={() => this.editStudent(student)} type={'button'} className={'btn' +
                                ' btn-success'}>Edit</button></td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                </div>
                <Modal
                    isOpen={this.state.modalOpen}
                >
                    <p>{JSON.stringify(this.state.student)}</p>
                    <button onClick={() => this.setState({modalOpen: false})}>Cancel</button>
                    <button >Submit</button>
                </Modal>
            </div>
        </div>

        return (
            <Fragment>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {content}
                </div>
            </Fragment>
            )
    }


}

export default AddStudentPage
