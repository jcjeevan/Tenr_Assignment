const db = require('../util/database');
module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static find(email) {
    return db.execute('SELECT * FROM user_mst WHERE email = ?', [email]);
  }

  static findbyid(user_id) {
    return db.execute('SELECT * FROM user_mst WHERE id = ?', [user_id]);
  }

  static findAll() {
    return db.execute('SELECT * FROM user_mst');
  }

  static save(user) {
    return db.execute(
      'INSERT INTO user_mst (name, email, password,role) VALUES (?, ?, ?,?)',
      [user.name, user.email, user.password,user.role]
    );
  }
};
