const reviewers = ["yoosion030", "dhp94d", "lydiahjchung", "callipenguin"];

const getRandomReviewer = (reviewers) => {
  const randomReviewer =
    reviewers[Math.floor(Math.random() * reviewers.length)];

  return randomReviewer;
};

const commentReviewer = async ({ github, context }) => {
  const randomReviewer = getRandomReviewer(reviewers);

  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: `@${randomReviewer}, 리뷰를 부탁드립니다.`,
  });
};

const assignReviewer = async ({ github, context }) => {
  const randomReviewer = getRandomReviewer(reviewers);

  await github.rest.pulls.requestReviewers({
    pull_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    reviewers: [randomReviewer],
  });
};

module.exports = {
  commentReviewer,
  assignReviewer,
};
