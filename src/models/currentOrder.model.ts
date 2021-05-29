import db from "../dbconnect";

class currentOrder {
  static async getCurrent(): Promise<number> {
    return new Promise((resolve, reject) => {
      db.execute(
        `SELECT current FROM currentOrder WHERE id = 1`,
        (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(JSON.stringify(results))[0].current);
          }
        }
      );
    });
  }

  static async shift(position: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      db.execute(
        `UPDATE currentOrder SET current = ${position}`,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  }
}

export default currentOrder;
