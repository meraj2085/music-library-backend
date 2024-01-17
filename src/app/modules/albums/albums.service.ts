import DB from '../../../server';
import { IAlbums } from './albums.interface';

const createAlbum = async (albumData: IAlbums, artistId: number) => {
  try {
    await DB.query('BEGIN');

    // Insert into the albums table
    const albumQuery = `
      INSERT INTO albums (title, release_year, genre)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const albumValues = [
      albumData.title,
      albumData.release_year,
      albumData.genre,
    ];

    const albumResult = await DB.query(albumQuery, albumValues);
    const albumId = albumResult.rows[0].id;

    // Insert into the album_artists table
    const albumArtistsQuery = `
      INSERT INTO album_artists (artist_id, album_id)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const albumArtistsValues = [artistId, albumId];
    const albumArtistsResponse = await DB.query(
      albumArtistsQuery,
      albumArtistsValues
    );

    await DB.query('COMMIT');

    const response = {
      album: albumResult.rows[0],
      albumArtists: albumArtistsResponse.rows[0],
    };

    return response;
  } catch (error) {
    await DB.query('ROLLBACK');
    console.error('Error creating album:', error);
    return { success: false, message: 'Error creating album.' };
  }
};

const getAllAlbum = async () => {
  const query = `Select * from albums`;
  const result = DB.query(query).then(res => {
    return res.rows;
  });
  return result;
};

const getSingleAlbum = async (id: string) => {
  const query = `Select * from albums where id = ${id}`;
  const result = DB.query(query).then(res => {
    return res.rows;
  });

  return result;
};

const updateAlbum = async (id: string, dataToUpdate: Partial<IAlbums>) => {
  const columns = Object.keys(dataToUpdate);
  const values = Object.values(dataToUpdate);

  const setClause = columns
    .map((col, index) => `${col} = $${index + 1}`)
    .join(', ');

  const query = `UPDATE albums SET ${setClause} WHERE id = $${
    columns.length + 1
  } RETURNING *`;

  const result = await DB.query(query, [...values, id]);
  return result.rows[0];
};

const deleteAlbum = async (id: string) => {
  try {
    await DB.query('BEGIN');

    // Delete from the album_artists table
    const albumArtistsQuery = `
      DELETE FROM album_artists
      WHERE album_id = $1
      RETURNING *;
    `;
    const albumArtistsValues = [id];
    const deleteAlbumArtistResponse = await DB.query(
      albumArtistsQuery,
      albumArtistsValues
    );

    // Delete from the songs table
    const songsQuery = `
      DELETE FROM songs
      WHERE album_id = $1
      RETURNING *;
    `;
    const songsValues = [id];
    const deleteSongResponse = await DB.query(songsQuery, songsValues);

    // Delete from the albums table
    const albumQuery = `
      DELETE FROM albums
      WHERE id = $1
      RETURNING *;
    `;
    const albumValues = [id];
    const albumDeleteResponse = await DB.query(albumQuery, albumValues);

    await DB.query('COMMIT');

    const response = {
      albumArtists: deleteAlbumArtistResponse.rows[0],
      songs: deleteSongResponse.rows[0],
      album: albumDeleteResponse.rows[0],
    };

    return response;
  } catch (error) {
    await DB.query('ROLLBACK');
    console.error('Error deleting album:', error);
    return { success: false, message: 'Error deleting album.' };
  }
};

export const AlbumService = {
  createAlbum,
  getAllAlbum,
  getSingleAlbum,
  updateAlbum,
  deleteAlbum,
};
