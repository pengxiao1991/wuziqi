"use strict";
// TypeScript file
const mysql = require('mysql');
// const POOL = mysql.createPool({
//   host:'localhost',
//   user:'root',
//   password:'root',
//   database:'blog',
// });
class BaseModel {
    constructor() {
    }
    handlerSQL(sql, values) {
        return new Promise((resolve, reject) => {
            // POOL.getConnection(function(err, connection) {
            //     if (err) {
            //     reject( err )
            //     } else {
            //     connection.query(sql, values, ( err, data) => {
            //         if ( err ) {
            //         reject( err )
            //         } else {
            //         resolve( data )
            //         }
            //         connection.release()
            //     })
            //     }
            // })
        });
    }
}
module.exports = BaseModel;
//# sourceMappingURL=BaseModel.js.map