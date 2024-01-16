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

export const AlbumService = {
  createAlbum,
};
