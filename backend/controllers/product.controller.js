import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    //empty object means get all products from database
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }

  const newProduct = await Product.create(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product Create Succcessfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Product not found for update invalid Id",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product Create Succcessfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  // this id comes from the dynamic section of URI
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product Deleted Succcessfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ success: false, message: "Server Error" });
  }
};
