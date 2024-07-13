const bcryptjs = require("bcryptjs");

exports.hashData = async (data, saltRounds = 10) => {
  const salt = await bcryptjs.genSalt(saltRounds);
  const hashedData = await bcryptjs.hash(String(data), salt);
  return hashedData;
};

exports.verifyHashedData = async (unhashed, hashed) => {
  const match = await bcryptjs.compare(unhashed, hashed);
  return match;
};
