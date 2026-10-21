# Admin and enquiry contract

Source: owner request, 21 October 2026. `/victoria-admin-panel` uses login/password, one active server session per account, owner-managed admins, visitor activity retained 90 days, and enquiries retained until owner deletion. Neon PostgreSQL and Prisma are the persistence owners.

| Capability | Owner | Contract |
|---|---|---|
| Authentication and permissions | `lib/admin/auth.ts`, admin API | Every private request verifies session and enabled account; only OWNER manages admins/settings/deletions. New login replaces prior session atomically. |
| Form | Admin UI field component; existing EnquiryForm for public forms | Native inputs, noValidate, associated errors, first-invalid focus, pending lock, no password storage in browser. |
| Select/Listbox | Native select | OS-owned selection; status and role labels in English. |
| Date | Native date input | Browser-owned; UTC database timestamps, IST dashboard display. |
| Scrollbar | globals.css | Inherited tokens, visible internal horizontal table scrolling. |
| Feedback | Admin status region | Inline error/retry and aria-live status; no native dialogs. |
| CRUD | Admin API and Dashboard | Pessimistic writes; disable/delete/reset require explicit app-owned confirmation. No self-disable or owner role changes. Refresh after success, preserve input on failure. |
| Lists | Admin API | 25-row pagination, search/page in URL, UTC sorting; visitor timelines paginate all retained events in 100-row pages. No bulk selection. |
| Consent | CookieConsent and VisitorTracker | No analytics requests or visitor identifier before Accept. Revocation clears identifier and stops collection. Never collect input values, keyboard input, query strings, or full URLs. Contact details saved only on explicit enquiry submission with contact permission. |

Audit records are append-only through the application. User-initiated data reads (excluding background polling), login outcomes, logout, session changes and mutations are stored. Passwords and session tokens never enter audit data. Events are descriptive click/page/depth metadata, not session recordings. Public events are untrusted and may include bots. Active means a heartbeat in the last two minutes, not proof of a human. No IP-to-person identification or fingerprinting.
