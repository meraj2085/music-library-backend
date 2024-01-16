import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ArtistsService } from './artists.service';

const getAllArtists = catchAsync(async (req: Request, res: Response) => {
  const result = await ArtistsService.getAllArtists();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Artists fetched successfully!',
    data: result,
  });
});

export const ArtistsController = {
  getAllArtists,
};
