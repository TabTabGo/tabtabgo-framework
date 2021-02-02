import { IStorageService, IRefreshTokenService } from "../contracts";
import { SessionUser } from "../../types/SessionUser";

export default abstract class BaseStorageService
  implements IStorageService, IRefreshTokenService {

  protected token_name = "access_token";
  protected token_type = "token_type";
  protected token_expired = "token_expired";
  protected user_info = "user_info";
  protected refresh_token = "refresh_token";
  protected token_header_key = "token_header_key";

  setToken = async (
    accessToken: any,
    tokenType: string,
    tokenExpired?: number
  ) => {
    await Promise.all([
      this.setAccessToken(accessToken),
      this.setAccessToken(tokenType),
      this.setTokenExpire(tokenExpired || -1)
    ]);
  };

  setTokenType = (tokenType: string) =>
    this.setItem(this.token_type, tokenType);
  setAccessToken = (accessToken: any) =>
    this.setItem(this.token_name, accessToken);
  setTokenExpire = (tokenExpired: number) =>
    this.setItem(this.token_expired, tokenExpired);
  setRefreshToken = (refreshToken: any, user?: SessionUser) =>
    this.setItem(this.refresh_token, refreshToken);
  setTokenHeaderKey = (headerKey: string) => this.setItem(this.token_header_key, headerKey);;

  setUser = (user: SessionUser) => this.setItem(this.user_info, user);

  getToken = () => this.getItem(this.token_name);
  getTokenType = () => this.getItem(this.token_type);
  getTokenHeaderKey = () => this.getItem(this.token_header_key);

  getUser = async () => {
    var user = await this.getItem(this.user_info);
    return user as SessionUser;
  };
  getRefreshToken = (user?: SessionUser) => this.getItem(this.refresh_token);

  isTokenExpired = async () => {
    if (!this.getToken()) return false;

    var tokenExpiry = await this.getItem(this.token_expired);
    if (!tokenExpiry) return false;
    let expiresAt = Number(tokenExpiry) * 1000; // JSON.stringify(Number(tokenExpiry) * 1000 + new Date().getTime());

    return new Date().getTime() > expiresAt;
  };

  resetToken = async () => {
    let resetTasks = [
      this.reset(this.token_type),
      this.reset(this.token_expired),
      this.reset(this.user_info),
      this.reset(this.refresh_token)
    ];
    await Promise.all(resetTasks);
  };

  abstract reset(key: string): Promise<void>;
  abstract getItem(key: string): Promise<any>;
  abstract setItem(key: string, object: any): Promise<void>;
}
