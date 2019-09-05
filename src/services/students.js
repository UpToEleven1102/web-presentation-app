const uri = "http://localhost:3000"

function getData(url) {
    return fetch(url).then(res => res.json())
}

function postData(url, data) {
    console.log('hitting url ', url)
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

function postStudent(student) {
    return postData(`${uri}/students`, student)
}

export {
    getStudents,
    postStudent
}