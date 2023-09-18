const url = "https://jsonplaceholder.typicode.com/comments";

const commentHandler = {};

commentHandler.getAllComment = (req, res) => {
  fetchComment.then((dataComment) => {
    const modifiedData = modifiedDataComment(dataComment);
    res.end(JSON.stringify(modifiedData));
  });
};

const fetchComment = fetch(url)
  .then((respone) => {
    if (!respone.ok) {
      throw new Error(`HTTP Error! Status ${respone.status}`);
    }
    return respone.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.log(error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
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
