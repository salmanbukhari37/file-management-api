import File from "../models/File";
import crypto from "crypto";

export const getFileById = async (fileId: string) => {
  const file = await File.findById(fileId);
  if (!file) throw new Error("File not found");
  return file;
};

export const incrementFileViews = async (file: any) => {
  file.views += 1;
  return file.save();
};

export const generateShareToken = async (file: any) => {
  if (!file.shareToken) {
    file.shareToken = crypto.randomBytes(16).toString("hex");
    await file.save();
  }
  return file.shareToken;
};

// Upload a new file
export const uploadFile = async (
  filename: string,
  filepath: string,
  filetype: string,
  tags: string[]
) => {
  const newFile = new File({
    filename,
    filepath,
    filetype,
    tags,
  });
  await newFile.save();
  return newFile;
};

// Get all uploaded files
export const getFiles = async () => {
  return File.find();
};

// Organize files (drag-and-drop functionality, e.g., changing order)
export const organizeFiles = async (fileOrder: string[]) => {
  for (const [index, fileId] of fileOrder.entries()) {
    await File.findByIdAndUpdate(fileId, { order: index });
  }
};

// Generate a shareable link for a file
export const generateShareableLink = async (
  fileId: string,
  protocol: string,
  host: string
) => {
  const file = await File.findById(fileId);
  if (!file) throw new Error("File not found");

  if (!file.shareToken) {
    file.shareToken = crypto.randomBytes(16).toString("hex");
    await file.save();
  }

  return `${protocol}://${host}/api/files/share/${file.shareToken}`;
};

// Access the shared file
export const accessSharedFile = async (token: string) => {
  const file = await File.findOne({ shareToken: token });
  if (!file) throw new Error("File not found or link is invalid");

  file.views += 1;
  await file.save();

  return file.filepath;
};

// Get file statistics
export const getFileStatistics = async (fileId: string) => {
  const file = await File.findById(fileId);
  if (!file) throw new Error("File not found");

  return {
    filename: file.filename,
    views: file.views,
    tags: file.tags,
    createdAt: file.createdAt,
    updatedAt: file.updatedAt,
  };
};
