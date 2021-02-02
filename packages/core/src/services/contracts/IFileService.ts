export interface UploadFileInfo {
  fileName?: string;
  extension?: string;
  [key: string]: any;
}

export interface IFileService {
  _new: (controller: string) => IFileService;
  getImageUrl: (url: string, size?: string) => string | null;
  getFileUrl: (url: string) => string | null;
  uploadFile: (
    blob: Blob,
    { fileName, extension, ...fileInfo }: UploadFileInfo,
    url?: string,
  ) => Promise<any>;
  destroy: () => void;
}
