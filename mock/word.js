var Mock = require("mockjs");
var express = require("express");
var router = express.Router();

router.use("/word", function (req, res) {
  console.log(req.body);
  //调用mock方法模拟数据
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    code: 0,
    message: "@cparagraph",
    data: {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      word: "the",
      rank: 1,
      id: 1,
      star: 4,
      prouncation: "[wɜːd]",
      translate: ["n. 单词", "vt. 说话", "vi. 说话"],
    },
  });
  return res.json(data);
});

module.exports = router;
