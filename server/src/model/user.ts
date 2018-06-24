import BaseModel = require('./BaseModel');

class User extends BaseModel  {
    constructor() {
        super();
    }
    // 注册
    public register (name,pass) {
        return this.add('user',['user_name','user_pass'],[name,pass]);
    }

    // 登录
    public login (name,pass) {
        return this.handlerSQL(`SELECT user_name,user_id FROM ${process.env.DB_Name}.user WHERE user_name = ${name} AND user_pass = ${pass}`);

    }

}

export = new User();