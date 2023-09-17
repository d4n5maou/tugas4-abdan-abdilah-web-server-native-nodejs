const https = require("node:https");

const url = "https://jsonplaceholder.typicode.com/comments";

const commentHandler = {};

commentHandler.getAllComment = (req, res) => {
  https
    .get(url, (response) => {
      let responseData = "";

      response.on("data", (d) => {
        responseData += d;
      });

      response.on("end", () => {
        const parsedData = JSON.parse(responseData);
        const modifiedData = modifiedDataComment(parsedData);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(modifiedData));
      });
    })
    .on("error", (err) => {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    });
};

function modifiedDataComment(data) {
  const newData = data.map((item) => ({
    postId: item.postId,
    name: item.name,
    email: item.email,
    content: item.body,
  }));
  return newData;
}

module.exports = commentHandler;
