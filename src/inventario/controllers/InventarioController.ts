import { Request, Response } from 'express';
import InventarioService from '../services/InventarioService';

export const getProductState = async (req: Request, res: Response) => {
  const { productId } = req.params;
  if (!productId) {
     res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const state = await InventarioService.getProductState(productId);
     res.status(200).json({ productId, state });
  } catch (error) {
    console.error(error);
     res.status(500).json({ message: 'Error retrieving product state' });
  }
};
