import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UsersService } from './users.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully!',
    data: result,
  });
});

export const UsersController = {
  getAllUsers,
};
