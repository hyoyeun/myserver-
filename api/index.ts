import express from "express";
import request from "request";
const app = express();

app.get("/insurance", function (req, res) {
  const {
    serviceKey,
    pageNo,
    numOfRows,
    v_saeopjaDrno,
    opaBoheomFg
  } = req.query;

  const api_url = "http://apis.data.go.kr/B490001/gySjbPstateInfoService/getGySjBoheomBsshItem";

  const options = {
    url: api_url,
    qs: {
      serviceKey,
      pageNo,
      numOfRows,
      v_saeopjaDrno,
      opaBoheomFg
    }
  };

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.set("Content-Type", "application/xml;charset=utf-8");
      res.send(body);
    } else {
      console.error("API 호출 오류:", response?.statusCode || error);
      res.status(response?.statusCode || 500).send("외부 API 호출 실패");
    }
  });
});

app.listen(3000, () => {
  console.log("https://apis.data.go.kr/B490001/gySjbPstateInfoService/getGySjBoheomBsshItem?serviceKey=f8801cc8847281289559e5481d250c2f32d3bc9410407ae8567709e4f3a2e63b&v_saeopjaDrno=8394600541&pageNo=1&numOfRows=10&opaBoheomFg=1 서버 실행 중!");
});
