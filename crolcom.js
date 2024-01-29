// const axios = require('axios');

import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
// const iconv = require("iconv-lite");
// axios({
//   method: "ge
//   url: "https://www.naver.com/",
//   responseType: "type",
// }).then(response => {
//   console.log(response);
// });

// const url = "https://quotes.toscrape.com/";
// axios.get(url).then((response) => {
//   console.log(response);
// });
const url = "https://finance.naver.com/sise/sise_market_sum.naver";
const tempurl = "https://finance.naver.com/";
async function fetchPage() {
  try {
    const response = await axios.get(url, {
      //response 1占쏙옙占쏙옙 占쏙옙占쏙옙
      responseType: "arraybuffer",
      responseEncoding: "binary",
    });
    const decoder = new TextDecoder("euc-kr");
    const content = decoder.decode(response.data);
    const $ = cheerio.load(content);
    const datatype = $("tbody tr")
      .map((i, el) => {
        if (String($(el).find(".tltle").text()) !== "") {
          return {
            company: String($(el).find(".tltle").text()),
            price: $(el).find(".number").first().text(),
            // another: $(el).find(".number").text(),
          };
        }
      })
      .get();

    fs.writeFileSync("compri.json", JSON.stringify(datatype));
    const url2 = $(".Nnavi tbody td a").map((i, el) => {
      if (i !== 0) {
        return {
          url: $(el).prop("href"),
        };
      }
    });

    for (let i = 0; i < 9; i++) {
      const forresponse = await axios.get(tempurl + url2[i].url, {
        responseType: "arraybuffer",
        responseEncoding: "binary",
      });
      console.log(url + url2[i].url);
      const forcontext = decoder.decode(forresponse.data);
      const $1 = cheerio.load(forcontext);

      const fordatatype = $1("tbody tr")
        .map((i, el) => {
          if (String($(el).find(".tltle").text()) !== "") {
            return {
              company: String($(el).find(".tltle").text()),
              price: $(el).find(".number").first().text(),
              // another: $(el).find(".number").text(),
            };
          }
        })
        .get();
      fs.writeFileSync("compri" + i + ".json", JSON.stringify(fordatatype));
      console.log(fordatatype);
    }
  } catch (err) {
    console.error(err);
  }
}
fetchPage();
