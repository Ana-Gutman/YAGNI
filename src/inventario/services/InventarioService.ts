import redisClient from "../../shared/database/redis";

class InventarioService {
    static async getProductState(productId: string): Promise<string> {
        const stateInRefrigerator = await redisClient.sIsMember('refrigerator_products', productId);
        if (stateInRefrigerator) return 'En Refrigerador';
    
        const stateInTransit = await redisClient.sIsMember('transit_products', productId);
        if (stateInTransit) return 'En Tránsito';
    
        return 'En Cocina';
      }
    

  static async updateProductState(productId: string, state: string): Promise<void> {
    await redisClient.sRem('refrigerator_products', productId);
    await redisClient.sRem('transit_products', productId);

    if (state === 'En Refrigerador') {
      await redisClient.sAdd('refrigerator_products', productId);
    } else if (state === 'En Tránsito') {
      await redisClient.sAdd('transit_products', productId);
    }
  }
}

export default InventarioService;
