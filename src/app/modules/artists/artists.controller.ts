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

const getSingleArtist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ArtistsService.getSingleArtist(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Artist fetched successfully!',
    data: result,
  });
});

const updateArtist = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const dataToUpdate = req.body;
  const result = await ArtistsService.updateArtist(userId, dataToUpdate);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Artist updated successfully!',
    data: result,
  });
});

export const ArtistsController = {
  getAllArtists,
  getSingleArtist,
  updateArtist,
};
