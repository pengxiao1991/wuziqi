import BaseModel = require('./BaseModel');

class User extends BaseModel  {
    constructor() {
        super();
    }
    // 注册
    public register (name,pass) {
        return this.add('user',['user_name','user_pass'],[this.valueToStr(name),this.valueToStr(pass)]);
    }

    // 登录
    public login (name,pass) {
        return this.handlerSQL(`SELECT user_id,user_name FROM ${process.env.DB_Name}.user WHERE user_name = '${name}' AND user_pass = '${pass}'`);

    }
    // 查询用户信息
    public getUserInfo (user_id) {
        return this.handlerSQL(`SELECT user_id,user_name,user_integral FROM ${process.env.DB_Name}.user WHERE user_id = ${user_id}`);

    }
    

}

export = new User();