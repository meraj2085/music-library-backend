import DB from '../../../server';

const getAllArtists = async () => {
  const query = `Select * from artists`;
  const result = DB.query(query).then(res => {
    return res.rows;
  });
  return result;
};

export const ArtistsService = {
  getAllArtists,
};
