import React, {Fragment} from 'react'
import Iframe from "react-iframe";
import {getPresentingStudent, getStudents} from "../../services/students";

class ScoringPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            presenting_student: null,
            name: '',
            student: {}
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

    setUser = (e) => {
        e.preventDefault()
        if (!this.state.student.name) {
            if (this.state.students.filter(student => student.name === this.state.name).length > 0) {
                this.setState({student: {name: this.state.name}})
                return
            } else {
                alert("Wrong name")
            }
        }

        alert(`Submit ${this.state.student.name} to server`)
        // submit scores here
    }

    render() {
        const content = this.state.presenting_student && this.state.presenting_student.id ?
            <div className={"container"}>
                <h3 className={"row"}>{"Current presenter: " + this.state.presenting_student.name}</h3>
                <div className={"row"}>
                    <Iframe
                        width={'100%'}
                        height={'500px'}
                        url={this.state.presenting_student.url}
                    />
                </div>
                <div className={"row"} style={{marginTop: "30px"}}>
                    {/*<input type="text" placeholder={'name'}*/}
                    {/*onChange={e => this.setState({name: e.target.value})}/>*/}
                    {/*<button onClick={this.setUser}>Submit</button>*/}
                    <form>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-10 col-form-label">Full name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                       id="colFormLabel"
                                       placeholder="Full name"
                                       onChange={e => this.setState({name: e.target.value})}
                                       disabled={!!this.state.student.name}
                                       required/>
                            </div>
                        </div>
                        {/*checkboxes*/}
                        {
                            this.state.student.name &&
                            <fieldset className="form-group">
                                <div className="row" style={{marginTop: "30px"}}>
                                    <legend className="col-form-label col-lg-10 pt-0">Functionality</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_1"
                                                   id="inlineRadio1" value="option1"/>
                                            <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_1"
                                                   id="inlineRadio2" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_1"
                                                   id="inlineRadio3" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_1"
                                                   id="inlineRadio4" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio4">4</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_1"
                                                   id="inlineRadio5" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio5">5</label>
                                        </div>

                                    </div>
                                </div>
                                {/* ---------- 2 ------------ */}
                                <div className="row" style={{marginTop: "30px"}}>
                                    <legend className="col-form-label col-lg-10 pt-0">User friendly</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_2"
                                                   id="inlineRadio1" value="option1"/>
                                            <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_2"
                                                   id="inlineRadio2" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_2"
                                                   id="inlineRadio3" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_2"
                                                   id="inlineRadio4" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio4">4</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_2"
                                                   id="inlineRadio5" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio5">5</label>
                                        </div>

                                    </div>
                                </div>
                                {/* ---------- 3 ------------ */}
                                <div className="row" style={{marginTop: "30px"}}>
                                    <legend className="col-form-label col-lg-10 pt-0">Visual appealing</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_3"
                                                   id="inlineRadio1" value="option1"/>
                                            <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_3"
                                                   id="inlineRadio2" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_3"
                                                   id="inlineRadio2" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">3</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_3"
                                                   id="inlineRadio2" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">4</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="criteria_3"
                                                   id="inlineRadio2" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">5</label>
                                        </div>

                                    </div>
                                </div>


                            </fieldset>
                        }
                        <button className="btn btn-success" style={{marginBottom: "50px"}}
                                onClick={this.setUser}>Submit
                        </button>
                    </form>
                </div>
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