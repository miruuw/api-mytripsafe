const Response = require("../../helpers/response");
const {
  addDataKategori,
  getDataKategori,
  getDataKategoriById,
  deleteDataKategoriById,
  updateDataKategori,
} = require("../../models/kategori");
const path = require("path");
const fs = require("fs");

exports.createKategori = async (req, res) => {
  const { name } = req.body;
  let pathImage = req.files.image[0].path;
  const merchantId = req.merchantId;

  try {
    await addDataKategori({ name, pathImage, merchantId });

    return res.json(Response(true, 200, `Sukses Membuat Kategori`));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getAllKategori = async (req, res) => {
  const merchantId = req.merchantId;

  try {
    const result = await getDataKategori({ merchantId });

    return res.json(
      Response(true, 200, `Sukses Mendapatkan Kategori`, {
        data: result,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getDetailKategori = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await getDataKategoriById({ categoryId });

    return res.json(
      Response(true, 200, `Sukses Mendapatkan Kategori`, {
        data: result[0],
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.deleteKategori = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await getDataKategoriById({ categoryId });
    const data = result[0];

    if (data.path_image) {
      const p = path.join(__dirname, `../../${data.path_image}`);
      fs.unlinkSync(p);
    }

    await deleteDataKategoriById({ categoryId });

    return res.json(Response(true, 200, `Sukses Hapus Kategori`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateKategori = async (req, res) => {
  const { name } = req.body;
  const { categoryId } = req.params;

  try {
    await updateDataKategori({
      categoryId,
      name,
      pathImage: req.files.image ? req.files.image[0].path : undefined,
    });

    return res.json(Response(true, 200, `Sukses Mengedit Kategori`));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
