/**
 * PTG DC Central Portal - Gmail announcement feed
 *
 * Deploy this project as a Web app from nattapol.sa@pt.co.th.  The script only
 * returns messages from the current month in Asia/Bangkok and only when their
 * sender/name/subject/body identifies PT Happy Workplace or PTG Academy.
 */
const PORTAL_TIME_ZONE = 'Asia/Bangkok';
const MAX_THREADS = 30;
const MAX_IMAGE_BYTES = 2.5 * 1024 * 1024;
const MIN_CONTENT_IMAGE_BYTES = 30 * 1024;
const ALLOWED_NEWS_PATTERN = /pt\s*(happy\s*workplace|g\s*academy)|happy\s*workplace|ptg\s*academy/i;
// Search Gmail narrowly before reading messages/attachments. Curly braces are
// Gmail's OR operator: known PT Happy Workplace sender OR PTG Academy text.
const GMAIL_NEWS_QUERY = '{from:pt_happyworkplace@pt.co.th "PTG Academy"}';

function doGet(e) {
  return jsonOutput_(buildFeed_(e && e.parameter));
}

/**
 * Builds the feed independently from HTTP so the built-in test can validate
 * the exact same Gmail data path used by the Portal.
 */
function buildFeed_(params) {
  const range = currentBangkokMonth_(params);
  const threads = findThreadsInRange_(range);
  const messages = threads
    .flatMap(thread => thread.getMessages())
    .filter(message => isInRange_(message.getDate(), range))
    .filter(isAllowedNews_)
    .map(messageToItem_)
    .sort((a, b) => b.createdAt - a.createdAt);

  return {
    data: messages,
    meta: {
      timeZone: PORTAL_TIME_ZONE,
      year: range.year,
      month: range.month,
      count: messages.length
    }
  };
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function currentBangkokMonth_(params) {
  const now = new Date();
  const currentYear = Number(Utilities.formatDate(now, PORTAL_TIME_ZONE, 'yyyy'));
  const currentMonth = Number(Utilities.formatDate(now, PORTAL_TIME_ZONE, 'M'));

  // Never permit the public feed to request historical/future mail. The query
  // parameters are only a guard against client/server month-boundary mismatch.
  const requestedYear = Number(params && params.year);
  const requestedMonth = Number(params && params.month);
  if ((requestedYear && requestedYear !== currentYear) ||
      (requestedMonth && requestedMonth !== currentMonth)) {
    throw new Error('Only the current Bangkok month is available.');
  }

  const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  return {
    year: currentYear,
    month: currentMonth,
    monthKey: `${currentYear}-${String(currentMonth).padStart(2, '0')}`,
    after: `${currentYear}/${String(currentMonth).padStart(2, '0')}/01`,
    before: `${nextYear}/${String(nextMonth).padStart(2, '0')}/01`
  };
}

function findThreadsInRange_(range) {
  const query = `after:${range.after} before:${range.before} ${GMAIL_NEWS_QUERY}`;
  const threads = [];

  for (let offset = 0; offset < MAX_THREADS; offset += 100) {
    const page = GmailApp.search(query, offset, Math.min(100, MAX_THREADS - offset));
    threads.push(...page);
    if (page.length < 100) break;
  }
  return threads;
}

function isInRange_(date, range) {
  return Utilities.formatDate(date, PORTAL_TIME_ZONE, 'yyyy-MM') === range.monthKey;
}

function isAllowedNews_(message) {
  // Gmail has already narrowed the search. Avoid reading every full email body
  // here because inline campaign images make that unnecessarily slow.
  const searchable = [message.getFrom(), message.getSubject()].join('\n');
  return ALLOWED_NEWS_PATTERN.test(searchable);
}

function messageToItem_(message) {
  const image = firstImageDataUri_(message);
  return {
    id: message.getId(),
    messageId: message.getId(),
    subject: message.getSubject(),
    from: message.getFrom(),
    date: message.getDate().toISOString(),
    body: cleanPlainBody_(message.getPlainBody()),
    imageBase64: image,
    type: 'event',
    isPinned: false
  };
}

function firstImageDataUri_(message) {
  // Gmail returns inline images in MIME order. The first is often a logo or an
  // App Store badge, not the campaign poster. Pick the largest content-sized
  // image instead, while ignoring tiny decorative assets.
  const candidates = message.getAttachments({ includeInlineImages: true, includeAttachments: true })
    .filter(blob => /^image\//i.test(blob.getContentType()))
    .map(blob => ({ blob, bytes: blob.getBytes() }))
    .filter(item => item.bytes.length >= MIN_CONTENT_IMAGE_BYTES)
    .filter(item => item.bytes.length <= MAX_IMAGE_BYTES)
    .sort((a, b) => b.bytes.length - a.bytes.length);

  if (!candidates.length) return '';
  const image = candidates[0];
  return `data:${image.blob.getContentType()};base64,${Utilities.base64Encode(image.bytes)}`;
}

function cleanPlainBody_(body) {
  return body
    .replace(/^\s*\[image:[^\]]+\]\s*$/gim, '')
    .replace(/^\s*<https?:\/\/[^>]+>\s*$/gim, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Manual integration test for the Gmail announcement feed.
 * Run this function from the Apps Script editor while signed in as
 * nattapol.sa@pt.co.th, then inspect the Execution log for the report.
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
    const itemMonth = Utilities.formatDate(new Date(item.date), PORTAL_TIME_ZONE, 'yyyy-MM');
    if (itemMonth !== expectedMonthKey) failures.push(`Out-of-month item: ${item.subject}`);
    if (!ALLOWED_NEWS_PATTERN.test(`${item.from}\n${item.subject}`)) {
      failures.push(`Unexpected source: ${item.from} — ${item.subject}`);
    }
    if (!item.id || !item.subject || !item.from) {
      failures.push(`Missing required email fields: ${item.id || '(no id)'}`);
    }
    // Some campaign emails are intentionally image-only. They are valid news
    // as long as the card has a lead image, so body text is not mandatory.
    if (!item.body && !item.imageBase64) {
      failures.push(`No readable content or image: ${item.subject}`);
    }
    if (!item.imageBase64 || !item.imageBase64.startsWith('data:image/')) {
      warnings.push(`No supported image found: ${item.subject}`);
    }
  });

  const report = {
    passed: failures.length === 0,
    checkedAt: Utilities.formatDate(now, PORTAL_TIME_ZONE, 'yyyy-MM-dd HH:mm:ss'),
    month: expectedMonthKey,
    totalNews: feed.data.length,
    newsWithImages: feed.data.filter(item => item.imageBase64 && item.imageBase64.startsWith('data:image/')).length,
    failures,
    warnings,
    items: feed.data.map(item => ({
      date: Utilities.formatDate(new Date(item.date), PORTAL_TIME_ZONE, 'yyyy-MM-dd HH:mm'),
      source: item.from,
      subject: item.subject,
      hasImage: Boolean(item.imageBase64)
    }))
  };

  console.log(JSON.stringify(report, null, 2));
  if (!report.passed) throw new Error(`Gmail feed test failed: ${failures.join(' | ')}`);
  return report;
}
