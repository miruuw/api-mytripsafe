const Response = require("../../helpers/response");
const {
  addDataClient,
  getDataClientByEmail,
  getDataClientById,
  updateDataPositionById,
} = require("../../models/client");
const { hashData, verifyHashedData } = require("../../utils/hashData");
const { signJWT } = require("../../middleware/client");

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await hashData(password);

    await addDataClient({ name, email, password: hashedPassword });

    return res.json(Response(true, 201, `Client Berhasil Terdaftar`));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const clientData = await getDataClientByEmail({ email });

    if (!clientData.length > 0) {
      return res.json(
        Response(false, 400, `Data Tidak Tersedia`, {
          name: "notFound",
        })
      );
    }

    const verifyPassword = await verifyHashedData(
      password,
      clientData[0].hash_password
    );

    if (!verifyPassword) {
      return res.json(
        Response(false, 400, `Password salah!`, {
          name: "password",
        })
      );
    }

    const payloadJwt = {
      clientId: clientData[0].client_id,
      email,
    };

    const token = signJWT(payloadJwt);

    return res.json(Response(true, 201, `Client Berhasil Login`, { token }));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getClient = async (req, res) => {
  const clientId = req.clientId;

  try {
    const result = await getDataClientById({ clientId });
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

exports.updatePosition = async (req, res) => {
  const { latitude, longitude } = req.body;
  const clientId = req.clientId;
  try {
    await updateDataPositionById({ clientId, latitude, longitude });

    return res.json(Response(true, 201, `Posisi Berhasil Di Update`));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
