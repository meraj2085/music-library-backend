import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AlbumService } from './albums.service';

const createAlbum = catchAsync(async (req: Request, res: Response) => {
  const albumData = req.body;
  const userId = req?.user?.userId;
  const result = await AlbumService.createAlbum(albumData, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Album created successfully',
    data: result,
  });
});

export const AlbumsController = {
  createAlbum,
};
