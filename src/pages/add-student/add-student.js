import React, {Component, useEffect, useState} from 'react'
import {getStudents, postStudent} from '../../services/students'
import './add-student.css'

const AddStudentPage = () => {
    const [students, setStudents] = useState(null)
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        getStudents().then(students => {
            setStudents(students)
        })
    });

    const submitData = async () => {
        const res = await postStudent({
            name,
            url
        });
        console.log(res)
    }

    return (<div>
        <div className="header">
            <h1>Add Student Info</h1>

            <div className="field">
                <label htmlFor='name'>Name: </label>
                <input id='name' name='name' type="text" onChange={e => setName(e.target.value)}/>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

                <label htmlFor="url">URL: </label>
                <input id='url' name='url' type="text" onChange={e => setUrl(e.target.value)}/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <button type='submit' onClick={submitData}>Submit</button>
            </div>

            <p>
                {JSON.stringify(students)}
            </p>
        </div>
    </div>)
}

export default AddStudentPage
