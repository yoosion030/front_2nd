module.exports = async ({ coverage, github, context }) => {
  const totalCoverage = coverage.total;

  const coverageComment = `
## 테스트 성공 ✅
### 커버리지 결과

- 라인 커버리지: ${totalCoverage.lines.pct}%
- 브랜치 커버리지: ${totalCoverage.branches.pct}%
- 함수 커버리지: ${totalCoverage.functions.pct}%
- 구문 커버리지: ${totalCoverage.statements.pct}%
`;

  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: coverageComment,
  });
};
