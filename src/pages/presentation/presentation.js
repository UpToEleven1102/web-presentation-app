import React, {Fragment} from 'react'
import Modal from 'react-modal'
import Iframe from "react-iframe";

import {XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines} from 'react-vis'
import {curveCatmullRom} from 'd3-shape'
import {getStudents, postPresentingStudent} from "../../services/students";
import './presentation.css';
import LoginPage from "../signin/signin";

class PresentationPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUrl: 'www.google.com',
            students: [],
            student: 0,
            modalOpen: false,
            countdown: 0,
        }
    }


    async componentDidMount() {
        const students = await getStudents(); // get from back end
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
        ];
        await this.setState({students, data});

        // get from backend
        let idx = 0;
        await this.changeURL(idx)
        idx++;

        this.interval = setInterval(async () => {
            await this.changeURL(idx)
            idx++
        }, 15000)

    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState((state) => ({
            countdown: state.countdown-1
        }));
    }
    changeURL = async (idx) => {
        this.timeOut = setTimeout(async () => {
            // open modal
            this.setState({
                modalOpen: true
            });
            if (idx !== this.state.students.length)
                await postPresentingStudent(this.state.students[idx])
        }, 5000);

        this.timerID = setInterval(
            () => {
                this.tick();
                if (this.state.countdown < 1){
                    clearInterval(this.timerID);
                }},
            1000
        );

        await postPresentingStudent({});

        if (idx === this.state.students.length) {
            // reach end of list
            this.setState({
                modalOpen: false,
                student: null,
                currentUrl: '',
            })
            clearTimeout(this.timeOut)
            clearInterval(this.interval)
            // alert('Done')
            return
        }
        this.setState({
            modalOpen: false,
            student: this.state.students[idx],
            currentUrl: this.state.students[idx].url,
            countdown: 10,
        })
    }

    render() {
        const content = !this.state.user ? <LoginPage
            success={(user) => this.setState({user})}
        /> : <div>
                <div className="header">
                    <button>Start</button>
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
                                    <p>{this.state.countdown ?
                                        ("Time left: " + this.state.countdown + "seconds") :
                                    "EXPRIRED"} </p>
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

        return (
            <Fragment>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {content}
                </div>
            </Fragment>

        )
    }
}

export default PresentationPage