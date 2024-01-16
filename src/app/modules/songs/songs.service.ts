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
  let { title, first_name } = query;

  title = title || '%';
  first_name = first_name || '%';

  const queryStr = `
      SELECT songs.id, songs.title, songs.duration, albums.title AS album, artists.first_name AS artist
      FROM songs
      INNER JOIN albums ON songs.album_id = albums.id
      INNER JOIN artists ON songs.artist_id = artists.id
      WHERE songs.title LIKE $1
      AND artists.first_name LIKE $2;
    `;

  const values = [title, first_name];
  const response = await DB.query(queryStr, values);

  return response.rows;
};

export const SongsService = {
  createSong,
  getSongs,
};
