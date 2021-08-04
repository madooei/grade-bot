/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    console.log("Recived: issues.opened");
    const response = context.issue({
      body: "Thanks for opening this issue!",
    });
    console.log(response);
    return context.octokit.issues.createComment(response);
  });

  app.on("commit_comment.created", async (context) => {
    console.log("Received: commit_comment.created");
    const body = context.payload.comment.body;
    if (body.includes("@grade-bot")) {
      const response = context.repo({
        body: "I acknowledge the reception of your comment!",
        commit_sha: context.payload.comment.commit_id
      });
      return context.octokit.repos.createCommitComment(response);
    }
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
