import axios from "axios";
import * as cheerio from "cheerio";


async function fetchPage(){
    const url = "https://finance.naver.com/item/news.naver?code=055550";
    try{
        const response =await axios.get(url,{
            responseType: "arraybuffer",
            responseEncoding: "binary",
        });
        const decoder = new TextDecoder("euc-kr");
        const content = decoder.decode(response.data);
const $ = cheerio.load(content);
        const tempurl2=$(".section iframe").map((i,el)=>{
            return{
                url:$(el).prop("src")
            }
        })
        const url2 ="https://finance.naver.com/";
        for(let i=0;i<2;i++){
            let response2=await axios.get(tempurl2[i].url+url2{
                responseEncoding:"binary",
                responseType:"arraybuffer"
            });
         
            const content2 = decoder.decode(response2.data);
            const $1 = cheerio.load(content2);
            const datatype = $("")
        }
    }
    catch(err){
        console.log(err);
    }
}