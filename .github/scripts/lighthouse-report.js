module.exports = async ({ github, context, results, audits }) => {
  let comments = "";

  results.forEach((result) => {
    const { summary, jsonPath } = result;

    const formatResult = (res) => Math.round(res * 100);

    Object.keys(summary).forEach(
      (key) => (summary[key] = formatResult(summary[key]))
    );

    const score = (res) => (res >= 90 ? "🟢" : res >= 50 ? "🟠" : "🔴");

    const comment = [
      `⚡️ Lighthouse report!`,
      `| Category | Score |`,
      `| --- | --- |`,
      `| ${score(summary.performance)} Performance | ${summary.performance} |`,
      `| ${score(summary.accessibility)} Accessibility | ${
        summary.accessibility
      } |`,
      `| ${score(summary["best-practices"])} Best practices | ${
        summary["best-practices"]
      } |`,
      `| ${score(summary.seo)} SEO | ${summary.seo} |`,
      "",
    ].join("\n");

    const detail = [
      `📊 Lighthouse Detail`,
      `| Category | Score |`,
      `| --- | --- |`,
      `| ${score(
        audits["first-contentful-paint"].score * 100
      )} First Contentful Paint | ${
        audits["first-contentful-paint"].displayValue
      } |`,
      `| ${score(
        audits["largest-contentful-paint"].score * 100
      )} Largest Contentful Paint | ${
        audits["largest-contentful-paint"].displayValue
      } |`,
      `| ${score(
        audits["total-blocking-time"].score * 100
      )} Total Blocking Time | ${audits["total-blocking-time"].displayValue} |`,
      `| ${score(
        audits["cumulative-layout-shift"].score * 100
      )} Cumulative Layout Shift | ${
        audits["cumulative-layout-shift"].displayValue
      } |`,
      `| ${score(audits["speed-index"].score * 100)} Speed Index | ${
        audits["speed-index"].displayValue
      } |`,
    ].join("\n");

    comments += comment + "\n" + detail + "\n";
  });

  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: comments,
  });
};
