import DB from '../../../server';
import { IArtists } from './artists.interface';

const getAllArtists = async () => {
  const query = `Select * from artists`;
  const result = DB.query(query).then(res => {
    return res.rows;
  });
  return result;
};

const getSingleArtist = async (id: string) => {
  const query = `Select * from artists where id = ${id}`;
  const result = DB.query(query).then(res => {
    return res.rows;
  });

  return result;
};

const updateArtist = async (id: string, dataToUpdate: Partial<IArtists>) => {
  const columns = Object.keys(dataToUpdate);
  const values = Object.values(dataToUpdate);

  const setClause = columns
    .map((col, index) => `${col} = $${index + 1}`)
    .join(', ');

  const query = `UPDATE artists SET ${setClause} WHERE id = $${
    columns.length + 1
  } RETURNING *`;

  const result = await DB.query(query, [...values, id]);
  return result.rows;
};

export const ArtistsService = {
  getAllArtists,
  getSingleArtist,
  updateArtist,
};
