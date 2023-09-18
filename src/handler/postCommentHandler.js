const { fetchPost } = require("./postHandler.js");
const { fetchComment } = require("./commentHandler.js");

const postCommentHandler = {};

postCommentHandler.getAllPostComment = (req, res) => {
  mergeData(res);
};

function mergeData(res) {
  fetchPost
    .then((dataPost) => {
      fetchComment
        .then((dataComment) => {
          const combinedData = dataPost.map((post) => {
            const comments = dataComment.filter((comment) => {
              if (comment.postId === post.id) {
                return comment;
              }
            });
            return {
              id: post.id,
              judulPost: post.title,
              contentPost: post.body,
              comments: comments.map((c) => ({
                postId: c.postId,
                namaUser: c.name,
                emailUser: c.email,
                contentComment: c.body,
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
}

module.exports = postCommentHandler;
