import redis, { createClient } from "redis";
import { CacheKey } from "./cache-keys";

export interface InputCacheDto {
  cacheKey: CacheKey;
  dataKey: string;
  data: any;
}

export interface GetCacheDto {
  cacheKey: CacheKey;
  dataKey: string;
}
export default class CacheService {
  private client = createClient({
    password: "password",
    name: "cache",
    username: "",
  });

  constructor() {}

  /**
 * setValue =
 =>*/
  public setValue = async (dto: InputCacheDto) => {
    try {
      const response = await this.client.hSet(
        dto.cacheKey,
        dto.dataKey,
        dto.data
      );
    } catch (error) {
      console.log(`Error saving to cache :: ${error}`);
    }
  };

  /**
   * getValue
   */
  public getValue = async (dto: GetCacheDto): Promise<string | undefined> => {
    try {
      // Retrieve OTP from Redis Hash
      const response = await this.client.hGet(dto.cacheKey, dto.dataKey);
      return response;
    } catch (error) {
      console.log(`Error fetching from  cache :: ${error}`);
    }
  };

  public deleteValue = async () => {};
}
