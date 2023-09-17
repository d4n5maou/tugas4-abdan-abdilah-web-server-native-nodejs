const postHandler = {};

const url = "https://jsonplaceholder.typicode.com/posts";

postHandler.getAllPost = (req, res) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const modifiedData = modifiedDataPost(data);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(modifiedData));
    })
    .catch((error) => {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    });
};

function modifiedDataPost(data) {
  const newData = data.map((item) => ({
    userId: item.userId,
    postId: item.id,
    judulPost: item.title,
    content: item.body,
  }));
  return newData;
}

module.exports = postHandler;
