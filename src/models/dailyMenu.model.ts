import db from "../dbconnect";

class dailyMenu {
  static async getMenu(position: number): Promise<string> {
    return new Promise((resolve, reject) => {
      db.execute(
        `SELECT breakfast, lunch, dinner FROM dailyMenus WHERE position = ${position}`,
        (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.stringify(results));
          }
        }
      );
    });
  }

  static async getMax(): Promise<number> {
    return new Promise((resolve, reject) => {
      db.execute(
        `SELECT MAX(position) FROM dailyMenus`,
        (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(JSON.stringify(results))[0]["MAX(position)"]);
          }
        }
      );
    });
  }
}

export default dailyMenu;
