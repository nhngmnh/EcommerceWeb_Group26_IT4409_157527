import CryptoJS from "crypto-js";
import axios from "axios";
import moment from "moment";
import config from "../config/zalopay.js";

const getMerchantBanks = async (req, res) => {
  const reqtime = Date.now();
  const mac = CryptoJS.HmacSHA256(
    `${config.app_id}|${reqtime}`,
    config.key1
  ).toString();
  const params = { app_id: config.app_id, reqtime, mac };

  try {
    const response = await axios.get(config.endpoint, { params });
    const banks = response.data.banks;

    for (const id in banks) {
      const bankList = banks[id];
      console.log(`${id}.`);
      for (const bank of bankList) {
        console.log(bank);
      }
    }
  } catch (error) {
    console.error("Error fetching merchant banks:", error.message);
  }
};

const payCart = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart)
      return res
        .status(400)
        .json({ success: false, message: "No cart choosen!" });

    const embed_data = { redirecturl: `${process.env.FE_URL}/mycart` };
    const items = [
      {
        itemid: cart._id || 1,
        itemname: cart.itemData?.name || "Unnamed Item",
        itemprice: cart.itemData?.price || 0,
        itemquantity: cart.totalItems || 1,
      },
    ];

    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
      app_user: cart.userData.name,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: cart.totalPrice,
      description: `26Shop - Payment for the order #${transID} - ${cart.totalItems} of ${cart.itemData.name}`,
      bank_code: "",
      callback_url: `${process.env.BE_URL}/api/user/callback`,
    };

    const data = [
      order.app_id,
      order.app_trans_id,
      order.app_user,
      order.amount,
      order.app_time,
      order.embed_data,
      order.item,
    ].join("|");

    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    const response = await axios.post(config.endpoint, null, { params: order });
    return res.json({ success: true, order_url: response.data.order_url });
  } catch (error) {
    return res.status(500).json({ message: "Payment error", success: false });
  }
};

export { getMerchantBanks, payCart };
