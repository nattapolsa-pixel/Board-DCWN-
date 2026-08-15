# Gmail feed deployment

Deploy `Code.gs` as a standalone Google Apps Script project while signed in as
`nattapol.sa@pt.co.th`.

1. Create a new Apps Script project and paste in `Code.gs`.
2. Run `doGet` once from the editor and authorize Gmail read access.
3. Deploy it as a **Web app**. Use the organisation's approved access setting;
   the Portal browser must be allowed to call the URL.
4. Copy the `/exec` deployment URL into `GAS_EMAIL_URL` in `app.js`.

The endpoint has a hard server-side boundary: it only emits messages dated in
the current calendar month for `Asia/Bangkok`. It accepts `year` and `month`
only to verify the caller agrees with that current month; it rejects any other
period.

`ALLOWED_NEWS_PATTERN` is the selection rule. Before deployment, test it with
the actual sender display names or email addresses used by PT Happy Workplace
and PTG Academy, then adjust the expression if needed.

For privacy and payload control, the API returns only the first image attachment
or inline image per message and skips images above 1.8 MB. The returned image is
a data URI, which the existing Portal can render without making a Google Drive
file public.
