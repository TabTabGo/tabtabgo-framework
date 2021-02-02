import { currentServiceProvider } from '../providers/ServiceProvider';
//import { parseDataUrl } from "../utilities";
import moment from 'moment';
import { AppSettings } from '../Appsettings';
import { IFileService, UploadFileInfo } from './contracts';

export default class FileService implements IFileService {
  restApi: any;
  constructor(controller = 'files') {
    this.restApi = currentServiceProvider.newAjaxService(controller);
  }

  _new = (controller = 'files') => {
    return new FileService(controller);
  };

  getImageUrl = (url: string, size = 'default'): string | null => {
    if (url && /^\/\d+$/.test(url)) {
      return `${AppSettings.baseApiUrl}/files${url}/image/${size}`;
    }
    return this.getFileUrl(url);
  };

  getFileUrl = (url: string): string | null => {
    // if the url format is /<number> return url else if start with / then return with api/files else return url
    if (url) {
      if (/^\/\d+$/.test(url)) return `${AppSettings.baseApiUrl}/files${url}`;
      else if (/^\/[a-zA-Z].*$/.test(url)) {
        return `${AppSettings.baseApiUrl}${url}`;
      } else return url;
    }
    return null;
  };

  uploadFile = async (
    blob: Blob,
    { fileName, extension, ...fileInfo }: UploadFileInfo,
    url?: string,
  ) => {
    let data = new FormData();

    for (let prop in fileInfo) {
      if (prop !== 'fileName' && prop !== 'extension') {
        data.append(prop, fileInfo[prop]);
      }
    }

    if (!extension && fileName) {
      extension = fileName.split('.').pop();
    }

    if (extension) data.append('fileExtension', extension);

    if (!fileName) {
      fileName = `File_${moment().format('YYYYMMDDmmhhss')}.${extension}`;
    }

    data.append('formFile', blob, fileName);

    return this.restApi.Post({
      url: url ? url : '/Create',
      isFormData: true,
      body: data,
      actionDescription: 'Uploading file',
    });
  };

  destroy = () => {};
}
