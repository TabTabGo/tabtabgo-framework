import { SessionUser } from "../../types/SessionUser";

export interface IRefreshTokenService {
  setRefreshToken(refreshToken: any, user?: SessionUser): Promise<void>;
  getRefreshToken: (user?: SessionUser) => Promise<any>;
}
