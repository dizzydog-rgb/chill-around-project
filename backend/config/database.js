var mysql  = require('mysql');

exports.exec = (sql,data,callback) => {
    const connection = mysql.createConnection({
        host:'localhost',
        user:'user',
        password:'123456',
        database:'chill_around',
        multipleStatements: true,
    });
    connection.connect();

    connection.query(sql,data,function(error,results,fields){
        if(error) {
            console.log(error)
        };
        callback(results, fields);
    })
    connection.end();
}