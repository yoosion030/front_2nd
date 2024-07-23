module.exports = async ({ github, context, eslintReport }) => {
  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: `
## ESLint Results

${eslintReport}
    `,
  });
};
