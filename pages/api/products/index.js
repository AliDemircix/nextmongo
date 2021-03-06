import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Products";
dbConnect();
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const products = await Product.find({});

        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const products = await Product.create(req.body);

        res.status(201).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Bagli Degil" });
      break;
  }
};
