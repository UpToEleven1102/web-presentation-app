import React, {Fragment} from 'react'
import Modal from 'react-modal'
import Iframe from "react-iframe";

import {XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries} from 'react-vis'
import {curveCatmullRom} from 'd3-shape'
import {getStudents, postPresentingStudent} from "../../services/students";
import './presentation.css';
import LoginPage from "../signin/signin";
import {getAvgScoreByPresenterID} from "../../services/score";

class PresentationPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUrl: 'www.google.com',
            students: [],
            student: null,
            nextStudent: 0,
            modalOpen: false,
            countdown: 0,
            data: null
        }
    }

    presentLength = 120;

    criteria = [
        {
            name: 'criteria_1',
            title: 'Usability',
            values: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        {
            name: 'criteria_2',
            title: 'Visual Appealing',
            values: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        {
            name: 'criteria_3',
            title: 'Interactivity',
            values: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        {
            name: 'criteria_4',
            title: 'Effort',
            values: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        {
            name: 'criteria_5',
            title: 'Creativity',
            values: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
    ]

    componentWillUnmount() {
        console.log("clearInterval(this.timerID) at componentWillUnmount")
        this.setState({modalOpen: false, student: null})
        postPresentingStudent({})
        clearInterval(this.timerID);
        clearInterval(this.interval);
    }

    async getScores () {
        const score = await getAvgScoreByPresenterID(this.state.student.id)

        console.log('score ', score)

        await this.setState({
            student: {...this.state.student, score: score},
            students: this.state.students.map(student => {
                if (student.id === score.presenter_id) {
                    student.score = score
                }
                return student
            })
        })

        if (score) {
            const keys = Object.keys(score).filter(d => d.indexOf("criteria") >= 0);

            let data = keys.map((d,i) => {
                return {
                    x: i,
                    y: score[d]
                }
            })

            await this.setState({data});
        } else {
            this.setState({data:null})
        }
    }

    async startHere(index) {
        let idx = index - 1;

        // get from backend
        await this.changeURL(idx)
        idx++;

        this.interval = setInterval(async () => {
            await this.changeURL(idx);
            idx++;
        }, this.presentLength*1000)

        this.timerID = setInterval(
            () => {
                console.log("timerID: ", this.timerID);
                this.setState((prevState) => {
                    return { countdown: prevState.countdown - 1}
                });
                if (this.state.student) {
                    this.getScores()
                }
            },
            1000
        );
    }

    closeModal = () => {
        this.setState({modalOpen: false, student: null})
        postPresentingStudent({})
        clearInterval(this.interval)
        clearInterval(this.timerID)
        console.log("clearInterval(this.timerID) at closeModal")
    }

    changeURL = async (idx) => {
        await postPresentingStudent({});
        if (idx === this.state.students.length) {
            // reach end of list
            this.setState({
                modalOpen: false,
                student: null,
                currentUrl: '',
            })
            clearInterval(this.interval)
            clearInterval(this.timerID)
            console.log("clearInterval(this.timerID) at reachedLength")

            // alert('Done')
            return
        }

        this.setState({
            modalOpen: false,
            student: this.state.students[idx],
            currentUrl: this.state.students[idx].url,
            countdown: this.presentLength,
            nextStudent: this.state.students[idx + 1]
        })

        this.setState({
            modalOpen: true
        });

        if (idx !== this.state.students.length)
            await postPresentingStudent(this.state.students[idx])
    };

    render() {
        const content = !this.state.user ? <LoginPage
            success={async (user) => {
                this.setState({user})
                const students = await getStudents(); // get from back end
                await this.setState({students});
            }}
        /> :
        // return(
            <div>
                <div className="header m-3">
                    <h2 className={"display-4 pb-3"}>Presentation list</h2>
                    <table className="table table-striped table-hover">
                        <thead className="thead-grey">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">URL</th>
                            <th scope="col">Score</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>

                        {this.state.students.map(student => (
                            <tr key={student.id}>
                                <td scope="row">{student.id}</td>
                                <td>{student.name}</td>
                                <td><img alt={student.name} style={{height: 100}} src={student.image}/></td>
                                <td>{student.url}</td>
                                <td>{JSON.stringify(student.score)}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            return this.startHere(student.id)
                                        }}
                                    >
                                        Start
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Modal
                        isOpen={this.state.modalOpen}
                        ariaHideApp={false}
                    >
                        <div>
                            <table className={"table"}>
                                <tbody>
                                <tr>
                                    <td><h4>{this.state.student ? "Presenter: " + this.state.student.name : ""}</h4>
                                    </td>
                                    <td style={{width: "200px"}}>
                                        <div>
                                            <button
                                                onClick={this.closeModal}
                                                className={'float-right btn btn-danger btn-circle'}>
                                                <span style={{fontSize: "25px", padding: "0"}}>&times;</span></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td rowSpan={2}><Iframe
                                        url={this.state.currentUrl}
                                        width="100%"
                                        height='1000px'
                                    /></td>
                                    <td>
                                        <h1>{this.state.countdown > 0 ?
                                            ("Time left: \u00A0" + this.state.countdown + "\n secs") :
                                            "EXPRIRED"} </h1>
                                        {
                                            this.state.student && this.state.student.score ?
                                                <div>
                                                <XYPlot height={200} width={200}>
                                                    <HorizontalGridLines style={{stroke: '#B7E9ED'}}/>
                                                    <VerticalGridLines style={{stroke: '#B7E9ED'}}/>
                                                    <XAxis hideLine tickValues={[0, 1, 2, 3, 4]} tickLabelAngle={-90} tickFormat={v => this.criteria[v].title}/>

                                                    <YAxis hideTicks/>
                                                    <YAxis
                                                        // title="X Axis"
                                                        style={{
                                                            line: {stroke: '#ADDDE1'},
                                                            ticks: {stroke: '#ADDDE1'},
                                                            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                                                        }}
                                                    />
                                                    {/*<LineSeries*/}
                                                        {/*curve={curveCatmullRom.alpha(0.5)}*/}
                                                        {/*data={this.state.data}*/}
                                                    {/*/>*/}
                                                    <VerticalBarSeries data={this.state.data} />

                                                </XYPlot>
                                                </div>: <div>
                                                    <p>No scores recorded</p>
                                                </div>
                                        }

                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div>{this.state.nextStudent ? "Next: " + this.state.nextStudent.name : "Last student ‾\\_(ツ)_/‾\n"}</div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <div>

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