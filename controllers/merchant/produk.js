const Response = require("../../helpers/response");
const {
  addDataProduk,
  getDataProduk,
  getDataProdukById,
  updateDataProduk,
  deleteDataProdukById,
} = require("../../models/produk");
const path = require("path");
const fs = require("fs");

exports.createProduk = async (req, res) => {
  const { name, kategoriId, nomorSeri, deskripsi, harga, stok } = req.body;
  const merchantId = req.merchantId;

  try {
    await addDataProduk({
      name,
      kategoriId,
      nomorSeri,
      deskripsi,
      harga,
      stok,
      pathPhoto: req.files.photo[0].path,
      merchantId,
    });

    return res.json(Response(true, 200, `Sukses Membuat Produk`));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getAllProduk = async (req, res) => {
  const merchantId = req.merchantId;

  console.log('merchantId', merchantId)

  try {
    const result = await getDataProduk({ merchantId });

    return res.json(
      Response(true, 200, `Sukses Mendapatkan Produk`, {
        data: result,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getDetailProduk = async (req, res) => {
  const { produkId } = req.params;
  try {
    const result = await getDataProdukById({ produkId });

    return res.json(
      Response(true, 200, `Sukses Mendapatkan Produk`, {
        data: result[0],
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateProduk = async (req, res) => {
  const { name, kategoriId, nomorSeri, deskripsi, harga, stok } = req.body;
  const { produkId } = req.params;

  try {
    await updateDataProduk({
      produkId,
      name,
      kategoriId,
      nomorSeri,
      deskripsi,
      harga,
      stok,
      pathPhoto: req.files.photo ? req.files.photo[0].path : undefined,
    });

    return res.json(Response(true, 200, `Sukses Mengedit Produk`));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.deleteProduk = async (req, res) => {
  const { produkId } = req.params;

  try {
    const result = await getDataProdukById({ produkId });
    const data = result[0];

    if (data.path_photo) {
      const p = path.join(__dirname, `../../${data.path_photo}`);
      fs.unlinkSync(p);
    }

    await deleteDataProdukById({ produkId });

    return res.json(Response(true, 200, `Sukses Menghapus Produk`));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
