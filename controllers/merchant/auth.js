const Response = require("../../helpers/response");
const {
  addDataMerchant,
  getDataMerchantByEmail,
  getDataMerchantById,
  updateDataProfile,
} = require("../../models/merchant");
const { hashData, verifyHashedData } = require("../../utils/hashData");
const { signJWT } = require("../../middleware/merchant");

exports.signUp = async (req, res) => {
  const {
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
  } = req.body;
  try {
    const hashedPassword = await hashData(password);

    let pathMerchant = req.files.merchantPhoto[0].path;
    let pathOwner = req.files.ownerPhoto[0].path;

    await addDataMerchant({
      merchantName,
      ownerName,
      phoneNumber,
      email,
      password: hashedPassword,
      longitude,
      latitude,
      deskripsi,
      alamat,
      noWa,
      pathMerchant,
      pathOwner,
    });

    return res.json(Response(true, 201, `Merchant Berhasil Terdaftar`));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const merchantData = await getDataMerchantByEmail({ email });

    if (!merchantData.length > 0) {
      return res.json(
        Response(false, 400, `Data Tidak Tersedia`, {
          name: "notFound",
        })
      );
    }

    const verifyPassword = await verifyHashedData(
      password,
      merchantData[0].password
    );

    if (!verifyPassword) {
      return res.json(
        Response(false, 400, `Password salah!`, {
          name: "password",
        })
      );
    }

    const payloadJwt = {
      merchantId: merchantData[0].merchant_id,
      email,
    };

    const token = signJWT(payloadJwt);

    return res.json(
      Response(true, 201, `Merchant Berhasil Login`, {
        token,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getMerchant = async (req, res) => {
  const merchantId = req.merchantId;

  try {
    const result = await getDataMerchantById({ merchantId });
    return res.json(
      Response(true, 200, "Get Data Successfully", {
        data: result[0],
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateProfile = async (req, res) => {
  const {
    merchantName,
    ownerName,
    phoneNumber,
    email,
    longitude,
    latitude,
    deskripsi,
    alamat,
    noWa,
  } = req.body;
  const { merchantId } = req.params;
  try {
    let pathMerchant = req.files.merchantPhoto
      ? req.files.merchantPhoto[0].path
      : undefined;
    let pathOwner = req.files.ownerPhoto
      ? req.files.ownerPhoto[0].path
      : undefined;

    await updateDataProfile({
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
    });

    return res.json(Response(true, 200, `Merchant Berhasil Terdaftar`));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
