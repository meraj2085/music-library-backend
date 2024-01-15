import DB from '../../../server';

const getAllUsers = async () => {
  const query = `Select * from users`;
  const result = DB.query(query).then(res => {
    return res.rows;
  });
  return result;
};

export const UsersService = {
  getAllUsers,
};
