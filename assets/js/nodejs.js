/*
    installation:
    https://nodejs.org/en/download
    choose 14.21.3 if possible, otherwise proceed normally
        if you didn't get 14.21.3, search your system for 'npm' or 'Node.js Command Prompt' and type 'npm install -g 14.21.3'
        this is all because of the Version Compatability section here: https://node-postgres.com/
    also within the node js command prompt, type 'npm install pg' for node.postgres
    link to documentation: https://nodejs.org/dist/v14.21.3/docs/api/
*/

import { Client } from 'C:/Users/Owen/node_modules'

async function selectFrom() //data, table, condition
{
    //const {Client} = require('pg')

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'emeraldhill',
        password: 'password',
        port: 5432,
    })

    await client.connect()

    let query = {
        name: 'testQuery',
        text: 'SELECT * FROM population',
        //values: [1],
    }

    console.log(await client.query(query))

    //console.log(await client.query(`SELECT ${*} FROM ${population}`))

    await client.end()
}

selectFrom()

/*
const {Client} = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'emeraldhill',
    password: 'password',
    port: 5432,
})

await client.connect()

console.log(await client.query(`SELECT ${*} FROM ${population}`))

await client.end()
*/