import { IFileService, UploadFileInfo } from './contracts';
export default class FileService implements IFileService {
    restApi: any;
    constructor(controller?: string);
    _new: (controller?: string) => FileService;
    getImageUrl: (url: string, size?: string) => string | null;
    getFileUrl: (url: string) => string | null;
    uploadFile: (blob: Blob, { fileName, extension, ...fileInfo }: UploadFileInfo, url?: string) => Promise<any>;
    destroy: () => void;
}
