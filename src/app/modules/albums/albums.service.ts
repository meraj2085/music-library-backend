import DB from '../../../server';
import { IAlbums } from './albums.interface';

const createAlbum = async (albumData: IAlbums, artistId: number) => {
  try {
    // Insert into the albums table
    const albumQuery = `
      INSERT INTO albums (title, release_year, genre)
      VALUES ($1, $2, $3)
      RETURNING id;
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
      VALUES ($1, $2);
    `;

    const albumArtistsValues = [artistId, albumId];
    await DB.query(albumArtistsQuery, albumArtistsValues);

    return { success: true, message: 'Album created successfully.' };
  } catch (error) {
    console.error('Error creating album:', error);
    return { success: false, message: 'Error creating album.' };
  }
};

export const AlbumService = {
  createAlbum,
};
