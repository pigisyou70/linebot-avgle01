export default GetInvoice;

import request from 'request';
import cheerio from 'cheerio';
import xml2js from 'xml2js';
import xmlbuilder from 'xmlbuilder';

//xml解析器
// var xmlParser = new xml2js.Parser();

function GetInvoice(event){
    let msg = "";
    let url = "https://invoice.etax.nat.gov.tw/invoice.xml";

    // 台南市的氣溫
    // var url = "http://www.wunderground.com/weather-forecast/zmw:00000.1.59358";

    // 取得網頁資料
    request(url, function (error, response, body) {
        if (!error) {

            // 用 cheerio 解析 html 資料
            // var $ = cheerio.load(body);
            var xmlParser = new xml2js.Parser(body);
            // console.log($);

            console.log(xmlParser);
            console.log("\n");
            console.log("\n");
            console.log("\n");


            // const ta = $("#folder1 .opened .folder");
            // console.log(ta);

            // for (let i=1; i<ta.length; i++){
            //     const ta_title = ta.eq(i).find('.line');
            //     console.log(ta_title);
            // }
            // 篩選有興趣的資料
            // var temperature = $("[data-variable='temperature'] .wx-value").html();
            // var humidity = $("[data-variable='contains'] .wx-value").html();

            // 輸出
            // console.log("氣溫：攝氏 " + temperature + " 度");
            // console.log("濕度：" + humidity + "%");

        } else {
            console.log("擷取錯誤：" + error);
        }
    });

    return msg;
}