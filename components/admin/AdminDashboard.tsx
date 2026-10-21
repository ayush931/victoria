"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type Admin = { id: string; name: string; login: string; role: string };
type Activity = {
  id: string;
  kind: string;
  path: string;
  target?: string;
  depth?: number;
  createdAt: string;
};
type Row = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  residence?: string;
  message?: string;
  preferredDate?: string;
  transfer?: boolean;
  status?: string;
  sourcePath?: string;
  visitorId?: string;
  firstSeen?: string;
  lastSeen?: string;
  createdAt?: string;
  login?: string;
  role?: string;
  enabled?: boolean;
  actor?: string;
  action?: string;
  target?: string;
  ip?: string;
  userAgent?: string;
  session?: { lastSeen: string; expiresAt: string };
  leads?: { name: string; email: string; phone?: string }[];
  visits?: {
    id: string;
    startedAt: string;
    lastSeen: string;
    device: string;
    browser: string;
    referrer?: string;
    events?: { path: string }[];
  }[];
  _count?: { visits: number };
};
type Data = {
  admin?: Admin;
  items?: Row[];
  total?: number;
  page?: number;
  visitors?: number;
  views?: number;
  clicks?: number;
  newLeads?: number;
  active?: number;
  tracking?: boolean;
  trackingEnabled?: boolean;
  pages?: { path: string; views: number }[];
  recent?: Row[];
  days?: { day: string; views: number }[];
  visitor?: Row;
  events?: Activity[];
  error?: string;
  fields?: Record<string, string[]>;
};
type Confirmation = {
  title: string;
  description: string;
  action: string;
  route: string;
  method: string;
  body?: Record<string, unknown>;
  password?: boolean;
};
const NAV = [
  ["overview", "Overview"],
  ["visitors", "Visitors"],
  ["leads", "Enquiries"],
  ["audit", "Audit log"],
  ["admins", "Administrators"],
  ["settings", "Website settings"],
  ["account", "My account"],
];
const date = (value?: string) =>
  value
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(new Date(value))
    : "—";
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fields?: Record<string, string[]>,
  ) {
    super(message);
  }
}
async function api(
  path: string,
  method = "GET",
  body?: Record<string, unknown>,
  signal?: AbortSignal,
): Promise<Data> {
  const response = await fetch(`/api/admin/${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    signal,
  });
  const result = await response.json();
  if (!response.ok)
    throw new ApiError(
      result.error || "Request failed. Please try again.",
      response.status,
      result.fields,
    );
  return result;
}
function Field({
  name,
  label,
  type = "text",
  error,
  autoComplete,
  required = true,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="admin-field">
      <label htmlFor={`admin-${name}`}>
        {label}
        {required ? " *" : ""}
      </label>
      <div className="admin-input-wrap">
        <input
          id={`admin-${name}`}
          name={name}
          type={type === "password" && show ? "text" : type}
          autoComplete={autoComplete}
          required={required}
          maxLength={type === "password" ? 128 : 200}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `admin-${name}-error` : undefined}
        />
        {type === "password" && (
          <button
            type="button"
            className="admin-show"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && (
        <p className="admin-error" id={`admin-${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
function Empty({ children }: { children: React.ReactNode }) {
  return <div className="admin-empty">{children}</div>;
}
function Table({
  headers,
  children,
  label,
}: {
  headers: string[];
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="admin-table-scroll"
      tabIndex={0}
      role="region"
      aria-label={label}
    >
      <table>
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
function Status({ value }: { value: string }) {
  return (
    <span className={`admin-badge admin-badge--${value.toLowerCase()}`}>
      {value.replaceAll("_", " ")}
    </span>
  );
}
function ConfirmDialog({
  confirmation,
  busy,
  error,
  onCancel,
  onConfirm,
}: {
  confirmation: Confirmation;
  busy: boolean;
  error: string;
  onCancel: () => void;
  onConfirm: (password?: string) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const [passwordError, setPasswordError] = useState("");
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const node = dialog.current;
    node?.showModal();
    cancel.current?.focus();
    return () => {
      node?.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      className="admin-dialog"
      ref={dialog}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-description"
      onCancel={(event) => {
        if (busy) event.preventDefault();
        else onCancel();
      }}
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          const password = String(
            new FormData(event.currentTarget).get("replacement") || "",
          );
          if (
            confirmation.password &&
            (password.length < 15 || password.length > 128)
          ) {
            setPasswordError("Use 15–128 characters.");
            event.currentTarget
              .querySelector<HTMLInputElement>("input")
              ?.focus();
            return;
          }
          setPasswordError("");
          onConfirm(password);
        }}
      >
        <p className="admin-eyebrow">Confirm change</p>
        <h2 id="confirm-title">{confirmation.title}</h2>
        <p id="confirm-description">{confirmation.description}</p>
        {confirmation.password && (
          <>
            <Field
              name="replacement"
              label="New password (at least 15 characters)"
              type="password"
              autoComplete="new-password"
              error={passwordError}
            />
            <p className="admin-hint">
              Use 15–128 characters. Share this password securely with the
              administrator.
            </p>
          </>
        )}
        {error && (
          <p role="alert" className="admin-error">
            {error}
          </p>
        )}
        <div className="admin-actions">
          <button
            ref={cancel}
            type="button"
            className="admin-button admin-button--secondary"
            disabled={busy}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="admin-button admin-button--danger" disabled={busy}>
            {busy ? "Saving…" : confirmation.action}
          </button>
        </div>
      </form>
    </dialog>
  );
}
function SearchForm({
  initial,
  label,
  onSearch,
}: {
  initial: string;
  label: string;
  onSearch: (query: string) => void;
}) {
  const [value, setValue] = useState(initial);
  const input = useRef<HTMLInputElement>(null);
  return (
    <form
      className="admin-search"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(value);
      }}
    >
      <label htmlFor="admin-search">{label}</label>
      <div>
        <input
          ref={input}
          id="admin-search"
          name="q"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          maxLength={100}
        />
        <button className="admin-button admin-button--secondary">Search</button>
        {value && (
          <button
            type="button"
            className="admin-button admin-button--secondary"
            aria-label="Clear search"
            onClick={() => {
              setValue("");
              onSearch("");
              input.current?.focus();
            }}
          >
            Clear ×
          </button>
        )}
      </div>
    </form>
  );
}
export default function AdminDashboard() {
  const router = useRouter();
  const params = useSearchParams();
  const requested = params.get("tab") || "overview";
  const tab = NAV.some(([id]) => id === requested) ? requested : "overview";
  const page = Math.max(1, Math.floor(Number(params.get("page"))) || 1),
    query = params.get("q") || "";
  const visitorId = params.get("visitor");
  const pageSize = visitorId ? 100 : 25;
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [boot, setBoot] = useState(true);
  const [setupError, setSetupError] = useState("");
  const [resource, setResource] = useState<{ key: string; data: Data } | null>(
    null,
  );
  const [loadError, setLoadError] = useState("");
  const [revision, setRevision] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [confirmError, setConfirmError] = useState("");
  const selectedLead = params.get("lead");
  const allowed = NAV.filter(
    ([key]) =>
      admin?.role === "OWNER" || !["admins", "settings", "audit"].includes(key),
  );
  const forbidden =
    admin?.role !== "OWNER" && ["admins", "settings", "audit"].includes(tab);
  const endpoint =
    tab === "visitors" && visitorId ? `visitors/${visitorId}` : tab;
  const viewKey = `${endpoint}?page=${page}&q=${encodeURIComponent(query)}`;
  const key = `${viewKey}#${revision}`;
  const data = resource?.key === viewKey ? resource.data : null;
  const go = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(changes).forEach(([k, v]) =>
      v === null ? next.delete(k) : next.set(k, v),
    );
    router.replace(`/victoria-admin-panel?${next}`);
    setMessage("");
    setFormError("");
    setFields({});
  };
  const sessionLost = (error: unknown) => {
    if (error instanceof ApiError && error.status === 401) {
      setAdmin(null);
      setResource(null);
      setFormError(error.message);
      return true;
    }
    return false;
  };
  useEffect(() => {
    let disposed = false;
    api("auth/session")
      .then((result) => {
        if (!disposed) setAdmin(result.admin || null);
      })
      .catch((error) => {
        if (!disposed && error.status !== 401) setSetupError(error.message);
      })
      .finally(() => {
        if (!disposed) setBoot(false);
      });
    return () => {
      disposed = true;
    };
  }, []);
  useEffect(() => {
    if (!admin || tab === "account" || forbidden) return;
    const controller = new AbortController();
    let pending = false;
    const load = async (background = false) => {
      if (pending || (background && document.hidden)) return;
      pending = true;
      try {
        const result = await api(
          `${endpoint}?page=${page}&q=${encodeURIComponent(query)}${background ? "&background=1" : ""}`,
          "GET",
          undefined,
          controller.signal,
        );
        if (!controller.signal.aborted) {
          setResource({ key: viewKey, data: result });
          setLoadError("");
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError" && !sessionLost(error))
          setLoadError((error as Error).message);
      } finally {
        pending = false;
      }
    };
    void load();
    const timer = ["overview", "visitors"].includes(tab)
      ? setInterval(() => {
          void load(true);
        }, 30000)
      : undefined;
    return () => {
      controller.abort();
      clearInterval(timer);
    };
    // The stable request key includes every endpoint parameter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin?.id, key, forbidden]);
  useEffect(() => {
    if (!admin) return;
    const timer = setInterval(
      () => api("auth/session").catch(sessionLost),
      60000,
    );
    const focus = () => {
      void api("auth/session").catch(sessionLost);
    };
    window.addEventListener("focus", focus);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", focus);
    };
  }, [admin]);
  function showFormError(error: unknown, form: HTMLFormElement) {
    const e = error as ApiError;
    setFormError(e.message);
    setFields(e.fields || {});
    const first = Object.keys(e.fields || {})[0];
    if (first)
      form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
    sessionLost(error);
  }
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setBusy(true);
    setFormError("");
    try {
      const result = await api("auth/login", "POST", values);
      form.reset();
      setAdmin(result.admin || null);
      setSetupError("");
      setFields({});
    } catch (error) {
      showFormError(error, form);
    } finally {
      setBusy(false);
    }
  }
  async function mutate(
    route: string,
    method: string,
    body?: Record<string, unknown>,
  ) {
    await api(route, method, body);
    setRevision((v) => v + 1);
    if (method === "DELETE") go({ page: null, lead: null });
    setMessage("Changes saved.");
  }
  async function createAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    setBusy(true);
    setFormError("");
    setFields({});
    try {
      await mutate("admins", "POST", Object.fromEntries(new FormData(form)));
      form.reset();
    } catch (error) {
      showFormError(error, form);
    } finally {
      setBusy(false);
    }
  }
  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    setBusy(true);
    setFormError("");
    try {
      await api(
        "auth/password",
        "POST",
        Object.fromEntries(new FormData(form)),
      );
      form.reset();
      setAdmin(null);
      setMessage("Password changed. Sign in again.");
    } catch (error) {
      showFormError(error, form);
    } finally {
      setBusy(false);
    }
  }
  async function confirm(password?: string) {
    if (!confirmation || busy) return;
    setBusy(true);
    setConfirmError("");
    try {
      await mutate(confirmation.route, confirmation.method, {
        ...confirmation.body,
        ...(confirmation.password ? { password } : {}),
      });
      setConfirmation(null);
    } catch (error) {
      setConfirmError((error as Error).message);
      sessionLost(error);
    } finally {
      setBusy(false);
    }
  }
  const openConfirm = (value: Confirmation) => {
    setConfirmError("");
    setConfirmation(value);
  };
  if (boot)
    return (
      <main id="main-content" className="admin-app admin-login">
        <p role="status">Checking secure session…</p>
      </main>
    );
  if (!admin)
    return (
      <main id="main-content" className="admin-app admin-login">
        <div className="admin-login-art">
          <Link href="/" className="admin-brand">
            victorino<span>STUDIO / CONTROL ROOM</span>
          </Link>
          <div>
            <p className="admin-eyebrow">A clearer view of your website</p>
            <h1>
              Know the journey.
              <br />
              <em>Welcome the next chapter.</em>
            </h1>
            <p>
              Visitor insights, enquiries and a complete record of your team’s
              work.
            </p>
          </div>
          <span className="admin-mono">Private access · Goa, India</span>
        </div>
        <section className="admin-login-panel">
          <p className="admin-eyebrow">Victoria admin panel</p>
          <h2>Welcome back.</h2>
          <p>Sign in with your studio login ID and password.</p>
          {setupError && (
            <div className="admin-notice" role="alert">
              <strong>Database setup required</strong>
              <p>{setupError}</p>
              <p>
                Configure Neon, deploy the Prisma migration, then run the owner
                setup command in the project README.
              </p>
              <button
                className="admin-button admin-button--secondary"
                onClick={() => location.reload()}
              >
                Check again
              </button>
            </div>
          )}
          <form noValidate onSubmit={login}>
            <Field
              name="login"
              label="Login ID"
              autoComplete="username"
              error={fields.login?.[0]}
            />
            <Field
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              error={fields.password?.[0]}
            />
            {formError && (
              <p role="alert" className="admin-error">
                {formError}
              </p>
            )}
            <button
              className="admin-button"
              disabled={busy || Boolean(setupError)}
            >
              {busy ? "Signing in…" : "Sign in →"}
            </button>
            <p className="admin-hint">
              Signing in replaces any previous session for this account.
            </p>
          </form>
          <p role="status">{message}</p>
          <Link href="/" className="admin-back">
            ← Back to website
          </Link>
        </section>
      </main>
    );
  return (
    <div className="admin-app admin-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand">
          victorino<span>STUDIO / CONTROL ROOM</span>
        </Link>
        <nav aria-label="Admin navigation">
          {allowed.map(([id, label]) => (
            <Link
              key={id}
              href={`/victoria-admin-panel?tab=${id}`}
              aria-current={tab === id ? "page" : undefined}
            >
              {label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <Status value={admin.role} />
          <strong>{admin.name}</strong>
          <span>{admin.login}</span>
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await api("auth/logout", "POST");
                setAdmin(null);
                setResource(null);
                setMessage("Signed out.");
              } catch (error) {
                setFormError((error as Error).message);
                sessionLost(error);
              } finally {
                setBusy(false);
              }
            }}
          >
            Sign out ↗
          </button>
        </div>
      </aside>
      <main id="main-content" className="admin-main">
        <header className="admin-topbar">
          <span className="admin-mono">VICTORINO / WEBSITE OPERATIONS</span>
          <Link href="/" target="_blank" rel="noopener noreferrer">
            View website ↗
          </Link>
        </header>
        <div className="admin-heading">
          <div>
            <p className="admin-eyebrow">Your studio, at a glance</p>
            <h1>{NAV.find(([id]) => id === tab)?.[1]}</h1>
            <p>
              {tab === "overview"
                ? "Last 7 days · times shown in IST"
                : tab === "visitors"
                  ? "Consented activity · retained for 90 days"
                  : tab === "leads"
                    ? "Contact details shared through the enquiry form"
                    : tab === "audit"
                      ? "Database-backed history of admin access and actions"
                      : tab === "admins"
                        ? "Owner-managed accounts · one active session per login"
                        : "Website controls and account security"}
            </p>
          </div>
          {tab !== "account" && (
            <button
              className="admin-button admin-button--secondary"
              onClick={() => {
                setLoadError("");
                setRevision((v) => v + 1);
              }}
            >
              Refresh ↻
            </button>
          )}
        </div>
        <div className="admin-feedback" role="status">
          {message}
        </div>
        {formError && (
          <p className="admin-error" role="alert">
            {formError}
          </p>
        )}
        {loadError && (
          <div className="admin-notice" role="alert">
            {loadError}
            <button
              className="admin-button admin-button--secondary"
              onClick={() => {
                setLoadError("");
                setRevision((v) => v + 1);
              }}
            >
              Retry
            </button>
          </div>
        )}
        {forbidden ? (
          <Empty>Only the owner can access this page.</Empty>
        ) : (
          <>
            {["visitors", "leads", "audit"].includes(tab) && !visitorId && (
              <SearchForm
                key={`${tab}-${query}`}
                initial={query}
                label={
                  tab === "audit"
                    ? "Search by action or admin"
                    : "Search by name or email"
                }
                onSearch={(value) => go({ q: value || null, page: null })}
              />
            )}
            {!data && tab !== "account" && !loadError && (
              <div className="admin-loading" role="status">
                Loading {tab}…
              </div>
            )}
            {tab === "overview" && data && (
              <>
                <div className="admin-metrics">
                  {[
                    ["Visitors", data.visitors, "Consented browsers"],
                    ["Page views", data.views, "Across your public pages"],
                    ["Clicks", data.clicks, "Links and website controls"],
                    ["New enquiries", data.newLeads, "Waiting for your team"],
                  ].map(([label, value, hint]) => (
                    <article key={String(label)}>
                      <span>{label}</span>
                      <strong>
                        {Number(value || 0).toLocaleString("en-IN")}
                      </strong>
                      <small>{hint}</small>
                    </article>
                  ))}
                </div>
                <div className="admin-live">
                  <span className="admin-live-dot" />
                  <strong>{data.active || 0} active visitors</strong>
                  <span>
                    Activity within the last 2 minutes · indicative, not exact
                  </span>
                  <Status
                    value={data.tracking ? "TRACKING ON" : "TRACKING PAUSED"}
                  />
                </div>
                <div className="admin-two-col">
                  <section className="admin-panel">
                    <h2>Pages people explore</h2>
                    {data.pages?.length ? (
                      <Table
                        headers={["Page", "Views"]}
                        label="Most viewed pages"
                      >
                        {data.pages.map((p) => (
                          <tr key={p.path}>
                            <td>
                              <Link href={p.path}>{p.path}</Link>
                            </td>
                            <td>{p.views}</td>
                          </tr>
                        ))}
                      </Table>
                    ) : (
                      <Empty>
                        Page views will appear after visitors accept analytics.
                      </Empty>
                    )}
                  </section>
                  <section className="admin-panel">
                    <h2>A week of visits</h2>
                    {data.days?.length ? (
                      <div
                        className="admin-chart"
                        role="img"
                        aria-label={data.days
                          .map((d) => `${d.day}: ${d.views} page views`)
                          .join("; ")}
                      >
                        {data.days.map((d) => (
                          <div key={d.day}>
                            <span>{d.views}</span>
                            <i
                              style={{
                                height: `${Math.max(4, (d.views / Math.max(...data.days!.map((x) => x.views))) * 150)}px`,
                              }}
                            />
                            <small>{d.day.slice(5)}</small>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Empty>Your traffic trend will appear here.</Empty>
                    )}
                    <p className="admin-hint">
                      Page views per day · UTC reporting dates
                    </p>
                  </section>
                </div>
                <section className="admin-panel">
                  <div className="admin-panel-heading">
                    <h2>Recent enquiries</h2>
                    <Link href="?tab=leads">View all ↗</Link>
                  </div>
                  {data.recent?.length ? (
                    <Table
                      headers={["Name", "Residence", "Received", "Status"]}
                      label="Recent enquiries"
                    >
                      {data.recent.map((row) => (
                        <tr key={row.id}>
                          <td>{row.name}</td>
                          <td>{row.residence}</td>
                          <td>{date(row.createdAt)}</td>
                          <td>
                            <Status value={row.status || "NEW"} />
                          </td>
                        </tr>
                      ))}
                    </Table>
                  ) : (
                    <Empty>
                      No enquiries yet. New website submissions will appear
                      here.
                    </Empty>
                  )}
                </section>
                <section className="admin-panel admin-notice">
                  <h2>What this dashboard can tell you</h2>
                  <p>
                    Anonymous browser IDs become identifiable only when someone
                    submits contact details with permission. Counts may include
                    bots and exclude visitors who decline analytics. This is
                    event analytics, not a recording of screens or typed input.
                  </p>
                </section>
              </>
            )}
            {tab === "visitors" && data && !visitorId && (
              <section className="admin-panel">
                {data.items?.length ? (
                  <Table
                    headers={[
                      "Visitor",
                      "Latest page",
                      "Device",
                      "Last active",
                      "Visits",
                    ]}
                    label="Website visitors"
                  >
                    {data.items.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <button
                            className="admin-link"
                            onClick={() => go({ visitor: row.id, page: null })}
                          >
                            {row.leads?.[0]?.name ||
                              `Anonymous · ${row.id.slice(0, 8)}`}
                          </button>
                          <small>
                            {row.leads?.[0]?.email ||
                              "No contact details provided"}
                          </small>
                        </td>
                        <td>{row.visits?.[0]?.events?.[0]?.path || "—"}</td>
                        <td>
                          {row.visits?.[0]?.device} / {row.visits?.[0]?.browser}
                        </td>
                        <td>{date(row.lastSeen)}</td>
                        <td>{row._count?.visits || 0}</td>
                      </tr>
                    ))}
                  </Table>
                ) : (
                  <Empty>
                    {query
                      ? "No visitors match this search."
                      : "No consented visits recorded yet."}
                  </Empty>
                )}
              </section>
            )}
            {tab === "visitors" && data && visitorId && (
              <>
                <button
                  className="admin-back"
                  onClick={() => go({ visitor: null })}
                >
                  ← All visitors
                </button>
                <section className="admin-panel">
                  <h2>
                    {data.visitor?.leads?.[0]?.name || "Anonymous visitor"}
                  </h2>
                  <p className="admin-mono">{visitorId}</p>
                  <p>
                    First seen {date(data.visitor?.firstSeen)} · last seen{" "}
                    {date(data.visitor?.lastSeen)}
                  </p>
                  {data.visitor?.leads?.map((lead, i) => (
                    <p key={i}>
                      {lead.name} ·{" "}
                      <a href={`mailto:${lead.email}`}>{lead.email}</a> ·{" "}
                      <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                    </p>
                  ))}
                </section>
                <section className="admin-panel">
                  <h2>Activity timeline</h2>
                  <p className="admin-hint">
                    Recorded events, 100 per page. Inputs and query strings are
                    never captured.
                  </p>
                  {data.events?.length ? (
                    <Table
                      headers={["Time", "Event", "Page", "Interaction"]}
                      label="Visitor activity"
                    >
                      {data.events.map((row) => (
                        <tr key={row.id}>
                          <td>{date(row.createdAt)}</td>
                          <td>
                            <Status value={row.kind} />
                          </td>
                          <td>{row.path}</td>
                          <td>
                            {row.target ||
                              (row.depth !== null && row.depth !== undefined
                                ? `${row.depth}% scroll depth`
                                : "—")}
                          </td>
                        </tr>
                      ))}
                    </Table>
                  ) : (
                    <Empty>No activity available.</Empty>
                  )}
                </section>
              </>
            )}
            {tab === "leads" && data && (
              <section className="admin-panel">
                {data.items?.length ? (
                  <Table
                    headers={[
                      "Contact",
                      "Interest",
                      "Received",
                      "Status",
                      "Details",
                    ]}
                    label="Website enquiries"
                  >
                    {data.items.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <strong>{row.name}</strong>
                          <a href={`mailto:${row.email}`}>{row.email}</a>
                          <a href={`tel:${row.phone}`}>{row.phone}</a>
                        </td>
                        <td>
                          {row.residence}
                          <small>{row.country || "Country not provided"}</small>
                        </td>
                        <td>{date(row.createdAt)}</td>
                        <td>
                          <label
                            className="sr-only"
                            htmlFor={`status-${row.id}`}
                          >
                            Status for {row.name}
                          </label>
                          <select
                            id={`status-${row.id}`}
                            value={row.status}
                            disabled={busy}
                            onChange={async (event) => {
                              setBusy(true);
                              try {
                                await mutate(`leads/${row.id}`, "PATCH", {
                                  status: event.target.value,
                                });
                              } catch (error) {
                                setFormError((error as Error).message);
                                sessionLost(error);
                              } finally {
                                setBusy(false);
                              }
                            }}
                          >
                            {["NEW", "CONTACTED", "CLOSED"].map((v) => (
                              <option key={v}>{v}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            className="admin-link"
                            onClick={() => go({ lead: row.id })}
                          >
                            Open enquiry ↗
                          </button>
                          {selectedLead === row.id && (
                            <div className="admin-lead-details">
                              <p>{row.message || "No additional message."}</p>
                              <p>
                                Preferred visit:{" "}
                                {row.preferredDate || "Flexible"}
                                <br />
                                Airport transfer:{" "}
                                {row.transfer ? "Requested" : "Not requested"}
                                <br />
                                Source: {row.sourcePath}
                              </p>
                              {row.visitorId && (
                                <Link
                                  href={`?tab=visitors&visitor=${row.visitorId}`}
                                >
                                  View activity ↗
                                </Link>
                              )}
                              {admin.role === "OWNER" && (
                                <button
                                  className="admin-link admin-danger-text"
                                  onClick={() =>
                                    openConfirm({
                                      title: "Delete this enquiry?",
                                      description:
                                        "This permanently removes the contact details and message. This cannot be undone.",
                                      action: "Delete enquiry",
                                      route: `leads/${row.id}`,
                                      method: "DELETE",
                                    })
                                  }
                                >
                                  Delete enquiry
                                </button>
                              )}
                              <button
                                className="admin-link"
                                onClick={() => go({ lead: null })}
                              >
                                Close details
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </Table>
                ) : (
                  <Empty>
                    {query
                      ? "No enquiries match your search."
                      : "No enquiries have been submitted yet."}
                  </Empty>
                )}
              </section>
            )}
            {tab === "audit" && data && (
              <section className="admin-panel">
                {data.items?.length ? (
                  <Table
                    headers={[
                      "Time",
                      "Administrator",
                      "Action",
                      "Target",
                      "Connection",
                    ]}
                    label="Administrator audit log"
                  >
                    {data.items.map((row) => (
                      <tr key={row.id}>
                        <td>{date(row.createdAt)}</td>
                        <td>{row.actor}</td>
                        <td>
                          <Status value={row.action || ""} />
                        </td>
                        <td className="admin-mono">{row.target || "—"}</td>
                        <td>
                          {row.ip}
                          <small>{row.userAgent}</small>
                        </td>
                      </tr>
                    ))}
                  </Table>
                ) : (
                  <Empty>No audit entries match this view.</Empty>
                )}
              </section>
            )}
            {tab === "admins" && data && (
              <div className="admin-two-col admin-admins">
                <section className="admin-panel">
                  <h2>Your administrators</h2>
                  {data.items?.map((row) => (
                    <article key={row.id} className="admin-person">
                      <div>
                        <strong>{row.name}</strong>
                        <span>{row.login}</span>
                        <Status value={row.role || "ADMIN"} />
                        <Status value={row.enabled ? "ENABLED" : "DISABLED"} />
                      </div>
                      <p>
                        {row.session
                          ? `Session last active ${date(row.session.lastSeen)}`
                          : "No active session"}
                      </p>
                      {row.role !== "OWNER" && (
                        <div className="admin-actions">
                          <button
                            className="admin-button admin-button--secondary"
                            onClick={() =>
                              openConfirm({
                                title: row.enabled
                                  ? "Disable administrator?"
                                  : "Enable administrator?",
                                description: row.enabled
                                  ? "Access ends immediately and the active session is revoked."
                                  : "This account will be able to sign in again.",
                                action: row.enabled
                                  ? "Disable admin"
                                  : "Enable admin",
                                route: `admins/${row.id}`,
                                method: "PATCH",
                                body: { enabled: !row.enabled },
                              })
                            }
                          >
                            {row.enabled ? "Disable" : "Enable"}
                          </button>
                          <button
                            className="admin-link"
                            onClick={() =>
                              openConfirm({
                                title: "Reset administrator password?",
                                description:
                                  "The existing password stops working and the active session is revoked.",
                                action: "Reset password",
                                route: `admins/${row.id}`,
                                method: "PATCH",
                                password: true,
                              })
                            }
                          >
                            Reset password
                          </button>
                          {row.session && (
                            <button
                              className="admin-link"
                              onClick={() =>
                                openConfirm({
                                  title: "Revoke this session?",
                                  description:
                                    "The administrator will need to sign in again.",
                                  action: "Revoke session",
                                  route: `admins/${row.id}`,
                                  method: "PATCH",
                                  body: { revoke: true },
                                })
                              }
                            >
                              Revoke session
                            </button>
                          )}
                        </div>
                      )}
                    </article>
                  ))}
                </section>
                <section className="admin-panel">
                  <h2>Create administrator</h2>
                  <p className="admin-hint">
                    Administrators can view visitors and enquiries. Only the
                    owner manages accounts, settings and deletion.
                  </p>
                  <form noValidate onSubmit={createAdmin}>
                    <Field
                      name="name"
                      label="Full name"
                      autoComplete="off"
                      error={fields.name?.[0]}
                    />
                    <Field
                      name="login"
                      label="Login ID"
                      autoComplete="off"
                      error={fields.login?.[0]}
                    />
                    <Field
                      name="password"
                      label="Password (15+ characters)"
                      type="password"
                      autoComplete="new-password"
                      error={fields.password?.[0]}
                    />
                    <button className="admin-button" disabled={busy}>
                      {busy ? "Creating…" : "Create administrator"}
                    </button>
                  </form>
                </section>
              </div>
            )}
            {tab === "settings" && data && (
              <section className="admin-panel admin-settings">
                <h2>Visitor analytics</h2>
                <p>
                  Visitors must accept analytics before page views, clicks and
                  scroll depth are recorded.
                </p>
                <div className="admin-setting">
                  <div>
                    <strong>Activity collection</strong>
                    <p>
                      {data.trackingEnabled
                        ? "Accepting consented activity"
                        : "Paused for all visitors"}
                    </p>
                  </div>
                  <button
                    className="admin-button admin-button--secondary"
                    onClick={() =>
                      openConfirm({
                        title: data.trackingEnabled
                          ? "Pause visitor analytics?"
                          : "Enable visitor analytics?",
                        description:
                          "This changes collection for the entire public website. Enquiry submissions remain available.",
                        action: data.trackingEnabled
                          ? "Pause analytics"
                          : "Enable analytics",
                        route: "settings",
                        method: "PATCH",
                        body: { trackingEnabled: !data.trackingEnabled },
                      })
                    }
                  >
                    {data.trackingEnabled
                      ? "Pause collection"
                      : "Enable collection"}
                  </button>
                </div>
                <div className="admin-setting">
                  <div>
                    <strong>Activity retention</strong>
                    <p>
                      90 days. Run the documented daily retention task to purge
                      expired records.
                    </p>
                  </div>
                  <span className="admin-mono">90 DAYS</span>
                </div>
                <div className="admin-setting">
                  <div>
                    <strong>Enquiry retention</strong>
                    <p>
                      Enquiries remain until the owner explicitly deletes them.
                    </p>
                  </div>
                  <span className="admin-mono">OWNER MANAGED</span>
                </div>
                <h2>Website shortcuts</h2>
                <div className="admin-shortcuts">
                  {[
                    ["/", "Homepage"],
                    ["/villas", "Villas"],
                    ["/premium-homes", "Premium homes"],
                    ["/contact", "Contact form"],
                    ["/privacy-policy", "Privacy policy"],
                  ].map(([href, label]) => (
                    <Link
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label} ↗
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {tab === "account" && (
              <section className="admin-panel admin-settings">
                <h2>Change your password</h2>
                <p>Changing your password signs out this account everywhere.</p>
                <form noValidate onSubmit={changePassword}>
                  <Field
                    name="current"
                    label="Current password"
                    type="password"
                    autoComplete="current-password"
                    error={fields.current?.[0]}
                  />
                  <Field
                    name="password"
                    label="New password (15+ characters)"
                    type="password"
                    autoComplete="new-password"
                    error={fields.password?.[0]}
                  />
                  <button className="admin-button" disabled={busy}>
                    {busy ? "Changing…" : "Change password and sign out"}
                  </button>
                </form>
              </section>
            )}
            {data && ["visitors", "leads", "audit", "admins"].includes(tab) && (
              <nav className="admin-pagination" aria-label="Pagination">
                <span>
                  {data.total
                    ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, data.total)} of ${data.total}`
                    : "0 records"}
                </span>
                <div>
                  <button
                    className="admin-button admin-button--secondary"
                    disabled={page <= 1}
                    onClick={() => go({ page: String(page - 1) })}
                  >
                    ← Previous
                  </button>
                  <span aria-current="page">Page {page}</span>
                  <button
                    className="admin-button admin-button--secondary"
                    disabled={page * pageSize >= (data.total || 0)}
                    onClick={() => go({ page: String(page + 1) })}
                  >
                    Next →
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
        <footer className="admin-footer">
          Victorino studio · Private dashboard · One active session per account
        </footer>
      </main>
      {confirmation && (
        <ConfirmDialog
          confirmation={confirmation}
          busy={busy}
          error={confirmError}
          onCancel={() => setConfirmation(null)}
          onConfirm={confirm}
        />
      )}
    </div>
  );
}
