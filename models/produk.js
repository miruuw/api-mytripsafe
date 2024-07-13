const poolConnection = require("../connection/mysql2");

exports.addDataProduk = async ({
  name,
  kategoriId,
  nomorSeri,
  deskripsi,
  harga,
  stok,
  pathPhoto,
  merchantId,
}) => {
  const sql = `INSERT INTO produk (name, kategori_id, nomor_seri, deskripsi, harga, stok, path_photo, merchant_id) values (?, ?, ?, ?, ?, ?, ?, ?)`;
  const result = await poolConnection.query(sql, [
    name,
    kategoriId,
    nomorSeri,
    deskripsi,
    harga,
    stok,
    pathPhoto,
    merchantId,
  ]);
  return result[0];
};

exports.getDataProduk = async ({ merchantId }) => {
  const sql = `
    SELECT 
    *,
    p.name as name,
    k.name as categoryName
    FROM 
    produk p
    LEFT JOIN kategori k ON k.kategori_id = p.kategori_id
    WHERE p.merchant_id = ?
    `;
  const result = await poolConnection.query(sql, [merchantId]);
  return result[0];
};

exports.getDataProdukById = async ({ produkId }) => {
  const sql = `
    SELECT 
    *
    FROM 
    produk 
    WHERE produk_id = ?`;
  const result = await poolConnection.query(sql, [produkId]);
  return result[0];
};

exports.updateDataProduk = async ({
  produkId,
  name,
  kategoriId,
  nomorSeri,
  deskripsi,
  harga,
  stok,
  pathPhoto,
}) => {
  if (!pathPhoto) {
    const sql = `
      UPDATE
      produk
      SET name = ? , kategori_id = ?, nomor_seri = ?, deskripsi = ?, harga = ?, stok = ?
      WHERE produk_id = ?
    `;
    const result = await poolConnection.query(sql, [
      name,
      kategoriId,
      nomorSeri,
      deskripsi,
      harga,
      stok,
      produkId,
    ]);
    return result[0];
  } else {
    const sql = `
      UPDATE
      produk
      SET name = ? , kategori_id = ?, nomor_seri = ?, deskripsi = ?, harga = ?, stok = ?, path_photo = ?
      WHERE produk_id = ?
    `;
    const result = await poolConnection.query(sql, [
      name,
      kategoriId,
      nomorSeri,
      deskripsi,
      harga,
      stok,
      pathPhoto,
      produkId,
    ]);
    return result[0];
  }
};

exports.deleteDataProdukById = async ({ produkId }) => {
  const sql = `DELETE FROM produk WHERE produk_id = ${produkId}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataProdukByCategoryId = async ({ merchantId, categoryId }) => {
  const sql = `
    SELECT 
    *,
    p.name as name,
    k.name as categoryName
    FROM 
    produk p
    LEFT JOIN kategori k ON k.kategori_id = p.kategori_id
    LEFT JOIN merchant m ON m.merchant_id = p.merchant_id
    WHERE p.merchant_id = ? AND p.kategori_id = ?
    `;
  const result = await poolConnection.query(sql, [merchantId, categoryId]);
  return result[0];
};
