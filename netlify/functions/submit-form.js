// Use dynamic import for Octokit
exports.handler = async (event) => {
    const { Octokit } = await import("@octokit/core");
  
    const token = process.env.GITHUB_TOKEN;
    const octokit = new Octokit({ auth: token });
  
    const body = JSON.parse(event.body);
    const filename = `${body.name.replace(/\s+/g, '_')}_${Date.now()}.json`;
    const content = Buffer.from(JSON.stringify(body, null, 2)).toString("base64");
  
    try {
      await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
        owner: "Rafi-Ahmed-Oronno", // Replace with your GitHub username
        repo: "Student-Form",           // Replace with your GitHub repository name
        path: `Student-Data/${filename}`, // Updated folder name to Student-Data
        message: `Add student data: ${body.name}`,
        content
      });
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Saved!" }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to save." }),
      };
    }
  };
  