const express = require('express');
const router = express.Router();
const { Client } = require('pg')
const client = new Client()

/* GET users listing. */
router.get('/', async function(req, res, next) {
  await client.connect()

  const pgres = await client.query(
    'SELECT * FROM employees LEFT OUTER JOIN companies ON employees.company_id = companies.id;'
  )
  await client.end()
  res.send(`<pre>${JSON.stringify(pgres.rows, null, 4)}</pre>`);
});

module.exports = router;
