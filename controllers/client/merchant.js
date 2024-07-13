const Response = require("../../helpers/response");
const { getAllDataMerchant } = require("../../models/merchant");
const { getDataKategori } = require("../../models/kategori");
const { getDataProdukByCategoryId } = require("../../models/produk");

exports.getAllMerchant = async (req, res) => {
  try {
    const result = await getAllDataMerchant();

    return res.json(
      Response(true, 200, `Sukses Mendapatkan Merchant`, {
        data: result,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getAllCategoryMerchant = async (req, res) => {
  const { merchantId } = req.params;

  try {
    const result = await getDataKategori({ merchantId });

    return res.json(
      Response(true, 200, `Sukses Mendapatkan Category`, {
        data: result,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getAllProductMerchant = async (req, res) => {
  const { merchantId, categoryId } = req.body;

  try {
    const result = await getDataProdukByCategoryId({ merchantId, categoryId });

    return res.json(
      Response(true, 200, `Sukses Mendapatkan Category`, {
        data: result,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
