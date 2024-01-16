import DB from '../server';

export const isUserExist = async function (email: string) {
  return await DB.query(`SELECT * FROM artists WHERE email = '${email}'`).then(
    res => {
      return res.rows[0];
    }
  );
};
