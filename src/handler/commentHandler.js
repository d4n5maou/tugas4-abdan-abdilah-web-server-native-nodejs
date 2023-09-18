const url = "https://jsonplaceholder.typicode.com/comments";

const commentHandler = {};

commentHandler.getAllComment = (req, res) => {
  fetchComment
    .then((dataComment) => {
      const modifiedData = modifiedDataComment(dataComment);
      res.end(JSON.stringify(modifiedData));
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    });
};

//data comments dari url
const fetchComment = fetch(url)
  .then((respone) => {
    return respone.json();
  })
  .then((data) => {
    return data;
  });

function modifiedDataComment(data) {
  const newData = data.map((item) => ({
    postId: item.postId,
    name: item.name,
    email: item.email,
    content: item.body,
  }));
  return newData;
}

module.exports = { commentHandler, fetchComment };
