import DB from '../../../server';
import { ISongs } from './songs.interface';

const createSong = async (songData: ISongs, userId: number) => {
  const { title, duration, album_id } = songData;

  const query = `
      INSERT INTO songs (title, duration, album_id, artist_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

  const values = [title, duration, album_id, userId];
  const result = await DB.query(query, values);
  const newSong = result.rows[0];

  return newSong;
};

const getSongs = async (query: any) => {
  let { name, title } = query;

  name = name || '%';
  title = title || '%';

  const queryStr = `
      SELECT songs.id, songs.title, songs.duration, albums.title AS album, 
      artists.first_name AS artist_first_name, artists.last_name AS artist_last_name
      FROM songs
      INNER JOIN albums ON songs.album_id = albums.id
      INNER JOIN artists ON songs.artist_id = artists.id
      WHERE (artists.first_name || ' ' || artists.last_name) ILIKE $1
      AND songs.title ILIKE $2;
    `;

  const values = [`%${name}%`, `%${title}%`];
  const response = await DB.query(queryStr, values);

  return response.rows;
};

const getSingleSong = async (id: string) => {
  const query = `SELECT * FROM songs WHERE id = $1;`;
  const values = [id];

  const response = await DB.query(query, values);
  const song = response.rows[0];

  return song;
};

const deleteSong = async (id: string) => {
  const query = `DELETE FROM songs WHERE id = $1 RETURNING *;`;
  const values = [id];

  const response = await DB.query(query, values);
  const song = response.rows[0];

  return song;
};

const updateSong = async (id: string, dataToUpdate: Partial<ISongs>) => {
  const columns = Object.keys(dataToUpdate);
  const values = Object.values(dataToUpdate);

  const setClause = columns
    .map((col, index) => `${col} = $${index + 1}`)
    .join(', ');

  const query = `UPDATE songs SET ${setClause} WHERE id = $${
    columns.length + 1
  } RETURNING *`;

  const result = await DB.query(query, [...values, id]);
  return result.rows;
};

export const SongsService = {
  createSong,
  getSongs,
  getSingleSong,
  updateSong,
  deleteSong,
};
