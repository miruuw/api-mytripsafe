const poolConnection = require("../connection/mysql2");

exports.addDataClient = async ({ name, email, password }) => {
  const sql = `INSERT INTO client (name, email, hash_password) values (?, ?, ?)`;
  const result = await poolConnection.query(sql, [name, email, password]);
  return result[0];
};

exports.getDataClientByEmail = async ({ email }) => {
  const sql = `SELECT * FROM client WHERE email = '${email}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataClientById = async ({ clientId }) => {
  const sql = `SELECT * FROM client WHERE client_id = ?`;
  const result = await poolConnection.query(sql, [clientId]);
  return result[0];
};

exports.updateDataPositionById = async ({ clientId, longitude, latitude }) => {
  const sql = `
  UPDATE
  client
  SET 
  longitude = ?, 
  latitude = ?
  WHERE client_id = ?
`;
  const result = await poolConnection.query(sql, [
    longitude,
    latitude,
    clientId,
  ]);
  return result[0];
};
