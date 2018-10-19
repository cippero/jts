const fetch = require('node-fetch');

// const datas = ['people', 'planets', 'starships'];

const getPeople = (fetch) => {
    // const info = datas[Math.floor(datas.length * Math.random())];
    // return fetch(`https://swapi.co/api/${info}`)
    return fetch('https://swapi.co/api/people')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            return {
                count: data.count,
                results: data.results
            }
        })
}

const getPeopleAsync = async (fetch) => {
    const response = await fetch('https://swapi.co/api/people');
    const data = await response.json();
    // console.log(data);
    return {
        count: data.count,
        results: data.results
    }
}

// getPeople(fetch).then(result => console.log(result));
// getPeopleAsync(fetch).then(result => console.log(result));

module.exports = {
    getPeople,
    getPeopleAsync
}