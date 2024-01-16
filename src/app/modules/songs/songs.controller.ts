import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SongsService } from './songs.service';

const createSong = catchAsync(async (req: Request, res: Response) => {
  const songData = req.body;
  const result = await SongsService.createSong(songData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Song created successfully',
    data: result,
  });
});

export const SongsController = {
  createSong,
};
