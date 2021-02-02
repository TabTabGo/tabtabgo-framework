/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { currentServiceProvider } from "../../providers/ServiceProvider";
import { AppSettings } from "../../Appsettings";
import { TTGError } from "../../types/TTGError";
import { IRestApiService, IStorageService, RequestProps, HTTPMethod } from "../contractss";
import { Dispatch } from "redux";

export default class BaseAjaxService implements IRestApiService {
  protected sessionManger: IStorageService;
  protected controller: string;
  protected appSettings: any;
  protected prefixUrl: string;
  protected dispatch?: Dispatch;

  constructor(controller: string, prefixUrl?: string, dispatch?: Dispatch, appSettings?: any) {
    this.sessionManger = currentServiceProvider.getStorageService();
    this.controller = controller;
    this.appSettings = Object.assign({}, AppSettings, appSettings ?? {});
    this.dispatch = dispatch;
    this.prefixUrl = "";
    if (prefixUrl && !prefixUrl.endsWith("/")) this.prefixUrl = prefixUrl + "/";
  }

  _new(controller: string, prefixUrl?: string, dispatch?: Dispatch, appSettings?: any): IRestApiService {
    throw new Error("Method not implemented.");
  }

  destroy() {

  };

  async Abort(allRequests: boolean) {
    throw new TTGError("Abort is not implemented");
  }

  Get({
    url,
    parameters,
    header,
    actionDescription,
    notifyOnError,
    responseType,
    responseEncoding
  }: RequestProps) {
    return this.restApi(
      "GET",
      url,
      parameters,
      undefined,
      header,
      responseType,
      responseEncoding,
      actionDescription,
      notifyOnError
    );
  };

  Put({
    url,
    parameters,
    body,
    header,
    actionDescription,
    notifyOnError,
    responseType,
    responseEncoding
  }: RequestProps) {
    return this.restApi(
      "PUT",
      url,
      parameters,
      body,
      header,
      responseType,
      responseEncoding,
      actionDescription,
      notifyOnError
    );
  };

  Patch({
    url,
    parameters,
    body,
    header,
    actionDescription,
    notifyOnError,
    responseType,
    responseEncoding
  }: RequestProps) {
    return this.restApi(
      "PATCH",
      url,
      parameters,
      body,
      header,
      responseType,
      responseEncoding,
      actionDescription,
      notifyOnError
    );
  };

  Post({
    url,
    parameters,
    body,
    header,
    actionDescription,
    notifyOnError,
    isFormData,
    responseType,
    responseEncoding
  }: RequestProps) {
    return this.restApi(
      "POST",
      url,
      parameters,
      body,
      header,
      responseType,
      responseEncoding,
      actionDescription,
      notifyOnError,
      isFormData
    );
  };

  Delete({
    url,
    parameters,
    body,
    header,
    actionDescription,
    notifyOnError,
    responseType,
    responseEncoding
  }: RequestProps) {
    return this.restApi(
      "DELETE",
      url,
      parameters,
      body,
      header,
      responseType,
      responseEncoding,
      actionDescription,
      notifyOnError
    );
  };

  async restApi(
    method?: HTTPMethod,
    url?: string,
    parameters?: any,
    body?: any,
    header?: any,
    responseType?: string,
    responseEncoding?: string,
    actionDescription?: string,
    notifyOnError?: boolean,
    isFormData?: boolean
  ): Promise<any> {
    throw new TTGError("restApi is not implemented");
  }

  resetPage = () => {
    //reset all what in session
    this.sessionManger.resetToken();
    //if (window) window.location.reload();
  };

  protected reduxDispatch(action: any) {
    if (this.dispatch) {
      this.dispatch(action);
    }
  }

  protected parseUrl = (
    url: string = "",
    parameters: any = {},
    buildQuery: boolean = true,
    concatBaseUrl: boolean = true
  ) => {
    const regex = /:(\w+)\/?/g;

    let m;

    while ((m = regex.exec(url)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      for (let i = 0; i < m.length; i++) {
        const match = m[i];
        if (parameters[match]) {
          url = url.replace(`:${match}`, parameters[match]);
          delete parameters[match];
        }
      }
    }
    if (buildQuery) {
      let prefix = url.lastIndexOf("?") > 0 ? "&" : "?";

      for (let propName in parameters) {
        url = url.concat(`${prefix}${propName}=${parameters[propName]}`);
        if (prefix === "?") {
          prefix = "&";
        }
      }

    }

    let finialUrl = "";
    if (url.startsWith("//")) {
      finialUrl = url.slice(2);
    } else {
      if (url.startsWith("/")) {
        url = url.slice(1);
      }
      if (url.startsWith("?")) finialUrl = `${this.controller}${url}`;
      else finialUrl = `${this.controller}/${url}`;
    }

    if (concatBaseUrl) {
      finialUrl = `${AppSettings.baseApiUrl ?? ""}/${this.prefixUrl}${finialUrl}`;
    }
    return finialUrl;
  };

  protected getFilename(response: any) {
    var filename = "";
    var disposition = response.headers.get("Content-Disposition");
    //console.log("response.headers", response.headers);
    //console.log("disposition", disposition);
    if (disposition && disposition.indexOf("inline") !== -1) {
      var filenameRegex = /filename=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    return filename;
  }
}
