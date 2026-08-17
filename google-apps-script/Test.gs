/**
 * Manual integration test for the Gmail announcement feed.
 * Run testCurrentMonthNewsFeed from the Apps Script editor while signed in as
 * nattapol.sa@pt.co.th, then view the Execution log for the report.
 */
function testCurrentMonthNewsFeed() {
  const feed = buildFeed_({});
  const now = new Date();
  const expectedMonthKey = Utilities.formatDate(now, PORTAL_TIME_ZONE, 'yyyy-MM');
  const failures = [];
  const warnings = [];

  if (feed.meta.timeZone !== PORTAL_TIME_ZONE) {
    failures.push(`Expected timezone ${PORTAL_TIME_ZONE}, got ${feed.meta.timeZone}`);
  }
  if (feed.meta.count !== feed.data.length) {
    failures.push(`Count mismatch: meta=${feed.meta.count}, data=${feed.data.length}`);
  }
  if (!feed.data.length) {
    failures.push('No PT Happy Workplace / PTG Academy news found this month.');
  }

  feed.data.forEach(item => {
    const itemMonth = Utilities.formatDate(new Date(item.createdAt), PORTAL_TIME_ZONE, 'yyyy-MM');
    if (itemMonth !== expectedMonthKey) {
      failures.push(`Out-of-month item: ${item.subject}`);
    }
    if (!ALLOWED_NEWS_PATTERN.test(`${item.author}\n${item.title}`)) {
      failures.push(`Unexpected source: ${item.author} — ${item.title}`);
    }
    if (!item.id || !item.title || !item.author || !item.content) {
      failures.push(`Missing required email fields: ${item.id || '(no id)'}`);
    }
    if (!item.image || !item.image.startsWith('data:image/')) {
      warnings.push(`No supported image found: ${item.title}`);
    }
  });

  const report = {
    passed: failures.length === 0,
    checkedAt: Utilities.formatDate(now, PORTAL_TIME_ZONE, 'yyyy-MM-dd HH:mm:ss'),
    month: expectedMonthKey,
    totalNews: feed.data.length,
    newsWithImages: feed.data.filter(item => item.image && item.image.startsWith('data:image/')).length,
    failures,
    warnings,
    items: feed.data.map(item => ({
      date: Utilities.formatDate(new Date(item.createdAt), PORTAL_TIME_ZONE, 'yyyy-MM-dd HH:mm'),
      source: item.author,
      subject: item.title,
      hasImage: Boolean(item.image)
    }))
  };

  console.log(JSON.stringify(report, null, 2));
  if (!report.passed) throw new Error(`Gmail feed test failed: ${failures.join(' | ')}`);
  return report;
}
