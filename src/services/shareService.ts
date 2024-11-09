import File from "../models/File";

export const getFileByShareToken = async (token: string) => {
  const file = await File.findOne({ shareToken: token });
  if (!file) throw new Error("File not found or link is invalid");
  return file;
};
