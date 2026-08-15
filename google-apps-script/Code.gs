/**
 * PTG DC Central Portal - Gmail announcement feed
 *
 * Deploy this project as a Web app from nattapol.sa@pt.co.th.  The script only
 * returns messages from the current month in Asia/Bangkok and only when their
 * sender/name/subject/body identifies PT Happy Workplace or PTG Academy.
 */
const PORTAL_TIME_ZONE = 'Asia/Bangkok';
const MAX_MESSAGES = 80;
const MAX_IMAGE_BYTES = 1.8 * 1024 * 1024;
const ALLOWED_NEWS_PATTERN = /pt\s*(happy\s*workplace|g\s*academy)|happy\s*workplace|ptg\s*academy/i;

function doGet(e) {
  const range = currentBangkokMonth_(e && e.parameter);
  const threads = findThreadsInRange_(range);
  const messages = threads
    .flatMap(thread => thread.getMessages())
    .filter(message => isInRange_(message.getDate(), range))
    .filter(isAllowedNews_)
    .map(messageToItem_)
    .sort((a, b) => b.createdAt - a.createdAt);

  return ContentService
    .createTextOutput(JSON.stringify({
      data: messages,
      meta: {
        timeZone: PORTAL_TIME_ZONE,
        year: range.year,
        month: range.month,
        count: messages.length
      }
    }))
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
  const query = `after:${range.after} before:${range.before}`;
  const threads = [];

  for (let offset = 0; offset < MAX_MESSAGES; offset += 100) {
    const page = GmailApp.search(query, offset, Math.min(100, MAX_MESSAGES - offset));
    threads.push(...page);
    if (page.length < 100) break;
  }
  return threads;
}

function isInRange_(date, range) {
  return Utilities.formatDate(date, PORTAL_TIME_ZONE, 'yyyy-MM') === range.monthKey;
}

function isAllowedNews_(message) {
  const searchable = [message.getFrom(), message.getSubject(), message.getPlainBody()].join('\n');
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
    body: message.getPlainBody(),
    imageBase64: image,
    type: 'event',
    isPinned: false
  };
}

function firstImageDataUri_(message) {
  const images = message.getAttachments({ includeInlineImages: true, includeAttachments: true })
    .filter(blob => /^image\//i.test(blob.getContentType()))
    .filter(blob => blob.getBytes().length <= MAX_IMAGE_BYTES);

  if (!images.length) return '';
  const image = images[0];
  return `data:${image.getContentType()};base64,${Utilities.base64Encode(image.getBytes())}`;
}
