import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SongsService } from './songs.service';

const createSong = catchAsync(async (req: Request, res: Response) => {
  const songData = req.body;
  const userId = req?.user?.userId;
  const result = await SongsService.createSong(songData, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Song created successfully',
    data: result,
  });
});

const getSongs = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await SongsService.getSongs(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Songs fetched successfully',
    data: result,
  });
});

export const SongsController = {
  createSong,
  getSongs,
};
