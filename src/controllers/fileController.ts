// src/controllers/fileController.ts
import { Request, Response, NextFunction } from "express";
import * as fileService from "../services/fileService";

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded");
      return;
    }

    const { filename, path: filepath, mimetype } = req.file;
    const tags = req.body.tags ? req.body.tags.split(",") : [];

    const newFile = await fileService.uploadFile(
      filename,
      filepath,
      mimetype,
      tags
    );
    res.status(201).json(newFile);
  } catch (error) {
    next(error);
  }
};

export const getFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const files = await fileService.getFiles();
    res.json(files);
  } catch (error) {
    next(error);
  }
};

export const organizeFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fileOrder } = req.body;
    await fileService.organizeFiles(fileOrder);
    res.status(200).send("Files organized");
  } catch (error) {
    next(error);
  }
};

export const generateShareableLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fileId } = req.params;
    const shareableLink = await fileService.generateShareableLink(
      fileId,
      req.protocol,
      req.get("host") || ""
    );
    res.json({ shareableLink });
  } catch (error) {
    next(error);
  }
};

export const accessSharedFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.params;
    const filepath = await fileService.accessSharedFile(token);
    res.sendFile(filepath, { root: "." });
  } catch (error) {
    next(error);
  }
};

export const getFileStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fileId } = req.params;
    const stats = await fileService.getFileStatistics(fileId);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
