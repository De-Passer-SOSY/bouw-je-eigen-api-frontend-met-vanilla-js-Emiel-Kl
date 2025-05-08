const knex = require('knex')
const db = knex({
    client: 'mysql2',
    connection: {
        host: 'web0164.zxcs.be',
        user: 'adb_emiel',
        password: '3RsT8bs8DtsVfYV3p29Q',
        database: 'adb_project_emiel'
    }
})

module.exports = db