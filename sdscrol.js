import * as cheerio from "cheerio";
import axios from "axios";
import fs from "fs";

async function fetchPage() {
  try {
    const url = "https://finance.naver.com/item/sise_day.naver?code=018260";
    const response = await axios.get(url, {
      responseEncoding: "binary",
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    const decoder = new TextDecoder("euc-kr");
    const content = decoder.decode(response.data);
    const $ = cheerio.load(content);
    console.log(content);
    const datatype = $(".type2 tr")
      .map((i, el) => {
        if (String($(el).find(".num").first().text()) !== "")
          return {
            price: String($(el).find(".num").first().text()),
          };
      })
      .get();
    console.log(datatype);
  } catch (err) {
    console.log(err);
  }
}

fetchPage();
