import config from '../config'

const uri = config.uri;

function getData(url) {
    return fetch(url).then(res => {
        const contentType = res.headers.get('content-type')
        return contentType && contentType.indexOf('json') ? res.json() : res.text()
    })
}

function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res)
}

function putData(url, data) {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res)
}

function getStudents() {
    return getData(`${uri}/students`)
}

function postStudent(student) {
    return postData(`${uri}/students`, student)
}

function editStudent(student) {
    return putData(`${uri}/students/${student.id}`, student)
}

function getPresentingStudent() {
    return getData(`${uri}/students/presenting`)
}

function postPresentingStudent(student) {
    return postData(`${uri}/students/presenting`, student)
}

export {
    postData,
    getData,
    getStudents,
    postStudent,
    editStudent,
    getPresentingStudent,
    postPresentingStudent
}