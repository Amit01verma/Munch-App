  const prisma = require("../config/prisma");

  const getAllProducts = async (req, res) => {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: true,
        },
      });

      res.status(200).json(products);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };

  const getProductById = async (req, res) => {
    try {
      const id = Number(req.params.id);

      const product = await prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
        },
      });

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };

  module.exports = {
    getAllProducts,
    getProductById,
  };