import Stock from "../models/stock.model";

const getStockById = async (id: string) => {
  return await Stock.findOne({ _id: id });
};

export { getStockById };
