const poolConnection = require("../connection/mysql2");

exports.addDataMerchant = async ({
  merchantName,
  ownerName,
  phoneNumber,
  email,
  password,
  longitude,
  latitude,
  deskripsi,
  alamat,
  noWa,
  pathMerchant,
  pathOwner,
}) => {
  const sql = `INSERT INTO merchant (name, owner_name, phone_number, email, password, longitude, latitude, deskripsi, alamat, no_wa, path_merchant, path_owner) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const result = await poolConnection.query(sql, [
    merchantName,
    ownerName,
    phoneNumber,
    email,
    password,
    longitude,
    latitude,
    deskripsi,
    alamat,
    noWa,
    pathMerchant,
    pathOwner,
  ]);
  return result[0];
};

exports.getDataMerchantByEmail = async ({ email }) => {
  const sql = `SELECT * FROM merchant WHERE email = '${email}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataMerchantById = async ({ merchantId }) => {
  const sql = `SELECT * FROM merchant WHERE merchant_id = '${merchantId}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getAllDataMerchant = async () => {
  const sql = `
    SELECT 
    * 
    FROM 
    merchant`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataProfile = async ({
  merchantName,
  ownerName,
  phoneNumber,
  email,
  longitude,
  latitude,
  deskripsi,
  alamat,
  noWa,
  pathMerchant,
  pathOwner,
  merchantId,
}) => {
  if (!pathMerchant && !pathOwner) {
    const sql = `
      UPDATE
      merchant
      SET 
      name = ?, 
      owner_name = ?, 
      phone_number = ?, 
      email = ?, 
      longitude = ?, 
      latitude = ?, 
      deskripsi = ?, 
      alamat = ?, 
      no_wa = ?
      WHERE merchant_id = ?
    `;
    const result = await poolConnection.query(sql, [
      merchantName,
      ownerName,
      phoneNumber,
      email,
      longitude,
      latitude,
      deskripsi,
      alamat,
      noWa,
      merchantId,
    ]);
    return result[0];
  } else if (pathMerchant && !pathOwner) {
    const sql = `
      UPDATE
      merchant
      SET 
      name = ?, 
      owner_name = ?, 
      phone_number = ?, 
      email = ?, 
      longitude = ?, 
      latitude = ?, 
      deskripsi = ?, 
      alamat = ?, 
      no_wa = ?,
      path_merchant = ?
      WHERE merchant_id = ?
    `;
    const result = await poolConnection.query(sql, [
      merchantName,
      ownerName,
      phoneNumber,
      email,
      longitude,
      latitude,
      deskripsi,
      alamat,
      noWa,
      pathMerchant,
      merchantId,
    ]);
    return result[0];
  } else if (!pathMerchant && pathOwner) {
    const sql = `
      UPDATE
      merchant
      SET 
      name = ?, 
      owner_name = ?, 
      phone_number = ?, 
      email = ?, 
      longitude = ?, 
      latitude = ?, 
      deskripsi = ?, 
      alamat = ?, 
      no_wa = ?,
      path_owner = ?
      WHERE merchant_id = ?
    `;
    const result = await poolConnection.query(sql, [
      merchantName,
      ownerName,
      phoneNumber,
      email,
      longitude,
      latitude,
      deskripsi,
      alamat,
      noWa,
      pathOwner,
      merchantId,
    ]);
    return result[0];
  } else {
    const sql = `
    UPDATE
    merchant
    SET 
    name = ?, 
    owner_name = ?, 
    phone_number = ?, 
    email = ?, 
    longitude = ?, 
    latitude = ?, 
    deskripsi = ?, 
    alamat = ?, 
    no_wa = ?,
    path_merchant = ?,
    path_owner = ?
    WHERE merchant_id = ?
  `;
    const result = await poolConnection.query(sql, [
      merchantName,
      ownerName,
      phoneNumber,
      email,
      longitude,
      latitude,
      deskripsi,
      alamat,
      noWa,
      pathMerchant,
      pathOwner,
      merchantId,
    ]);
    return result[0];
  }
};
