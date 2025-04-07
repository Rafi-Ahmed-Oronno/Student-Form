const year = new Date().getFullYear();
const filePath = `Student-Data/${year}/${year}.json`;

const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
  owner: 'Rafi-Ahmed-Oronno',
  repo: 'Student-Form',
  path: filePath
}).catch(() => null);

let existingData = [];

if (response && response.data && response.data.content) {
  const content = Buffer.from(response.data.content, 'base64').toString();
  existingData = JSON.parse(content);
}

existingData.push(studentData); // your submitted object

const updatedContent = Buffer.from(JSON.stringify(existingData, null, 2)).toString('base64');

await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
  owner: 'Rafi-Ahmed-Oronno',
  repo: 'Student-Form',
  path: filePath,
  message: `Update student data for ${year}`,
  content: updatedContent,
  sha: response?.data?.sha // only add sha if file existed
});