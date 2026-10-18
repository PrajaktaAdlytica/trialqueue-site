import { useState } from "react";
import {
  LockKey,
  Quotes,
  ArrowCounterClockwise,
  Check,
  GitDiff,
  FileText,
  UserCircle,
} from "@phosphor-icons/react";
import { cases } from "./data";
export const demoRecords = [
  ...cases.map((c, i) => ({
    ...c,
    group: ["Routine review", "Unresolved evidence", "Blocked"][i],
  })),
  {
    id: "TQ-SYN-004",
    value: "2.1",
    state: "Met",
    tone: "met",
    date: "16 Oct 2026",
    source: "SYN-LAB-004",
    owner: "Coordinator A",
    time: "10:02",
    group: "Routine review",
    summary: "Current evidence supports this illustrative criterion.",
    next: "Inspect the cited source before continuing the review.",
  },
  {
    id: "TQ-SYN-005",
    value: "—",
    state: "Unknown",
    tone: "unknown",
    date: "Not provided",
    source: "Source missing",
    owner: "Coordinator B",
    time: "10:14",
    group: "Unresolved evidence",
    summary: "No current result is supplied.",
    next: "Request clarification through the governed site workflow; abstain for now.",
  },
  {
    id: "TQ-SYN-006",
    value: "1.6",
    state: "Unknown",
    tone: "unknown",
    date: "16 Oct 2026",
    source: "Source unavailable",
    owner: "Coordinator C",
    time: "10:28",
    group: "Blocked",
    summary: "The value has no inspectable source in this fictional record.",
    next: "Proposed interpretation rejected: provenance is unavailable. Resolve the source before any criterion interpretation.",
  },
  {
    id: "TQ-SYN-007",
    value: "1.9",
    state: "Met",
    tone: "met",
    date: "16 Oct 2026",
    source: "SYN-LAB-007",
    owner: "Coordinator C",
    time: "10:41",
    group: "Reviewer closed",
    summary: "A fictional reviewer has completed the source check.",
    next: "This administrative review state is not enrollment or an eligibility determination.",
  },
  {
    id: "TQ-SYN-008",
    value: "1.7",
    state: "Met",
    tone: "met",
    date: "16 Oct 2026",
    source: "SYN-LAB-008",
    owner: "Coordinator B",
    time: "10:52",
    group: "Routine review",
    summary: "Current evidence supports this criterion only.",
    next: "Continue the remaining manual protocol review.",
  },
  {
    id: "TQ-SYN-009",
    value: "2.0",
    state: "Unknown",
    tone: "unknown",
    date: "17 Sep 2026",
    source: "SYN-LAB-009",
    owner: "Coordinator C",
    time: "11:02",
    group: "Unresolved evidence",
    summary: "The source is dated and outside the invented evidence window.",
    next: "Clarify evidence recency. Do not silently exclude this record.",
  },
];
export function DemoBadge() {
  return <span className="concept-label">DEMO — SYNTHETIC DATA</span>;
}
export default function DemoWorkbench({ variant = "full" }) {
  const [version, setVersion] = useState(2),
    [selected, setSelected] = useState("TQ-SYN-002"),
    [checks, setChecks] = useState({}),
    [language, setLanguage] = useState("EN"),
    [report, setReport] = useState("Criterion state");
  const record = demoRecords.find((r) => r.id === selected),
    state =
      record.state === "Unknown"
        ? "Unknown"
        : Number(record.value) >= (version === 1 ? 1 : 1.5)
          ? "Met"
          : "Not met";
  const tone =
    state === "Met" ? "met" : state === "Not met" ? "notmet" : "unknown";
  const versions = (
    <div className="demo-version-panel">
      <div className="demo-heading">
        <span>
          <GitDiff size={18} /> Protocol version
        </span>
        <div
          className="demo-segment"
          role="group"
          aria-label="Protocol version"
        >
          {[1, 2].map((v) => (
            <button
              key={v}
              aria-pressed={version === v}
              onClick={() => setVersion(v)}
            >
              v{v}
            </button>
          ))}
        </div>
      </div>
      <div className="demo-amendment">
        <div>
          <small>FICTIONAL RULE · §4.1</small>
          <strong>
            ANC ≥ {version === 1 ? "1.0" : "1.5"} <span>×10⁹/L</span>
          </strong>
          <p>
            {version === 1
              ? "01 Oct 2026 · original version"
              : "15 Oct 2026 · amended threshold"}
          </p>
        </div>
        <span className="demo-change">
          {version === 1 ? "Version 1 context" : "1.0 → 1.5"}
          <small>Interpretation requires review</small>
        </span>
      </div>
      <div className="demo-provenance">
        <FileText size={15} /> TQ-DEMO-ONC-01 · local protocol copy · synthetic
        reference
      </div>
    </div>
  );
  const queue = (
    <div className="demo-queue">
      <div className="demo-heading">
        <span>Coordinator review queue</span>
        <small>9 FICTIONAL RECORDS</small>
      </div>
      <div
        className="demo-queue-scroll"
        role="group"
        aria-label="Synthetic candidate records"
      >
        {demoRecords.map((r) => {
          const st =
            r.state === "Unknown"
              ? "Unknown"
              : Number(r.value) >= (version === 1 ? 1 : 1.5)
                ? "Met"
                : "Not met";
          return (
            <button
              key={r.id}
              aria-pressed={selected === r.id}
              onClick={() => setSelected(r.id)}
              className={selected === r.id ? "selected" : ""}
            >
              <span>
                <strong>{r.id}</strong>
                <small>
                  {r.owner} · {r.time}
                </small>
              </span>
              <span className="demo-value">
                {r.value}
                <small>{r.date}</small>
              </span>
              <span
                className={
                  "status " +
                  (st === "Met"
                    ? "met"
                    : st === "Not met"
                      ? "notmet"
                      : "unknown")
                }
              >
                {st}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
  const evidence = (
    <div className="demo-evidence">
      <div className="demo-heading">
        <span>
          <Quotes size={17} /> Cited evidence
        </span>
        <small>{record.id}</small>
      </div>
      <div className="demo-evidence-body">
        <div className="demo-source-meta">
          <strong>{record.source}</strong>
          <span>{record.date}</span>
        </div>
        <h3>{record.summary}</h3>
        <div className="demo-source-excerpt">
          <span className="overline">FICTIONAL SOURCE EXCERPT</span>
          <p>
            {record.source.includes("missing") ||
            record.source.includes("unavailable")
              ? "No inspectable source. Interpretation abstained."
              : `ANC: ${record.value} ×10⁹/L · specimen date ${record.date}.`}
          </p>
          <small>
            {record.state === "Unknown"
              ? "Recency / provenance unresolved · do not infer a current result."
              : "One synthetic lab criterion · remaining protocol review unresolved."}
          </small>
        </div>
        <div className="criterion-row">
          <span>ANC threshold · v{version}</span>
          <span className={"status " + tone}>{state}</span>
        </div>
        <div className="criterion-row">
          <span>Other protocol criteria</span>
          <span className="status unknown">Unknown</span>
        </div>
        <p>{record.next}</p>
        <div className="demo-review-owner">
          <UserCircle size={20} />
          <span>
            {record.owner}
            <small>16 Oct 2026 · {record.time} · fictional role</small>
          </span>
        </div>
        <button
          className="demo-action"
          disabled={
            record.source.includes("missing") ||
            record.source.includes("unavailable")
          }
          onClick={() =>
            setChecks({ ...checks, [record.id]: !checks[record.id] })
          }
        >
          {checks[record.id] ? (
            <ArrowCounterClockwise size={16} />
          ) : (
            <Check size={16} />
          )}{" "}
          {checks[record.id]
            ? "Undo simulated source check"
            : "Preview source verification"}
        </button>
        <p className="demo-feedback" role="status">
          {checks[record.id]
            ? `${record.owner}: simulated source check recorded. Criterion stays ${state.toLowerCase()}.`
            : "No eligibility or enrollment decision is made."}
        </p>
      </div>
    </div>
  );
  const permission = (
    <div className="permission-preview">
      <div className="demo-heading">
        <span>
          <LockKey size={17} /> Outreach preview
        </span>
        <strong className="unsent-label">UNSENT</strong>
      </div>
      <div className="permission-warning">
        <LockKey size={19} />
        <span>Recontact permission not verified</span>
      </div>
      <div
        className="demo-segment language-segment"
        role="group"
        aria-label="Educational draft language"
      >
        {["EN", "ES"].map((l) => (
          <button
            key={l}
            aria-pressed={language === l}
            onClick={() => setLanguage(l)}
          >
            {l}
          </button>
        ))}
      </div>
      <h3>
        {language === "EN"
          ? "An educational draft. A separate permission."
          : "Un borrador educativo. Un permiso independiente."}
      </h3>
      <p>
        {language === "EN"
          ? "Site-approved educational material would be prepared only after the appropriate permissions and language review. There is no recipient and no send capability in this preview."
          : "El material educativo requiere permisos adecuados y una revisión del idioma. Este ejemplo no tiene destinatario ni función de envío."}
      </p>
      <span className="overline">
        ILLUSTRATIVE TRANSLATION · REVIEW PENDING
      </span>
      <div className="permission-gates">
        <span>
          Language review <strong>Pending</strong>
        </span>
        <span>
          Site capacity <strong>Unconfirmed</strong>
        </span>
        <span>
          Study consent route <strong>Not verified</strong>
        </span>
      </div>
      <button className="demo-action" disabled>
        <LockKey size={16} /> Outreach locked
      </button>
    </div>
  );
  const analysis = (
    <div className="report-preview">
      <div className="demo-heading">
        <span>Illustrative review analysis</span>
        <small>DENOMINATOR: 9 RECORDS</small>
      </div>
      <div className="demo-segment" role="group" aria-label="Report grouping">
        {["Criterion state", "Review state", "Work owner"].map((x) => (
          <button
            key={x}
            aria-pressed={report === x}
            onClick={() => setReport(x)}
          >
            {x}
          </button>
        ))}
      </div>
      <h3>
        {report === "Criterion state"
          ? "One criterion. Every uncertainty visible."
          : report === "Review state"
            ? "Where review needs attention."
            : "Every case has an owner."}
      </h3>
      <div className="report-bars">
        {(report === "Criterion state"
          ? ["Met", "Not met", "Unknown"]
          : report === "Review state"
            ? [
                "Routine review",
                "Unresolved evidence",
                "Blocked",
                "Reviewer closed",
              ]
            : ["Coordinator A", "Coordinator B", "Coordinator C"]
        ).map((name, i) => {
          const count = demoRecords.filter((r) =>
            report === "Criterion state"
              ? (r.state === "Unknown"
                  ? "Unknown"
                  : Number(r.value) >= (version === 1 ? 1 : 1.5)
                    ? "Met"
                    : "Not met") === name
              : report === "Review state"
                ? r.group === name
                : r.owner === name,
          ).length;
          return (
            <div key={name}>
              <span>
                {name}
                <strong>{count} / 9</strong>
              </span>
              <div>
                <i
                  style={{
                    width: (count / 9) * 100 + "%",
                    background: (report === "Criterion state"
                      ? ["#ABC4AF", "#D78069", "#DCC28D"]
                      : ["#ABC4AF", "#DCC28D", "#D78069", "#B9BEB5"])[i],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p>
        Illustrative records only. Unknown and blocked cases stay in the
        denominator. Reviewer closed ≠ enrolled.
      </p>
    </div>
  );
  return (
    <div className={"demo-workbench demo-workbench--" + variant}>
      <div className="demo-window-bar">
        <span>
          <img src="/assets/logos/trialqueue-mark-reverse.svg" alt="" />{" "}
          {variant === "full"
            ? "Synthetic review workbench"
            : "TrialQueue concept preview"}
        </span>
        <DemoBadge />
      </div>
      {variant === "full" ? (
        <>
          {versions}
          <div className="demo-workbench-grid">
            {queue}
            {evidence}
          </div>
          {permission}
          {analysis}
        </>
      ) : variant === "protocol" ? (
        <>
          {versions}
          <div className="normalized-criterion">
            <span className="overline">NORMALIZATION PREVIEW</span>
            <h3>Keep the original beside the interpretation.</h3>
            <dl>
              <dt>Source wording</dt>
              <dd>Fictional ANC threshold in local protocol §4.1</dd>
              <dt>Normalized criterion</dt>
              <dd>ANC ≥ {version === 1 ? "1.0" : "1.5"} ×10⁹/L</dd>
              <dt>Interpretation owner</dt>
              <dd>Coordinator A · review required</dd>
            </dl>
          </div>
        </>
      ) : variant === "review" ? (
        <>
          {versions}
          {evidence}
        </>
      ) : variant === "queue" ? (
        <div className="demo-workbench-grid">
          {queue}
          {evidence}
        </div>
      ) : variant === "permission" ? (
        permission
      ) : (
        analysis
      )}
      <div className="demo-window-foot">
        <LockKey size={13} /> Concept only · synthetic sources · manual review ·
        no live connections
      </div>
    </div>
  );
}
