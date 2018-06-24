"use strict";
// TypeScript file
const mysql = require('mysql');
const POOL = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_Name,
});
class BaseModel {
    constructor() {
    }
    handlerSQL(sql) {
        return new Promise((resolve, reject) => {
            POOL.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    connection.query(sql, (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(data);
                        }
                        connection.release();
                    });
                }
            });
        });
    }
    add(table, keyArr, valueArr) {
        return this.handlerSQL(`INSERT INTO ${process.env.DB_Name}.${table} (${keyArr.toString()}) VALUES (${valueArr.toString()})`);
    }
    delete(table, key, value) {
        return this.handlerSQL(`DELETE FROME ${process.env.DB_Name}.${table} WHERE ${key} = ${value}`);
    }
    update(table, key, value, whereKey, whereValue) {
        return this.handlerSQL(`UPDATE ${process.env.DB_Name}.${table} SET ${key} =  ${value} WHERE ${whereKey} = ${whereValue}`);
    }
    search(table, key, whereKey, whereValue) {
        return this.handlerSQL(`SELECT ${key} FROM ${process.env.DB_Name}.${table} WHERE ${whereKey} = ${whereValue}`);
    }
}
module.exports = BaseModel;
//# sourceMappingURL=BaseModel.js.map