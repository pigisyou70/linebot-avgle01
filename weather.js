export default Weather;

import request from 'request';
import cheerio from 'cheerio';

function Weather(event){
    let msg = "";
    // let url = "https://www.cwb.gov.tw/V8/C/W/Town/Town.html?TID=6500200";
    let url = "https://data.ntpc.gov.tw/api/datasets/B3A30A19-4B89-4DA2-8D99-18200DC5DFDE/json?page=0&size=1";
    
    // 取得網頁資料
    request(url, function (error, response, body) {
        if (!error) {

            // 用 cheerio 解析 html 資料
            var $ = cheerio.load(body);

            // let weathers = [];
            // $('#TableId3hr tbody tr').each(function(i, elem) {
            //   weathers.push($(this).text().split('\n'));
            // })

            // console.log($);
            console.log($("Id").html());

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