import { Request, Response, NextFunction } from "express";
import * as fileService from "../services/fileService";
import * as shareService from "../services/shareService";

// Generate a shareable link for a file
export const generateShareableLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { fileId } = req.params;
    const file = await fileService.getFileById(fileId);
    const shareToken = await fileService.generateShareToken(file);

    const shareableLink = `${req.protocol}://${req.get(
      "host"
    )}/api/share/${shareToken}`;
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
    const file = await shareService.getFileByShareToken(token);
    await fileService.incrementFileViews(file);

    // Serve the file
    res.sendFile(file.filepath, { root: "." });
  } catch (error) {
    next(error);
  }
};
