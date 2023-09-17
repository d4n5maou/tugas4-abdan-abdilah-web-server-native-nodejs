const postCommentHandler = {};

const postUrl = "https://jsonplaceholder.typicode.com/posts";
const commentUrl = "https://jsonplaceholder.typicode.com/comments";

postCommentHandler.getAllPostComment = (req, res) => {
  fetch(postUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((postData) => {
      fetch(commentUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((commentData) => {
          const combinedData = postData.map((postItem) => {
            const comments = commentData.filter(
              (commentItem) => commentItem.postId === postItem.id
            );
            return {
              id: postItem.id,
              judulPost: postItem.title,
              contentPost: postItem.body,
              comments: comments.map((comment) => ({
                postId: comment.postId,
                nameUser: comment.name,
                emailUser: comment.email,
                contentComment: comment.body,
              })),
            };
          });

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(combinedData));
        })
        .catch((error) => {
          console.error(error);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        });
    })
    .catch((error) => {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    });
};

module.exports = postCommentHandler;
