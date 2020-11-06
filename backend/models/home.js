const db = require('../util/database');
module.exports = class Home {
  static fetchbyrole() {
    return db.execute('SELECT * FROM user_mst where role="2"');
  }
};
