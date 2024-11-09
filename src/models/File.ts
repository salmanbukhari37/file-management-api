import mongoose, { Document, Schema } from "mongoose";

export interface IFile extends Document {
  filename: string;
  filepath: string;
  filetype: string;
  tags: string[];
  shareToken?: string;
  views: number;
  createdAt: Date; // Timestamp for file creation
  updatedAt: Date; // Timestamp for the last update
}

const FileSchema: Schema = new Schema(
  {
    filename: { type: String, required: true },
    filepath: { type: String, required: true },
    filetype: { type: String, required: true },
    tags: { type: [String], default: [] },
    shareToken: { type: String, default: null },
    views: { type: Number, default: 0 }, // Initialize view count to 0
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const File = mongoose.model<IFile>("File", FileSchema);
export default File;
