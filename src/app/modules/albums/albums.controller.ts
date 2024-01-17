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

const getAllAlbum = catchAsync(async (req: Request, res: Response) => {
  const result = await AlbumService.getAllAlbum();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Albums fetched successfully!',
    data: result,
  });
});

const getSingleAlbum = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AlbumService.getSingleAlbum(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Album fetched successfully!',
    data: result,
  });
});

const updateAlbum = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const dataToUpdate = req.body;
  const result = await AlbumService.updateAlbum(id, dataToUpdate);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Album updated successfully!',
    data: result,
  });
});

const deleteAlbum = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AlbumService.deleteAlbum(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Album deleted successfully!',
    data: result,
  });
});


export const AlbumsController = {
  createAlbum,
  getAllAlbum,
  getSingleAlbum,
  updateAlbum,
  deleteAlbum,
};
