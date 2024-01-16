import DB from '../../../server';
import { ISongs } from './songs.interface';

const createSong = async (songData: ISongs) => {
  const { title, duration, album_id } = songData;

  const query = `
      INSERT INTO songs (title, duration, album_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

  const values = [title, duration, album_id];
  const result = await DB.query(query, values);
  const newSong = result.rows[0];

  return newSong;
};

export const SongsService = {
  createSong,
};
