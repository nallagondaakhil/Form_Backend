var sql = require("mssql");
var connect = function () {
    var conn = new sql.ConnectionPool({
        user: 'sa',
        password: '1234',
        server: '192.168.0.2\\akhil',
        database: 'DB1'
    });

    return conn;
}
module.exports = connect;