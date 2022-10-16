import { Request, Response } from "express";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  // GET POST 可省略
  "GET /api/word": async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      success: true,
      data: [
        {
          id: 1,
          word: "the",
        },
        {
          id: 2,
          word: "be",
        },
      ],
    });
  },
};
