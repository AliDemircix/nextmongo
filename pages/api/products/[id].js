import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Products";
dbConnect();
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: true, data: product });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!product) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: true, data: product });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deleted = await Product.deleteOne({ _id: id });
        if (!deleted) {
          return req.status(400).json({ success: false });
        }
        return res.status(200).json({ success: true, data: {} });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
    default:
      return res.status(400).json({ success: false });
      break;
  }
};
