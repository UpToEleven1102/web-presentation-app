import config from '../config'

const uri = config.uri;

function getData(url) {
    return fetch(url).then(res => {
        const contentType = res.headers.get('content-type')
        return contentType && contentType.indexOf('json') ? res.json() : res
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

function getStudents() {
    return getData(`${uri}/students`)
}

function getPresentingStudent() {
    return getData(`${uri}/students/presenting`)
}

function postPresentingStudent(student) {
    return postData(`${uri}/students/presenting`, student)
}

function postStudent(student) {
    return postData(`${uri}/students`, student)
}

export {
    getStudents,
    postStudent,
    getPresentingStudent,
    postPresentingStudent
}