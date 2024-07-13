const poolConnection = require("../connection/mysql2");

exports.addDataKategori = async ({ name, pathImage, merchantId }) => {
  const sql = `INSERT INTO kategori (name, path_image, merchant_id) values (?, ?, ?)`;
  const result = await poolConnection.query(sql, [name, pathImage, merchantId]);
  return result[0];
};

exports.getDataKategori = async ({ merchantId }) => {
  const sql = `SELECT * FROM kategori WHERE merchant_id = ?`;
  const result = await poolConnection.query(sql, [merchantId]);
  return result[0];
};

exports.getDataKategoriById = async ({ categoryId }) => {
  const sql = `SELECT * FROM kategori WHERE kategori_id = ?`;
  const result = await poolConnection.query(sql, [categoryId]);
  return result[0];
};

exports.deleteDataKategoriById = async ({ categoryId }) => {
  const sql = `DELETE FROM kategori WHERE kategori_id = ?`;
  const result = await poolConnection.query(sql, [categoryId]);
  return result[0];
};

exports.updateDataKategori = async ({ categoryId, name, pathImage }) => {
  if (!pathImage) {
    const sql = `
      UPDATE
      kategori
      SET name = ?
      WHERE kategori_id = ?
    `;
    const result = await poolConnection.query(sql, [name, categoryId]);
    return result[0];
  } else {
    const sql = `
      UPDATE
      kategori
      SET name = ?, path_image = ?
      WHERE kategori_id = ?
    `;
    const result = await poolConnection.query(sql, [
      name,
      pathImage,
      categoryId,
    ]);
    return result[0];
  }
};
