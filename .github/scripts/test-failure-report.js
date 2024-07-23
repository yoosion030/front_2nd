module.exports = async ({ github, context }) => {
  const comment = `
## 테스트 실패 ❌

테스트 코드를 확인해주세요.
`;

  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: comment,
  });
};
