import db from "../dbconnect";

class meal {
  static async getMeal(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      db.execute(
        `SELECT * FROM meals WHERE id = ${id}`,
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
}

export default meal;
