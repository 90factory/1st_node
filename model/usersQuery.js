const db = require("./mysql");

module.exports = class users {
    constructor() {}
    //가입, 로그인
    static singUp(email,password,area,age,sex,nickname){
        const insert = 'INSERT INTO test123.users(Email,Password,Nickname,Sex,Age,Area) VALUES(?,?,?,?,?,?)'; 
        const values = [String(email),String(password),String(nickname),String(sex),String(age),String(area)];
        return db.execute(insert,values);
    }
    
    static findUserInfo(email) {
        const find = 'SELECT Nickname,Sex,Age,Area,Password FROM test123.users WHERE Email in (?)'
        const values = [String(email)];
        return db.execute(find,values);
    }

    static findInfo(emailList) {

        var email = new Array(emailList.length).fill('?').join(',');
        const find =`SELECT Sex,Age,Area FROM test123.users WHERE Email IN (${email})`
        const values = emailList
        return db.execute(find,values);
    }

    static singUpAdd(area,age,sex,nickname,email){
        const insert =  'UPDATE test123.users SET Area=?,Age=?,Sex=?,nickname=? WHERE Email in (?)'; 
        const values = [String(area),String(age),String(sex),String(nickname),String(email)];
        db.execute(insert,values);
    }
    
    static searchEmail(){
        const find =  'SELECT Email FROM test123.users';
        return db.execute(find);
    }
    static searchOneEmail (email) {
        const find = 'SELECT (?) FROM test123.users'
        const value = [String(email)]
        return db.execute(find,value)
    }

    static searchPassword(email){
        const insert = "SELECT Password FROM test123.users WHERE Email in (?)";
        const value = [String(email)];
        return db.execute(insert,value);
    }

    static updateUserInfo(email,area,nickname,sex,age){
      const update = "UPDATE test123.users SET Area=?, Nickname=?, Sex=?, Age=? WHERE Email in (?)"
      const values = [area,nickname,sex,age,email];
      //db.execute(update,values)
      return db.execute(update,values)
    }
    static updatePassword(password,email){
        const update = 'UPDATE test123.users SET Password = ? WHERE Email in (?)';
        const values = [String(password),String(email)];
        //db.execute(update,values); 
        return db.execute(update,values);
    }

    static deleteUser(email){
        const insert = 'DELETE FROM test123.users WHERE Email in (?)';
        const values = [String(email)];
        db.execute(insert,values); 
    }

    static addHistory(email,petitionID){
        const insert = 'INSERT INTO test123.history(HistoryID,Email,DocumentID,ReadingPageTime) VALUES(?,?,?,NOW())'
        const values = [null,String(email),Number(petitionID)]
        return db.execute(insert,values);
    }

    static findHistory(email) {
        const find = 'SELECT Email,DocumentID,HistoryID FROM test123.history WHERE Email in (?)'
        const values = [String(email)];
        return db.execute(find,values);
    }

    static postRecommend(email,petitionID) {
        const insert = 'INSERT INTO test123.history(HistoryID,Email,DocumentID,ReadingPageTime,VotingStatus) VALUES(?,?,?,NOW(),?)'
        const values = [null,String(email),Number(petitionID),Number(1)]
        return db.execute(insert,values);
    }
    
    static getRecommend(petitionID) {
        const find = 'SELECT Email,VotingStatus FROM test123.history WHERE DocumentID in (?)'
        const values = [Number(petitionID)]
        return db.execute(find,values);
    }
}