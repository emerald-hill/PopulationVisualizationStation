  const Pool = require('pg').Pool;

  // Create a new Pool instance with your database connection details
 //connect to database
const pool = new Pool({
    host:"populationvisualizationstationdb.clq8q6eicmkd.us-east-1.rds.amazonaws.com",
    user:"postgres",
    database: "populationvisualizationstationdb",
    password:"12345678UNCc!",
    port: 5432

});
  
// open the PostgreSQL connection
pool.connect((err, client, done) => {
    if (err) throw err;
  
    client.query("SELECT * FROM category", (err, res) => {
      done();
  
      if (err) {
        console.log(err.stack);
      } else {
        const jsonData = JSON.parse(JSON.stringify(res.rows));
        console.log("jsonData", jsonData);
  
        // TODO: export to CSV file
      }
    });
  });