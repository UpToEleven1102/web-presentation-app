import React from 'react'
import Modal from 'react-modal'
import Iframe from "react-iframe";

import {XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines} from 'react-vis'
import {curveCatmullRom} from 'd3-shape'
import {getStudents} from "../../services/students";
import './presentation.css';

class PresentationPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUrl: 'www.google.com',
            students: [],
            student: 0,
            modalOpen: false
        }
    }

    async componentDidMount() {
        const students = await getStudents()
        const data = [
            {x: 0, y: 8},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 3, y: 9},
            {x: 4, y: 1},
            {x: 5, y: 7},
            {x: 6, y: 6},
            {x: 7, y: 3},
            {x: 8, y: 2},
            {x: 9, y: 0}
        ]
        await this.setState({students, data})

        // get from backend
        let idx = 0
        this.changeURL(idx)
        idx++
        this.interval = setInterval(() => {
            this.changeURL(idx)
            idx++
        }, 950000)
    }

    changeURL = (idx) => {
        this.timeOut = setTimeout(() => {
            this.setState({
                modalOpen: true
            })
        }, 5000)
        if (idx === this.state.students.length) {
            this.setState({
                modalOpen: false,
                student: null,
                currentUrl: ''
            })
            clearTimeout(this.timeOut)
            clearInterval(this.interval)
            alert('Done')
            return
        }
        this.setState({
            modalOpen: false,
            student: this.state.students[idx],
            currentUrl: this.state.students[idx].url
        })
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
                        {this.state.students.map(student => (
                            <tr key={student.id}>
                                <th scope="row">{student.id}</th>
                                <td><img alt={student.name} style={{height: 100}} src={student.image}/></td>
                                <td>{student.name}</td>
                                <td>{student.url}</td>
                                <td>{'Timer here'}</td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                    <Modal
                        isOpen={this.state.modalOpen}
                        ariaHideApp={false}
                    >
                        <div className={'row'} style={{height: '100%'}}>
                            <Iframe
                                url={this.state.currentUrl}
                                width="80%"
                                height='100%'
                            />
                            <div className={'col-sm side-bar'}>
                                <div>
                                    <button onClick={() => {
                                        this.setState({modalOpen: false})
                                        clearTimeout(this.timeOut)
                                        clearInterval(this.interval)
                                    }} className={'float-right'}>X</button>
                                </div>
                                <div>
                                    <p>Timer</p>
                                </div>
                                <div>
                                    <XYPlot height={200} width={250}>
                                        <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
                                        <VerticalGridLines style={{stroke: '#B7E9ED'}} />
                                        <XAxis
                                            title="X Axis"
                                            style={{
                                                line: {stroke: '#ADDDE1'},
                                                ticks: {stroke: '#ADDDE1'},
                                                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                                            }}
                                        />
                                        <LineSeries
                                            curve={curveCatmullRom.alpha(0.5)}
                                            data={this.state.data}
                                        />
                                    </XYPlot>
                                </div>
                            </div>
                        </div>


                    </Modal>
                </div>
            </div>
        )
    }
}

export default PresentationPage