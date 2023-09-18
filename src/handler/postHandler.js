const postHandler = {};

const url = "https://jsonplaceholder.typicode.com/posts";

postHandler.getAllPost = (req, res) => {
  fetchPost
    .then((dataPost) => {
      const modifiedData = modifiedDataPost(dataPost);

      res.end(JSON.stringify(modifiedData));
    })
    .catch((error) => {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    });
};

const fetchPost = fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  });

function modifiedDataPost(data) {
  const newData = data.map((item) => ({
    userId: item.userId,
    postId: item.id,
    judulPost: item.title,
    content: item.body,
  }));
  return newData;
}

module.exports = { postHandler, fetchPost };
