const { Octokit } = require("@octokit/rest");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const filename = new Date().toISOString().replace(/[:.]/g, '-') + '.json';
  const content = Buffer.from(JSON.stringify({
    ...body,
    submittedAt: new Date().toISOString()
  }, null, 2)).toString('base64');

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: "Rafi-Ahmed-Oronno",
      repo: "student-form-app",
      path: `Student-Data/${filename}`,
      message: "New student form submission",
      content
    });

    return {
      statusCode: 200,
      body: "Submission successful!"
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Failed to submit: " + err.message
    };
  }
};