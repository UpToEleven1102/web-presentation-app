import React, {Fragment} from 'react'
import Iframe from "react-iframe";
import {getPresentingStudent, getStudents} from "../../services/students";
import {postScore} from "../../services/score";

class ScoringPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            presenting_student: null,
            id: '',
            score: {},
            comment: '',
        }
    }

    criteria = [
        {
            name: 'criteria_1',
            title: '1. Usability',
            values: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        {
            name: 'criteria_2',
            title: '2. Visual Appealing',
            values: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        {
            name: 'criteria_3',
            title: '3. Interactivity',
            values: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        {
            name: 'criteria_4',
            title: '4. Effort',
            values: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        {
            name: 'criteria_5',
            title: '5. Creativity',
            values: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
    ]

    async componentDidMount() {
        const students = await getStudents()
        await this.setState({students: students})
        await this.getPresentingStudent()
        this.interval = setInterval(this.getPresentingStudent, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getPresentingStudent = async () => {
        const presenting_student = await getPresentingStudent()
        await this.setState({presenting_student: presenting_student})
        console.log(this.state.presenting_student)
    }

    setUser = async () => {
        if (this.state.id.length === 0 || parseInt(this.state.id) < 1 || parseInt(this.state.id) > 81) {
            alert('Wrong ID')
        } else {
            for (let c of this.criteria) {
                if (!this.state.score[c.name]) {
                    alert(c.name + ' missing')
                    return
                }
            }

            const payload = {
                user_id: (this.state.id),
                presenter_id: this.state.presenting_student.id,
                comment: this.state.comment,
                ...this.state.score
            }
            console.log(JSON.stringify(payload));
            const res = await postScore(payload)
            alert('Submited score for ' + this.state.presenting_student.name)
        }
    }

    render() {
        const content = (this.state.presenting_student && this.state.presenting_student.id) ?
            <div className={"container"}>
                <h3 className={"row"}>{"Current presenter: " + this.state.presenting_student.name}</h3>
                <div className={"row"}>
                    <Iframe
                        width={'100%'}
                        height={'500px'}
                        url={this.state.presenting_student.url}
                    />
                </div>
                <div className={"row mt-2"}>
                    <div>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-10 col-form-label">Your ID</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control"
                                       value={this.state.id}
                                       id="colFormLabel"
                                       placeholder="ID"
                                       onChange={e => this.setState({id: e.target.value})}
                                       required/>
                            </div>
                        </div>
                        {/*checkboxes*/}
                        <fieldset className="form-group">
                            {this.criteria.map(c => <div key={c.name} className="row mt-4">
                                <legend className="col-form-label col-lg-10 pt-0">{c.title}</legend>
                                <div className="col-sm-12">
                                    {c.values.map(v => <div key={v} className="form-check form-check-inline mr-4">
                                        <input className="form-check-input"
                                               type="radio" name={c.name}
                                               id={c.name+v} value={v}
                                               style={{padding: '1rem'}}
                                               onChange={() => {
                                                   this.setState({score: {...this.state.score, [c.name]: v}})
                                        }}/>
                                        <label className="form-check-label" htmlFor={c.name+v}>{v}</label>
                                    </div>)}
                                </div>
                            </div>)}
                        </fieldset>
                        <div className="form-group row mt-2">
                            <label htmlFor="colFormLabel" className="col-sm-10 col-form-label">Comment (optional)</label>
                            <div className="col-sm-10">
                                <textarea
                                    className="form-control"
                                    value={this.state.comment}
                                    id="formControlTextarea"
                                    rows="3"
                                    onChange={e => this.setState({comment: e.target.value})}
                                />
                            </div>
                        </div>
                        <button className="btn btn-success" style={{marginBottom: "50px"}}
                                onClick={this.setUser}>Submit
                        </button>
                    </div>
                </div>
            </div> :
            <div>
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