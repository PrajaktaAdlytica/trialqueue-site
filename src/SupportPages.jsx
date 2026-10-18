import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  LockKey,
  FileText,
  Quotes,
  GitDiff,
  ListChecks,
  Funnel,
  MagnifyingGlass,
  Warning,
  CaretDown,
  ArrowCounterClockwise,
  DownloadSimple,
  ShieldCheck,
} from "@phosphor-icons/react";
import { modules, sources, faqs } from "./data";
import { productLinks, solutionLinks, guides, slug } from "./site";
import { usePageMotion } from "./usePageMotion";
import { useMotion } from "./MotionContext";
import DemoWorkbench, { DemoBadge } from "./DemoWorkbench";
const RoleFilm = lazy(() => import("./RoleVideos"));
function RoleVideo(props) {
  return (
    <Suspense
      fallback={
        <div className="film-loading" aria-label="Loading synthetic diagram">
          <span className="overline">SYNTHETIC WORKFLOW PREVIEW</span>
        </div>
      }
    >
      <RoleFilm {...props} />
    </Suspense>
  );
}
const icons = [FileText, Quotes, ListChecks, LockKey, Funnel];
const gate =
  "8 site/coordinator/PI interviews, 1 governed retrospective design, 1 named site sponsor and written conditional paid scope, plus signed data-access/security and human-oversight approvals.";
const stop =
  "Stop or reposition if there is no governed chart access, PI sponsorship or budget, or if false exclusions make pre-screening unsafe.";
export function PageFrame({
  eyebrow,
  title,
  intro,
  theme = "bone",
  breadcrumbs,
  children,
  className = "",
  hideIntro = false,
}) {
  const ref = usePageMotion();
  return (
    <main
      id="main"
      ref={ref}
      tabIndex={-1}
      className={`page page--${theme} ${className}`}
    >
      <div className="page-orbit" aria-hidden="true" />
      <div className="page-container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          {breadcrumbs?.map(([label, to]) => (
            <span key={label}>
              {to ? (
                <>
                  <Link to={to}>{label}</Link>
                  <i>/</i>
                </>
              ) : (
                <b aria-current="page">{label}</b>
              )}
            </span>
          ))}
        </nav>
        {!hideIntro && (
          <header className="page-intro">
            <span className="overline">{eyebrow}</span>
            <h1>
              {title.split("|").map((line, i) => (
                <span className="page-title-line" key={i}>
                  {line}
                  {i < title.split("|").length - 1 ? " " : ""}
                </span>
              ))}
            </h1>
            {intro && <p>{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </main>
  );
}
function TextLink({ to, children }) {
  return (
    <Link className="page-text-link" to={to}>
      {children}
      <ArrowRight size={22} />
    </Link>
  );
}
function Actions({
  primary = "Explore the synthetic demo",
  to = "/demo",
  secondary = "Discuss a scoped pilot",
  secondaryTo = "/request-pilot",
}) {
  return (
    <div className="page-actions">
      <Link className="button" to={to}>
        {primary}
        <ArrowUpRight size={18} />
      </Link>
      <TextLink to={secondaryTo}>{secondary}</TextLink>
    </div>
  );
}
function PageCTA({
  title = "Bring one protocol. Start with the workflow.",
  text = "A coordinator-led version exercise is the first conversation. No clinical records or patient contact.",
  module,
}) {
  return (
    <aside className="page-cta" data-page-reveal>
      <span className="overline">A BOUNDED NEXT STEP</span>
      <h2>{title}</h2>
      <p>{text}</p>
      <Link
        className="button"
        to={"/request-pilot" + (module ? "?module=" + module : "")}
      >
        Request a scoped pilot <ArrowUpRight size={20} />
      </Link>
      <Link className="page-cta-secondary" to="/pilot">
        See the proposed scope and test price <ArrowRight size={17} />
      </Link>
    </aside>
  );
}
function FAQ({ items }) {
  return (
    <div className="page-faq">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <CaretDown size={18} />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
function Sources() {
  return (
    <section className="page-section">
      <div className="section-heading">
        <span className="overline">PRIMARY SOURCES</span>
        <h2>
          Read the source.
          <br />
          Keep the limits in view.
        </h2>
      </div>
      <div className="source-list">
        {sources.map((s, i) => (
          <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
            <span className="overline">
              0{i + 1} / {s.by}
            </span>
            <h3>
              {s.title}
              <ArrowUpRight size={21} />
            </h3>
            <p>{s.note}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
function StopRule() {
  return (
    <div className="stop-rule">
      <Warning size={24} />
      <div>
        <span className="overline">EXPLICIT STOP RULE</span>
        <p>{stop}</p>
      </div>
    </div>
  );
}
function GateList() {
  return (
    <ol className="gate-list">
      {[
        ["08", "Operator, buyer and oversight interviews"],
        ["01", "Governed retrospective design"],
        ["01", "Named site PI / research-office sponsor"],
        ["↗", "Written conditional paid scope"],
        ["✓", "Signed access, security and human-oversight approvals"],
      ].map(([n, t]) => (
        <li key={t}>
          <span>{n}</span>
          <div>
            {t}
            <small>
              Required before a limited governed pilot · not yet demonstrated
            </small>
          </div>
        </li>
      ))}
    </ol>
  );
}
function Platform() {
  return (
    <PageFrame
      eyebrow="THE PROPOSED PLATFORM"
      title="One source trail.|Every human handoff."
      intro="A proposed operating layer for cited pre-screen review. The first product is a read-only, one-protocol synthetic workbench."
      theme="ink"
      breadcrumbs={[["Platform"]]}
    >
      <Actions />
      <div className="platform-flow" data-page-reveal>
        {modules.map((m, i) => {
          const Icon = icons[i];
          return (
            <Link key={m.name} to={productLinks[i].to}>
              <span className="flow-number">0{i + 1}</span>
              <Icon size={28} />
              <h3>{m.name}</h3>
              <p>{m.offer}</p>
              <ArrowRight size={20} />
            </Link>
          );
        })}
        <i data-trace />
      </div>
      <section className="page-section split-section">
        <div>
          <span className="overline">THE RECORD BEHIND THE REVIEW</span>
          <h2>
            Context travels
            <br />
            with the case.
          </h2>
          <p>
            A versioned protocol, inspectable evidence, an explicit unknown and
            an identified reviewer. Each proposed step has a source and an
            owner.
          </p>
          <TextLink to="/demo">Open the conceptual workbench</TextLink>
        </div>
        <div data-paper>
          <DemoWorkbench variant="review" />
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading">
          <span className="overline">SYNTHETIC OBJECT MODEL</span>
          <h2>
            Seven objects.
            <br />
            No hidden decision.
          </h2>
        </div>
        <div className="definition-table">
          {[
            [
              "Study / protocol version",
              "Fictional study, version date and changed source criterion.",
            ],
            [
              "Synthetic pre-screen candidate",
              "Non-routable example identifier; never a real patient.",
            ],
            [
              "Criterion evidence",
              "Source reference, evidence date and met / not met / unknown.",
            ],
            [
              "Coordinator reviewer",
              "Fictional role, attributed check and dated next action.",
            ],
            ["Consent gate", "Unverified permission is a visible block."],
            [
              "Site capacity",
              "Locally unconfirmed; not inferred from registry status.",
            ],
            [
              "Exception provenance",
              "Missing, dated or ambiguous evidence remains inspectable.",
            ],
          ].map(([a, b]) => (
            <div key={a}>
              <h3>{a}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="boundary-grid">
        <div>
          <span className="overline">AVAILABLE IN THIS PREVIEW</span>
          <h3>Explore the workflow.</h3>
          <p>
            Synthetic version switching, source inspection, a reversible
            simulated check, and a locked educational draft.
          </p>
        </div>
        <div>
          <span className="overline">DISCOVERY FOR A FUTURE PILOT</span>
          <h3>Agree the input contract.</h3>
          <p>
            Extraction, authorized data access, EHR compatibility, security
            review and integration are unresolved. No live clinical system is
            connected.
          </p>
        </div>
      </section>
      <PageCTA />
    </PageFrame>
  );
}
function Products() {
  return (
    <PageFrame
      eyebrow="FIVE PROPOSED MODULES"
      title="Separate jobs.|A shared review trail."
      intro="Five distinct product directions. A first governed pilot would test one module, one protocol and one agreed workflow."
      breadcrumbs={[["Products"]]}
    >
      <div className="product-directory">
        {modules.map((m, i) => {
          const Icon = icons[i];
          return (
            <article key={m.name} data-page-reveal>
              <div className="directory-number">
                0{i + 1}
                <Icon size={31} />
              </div>
              <div>
                <span className="overline">PROPOSED MODULE</span>
                <h2>{m.name}</h2>
                <h3>{m.short}</h3>
                <p className="exact-offer">{m.offer}</p>
                <p>{m.text}</p>
                <TextLink to={productLinks[i].to}>Explore {m.name}</TextLink>
              </div>
              <Link
                to={productLinks[i].to}
                className="directory-art"
                aria-label={"Explore " + m.name}
              >
                <img
                  src={"/assets/diagrams/module-trial-" + m.art + ".svg"}
                  alt={m.detail}
                />
              </Link>
            </article>
          );
        })}
      </div>
      <PageCTA title="Start with the bottleneck you can observe." />
    </PageFrame>
  );
}
const productSpecs = [
  {
    job: "Protocol context before candidate review.",
    inputs:
      "A public study record and the locally governing protocol version, with approved source documents.",
    steps: [
      "Identify the governing local version and amendment date.",
      "Compare the original wording with the normalized criterion.",
      "Assign interpretation uncertainty to the coordinator for verification.",
    ],
    output:
      "A cited criterion definition and an attributed version difference; not an automatic interpretation of the whole protocol.",
    controls:
      "Keep the registry and local source distinct. Local protocol authority and amendment handling require site review.",
    question: "Does Trial Desk import ClinicalTrials.gov or our EHR?",
    answer:
      "This preview uses only fictional local source references. Public-registry ingestion and any EHR access remain discovery work, not available integrations.",
    variant: "protocol",
    theme: "bone",
  },
  {
    job: "A pre-screen a coordinator can inspect.",
    inputs:
      "An appropriately governed source extract, evidence date and versioned criterion. In the demo, every input is invented.",
    steps: [
      "Place the dated source beside the criterion.",
      "Keep met, not met and unknown distinct.",
      "Abstain when provenance, recency or interpretation is unresolved.",
    ],
    output:
      "An evidence-linked candidate review record with uncertainty and an accountable next step.",
    controls:
      "A met criterion is not overall eligibility. Do not turn an unknown or an outdated result into an automatic exclusion.",
    question: "Has the pre-screen been clinically validated?",
    answer:
      "No. Recall, precision, false exclusions and review time must be evaluated against adjudicated manual screening in a governed retrospective design.",
    variant: "review",
    theme: "ink",
  },
  {
    job: "An exception with a person attached.",
    inputs:
      "Candidate review records, source exceptions, fictional reviewer roles and a dated next action.",
    steps: [
      "Bring affected records into the review queue.",
      "Open the source and inspect uncertainty.",
      "Record an attributed, reversible administrative review step.",
    ],
    output:
      "A coordinator-owned queue and a visible source-check trail. Closed review does not mean enrolled.",
    controls:
      "The preview allows a simulated source check and undo. No clinical system is written to and no eligibility decision is recorded.",
    question: "Does closing a case enroll a candidate?",
    answer:
      "No. Review completion is an administrative state. Investigator judgment, remaining criteria and appropriate permissions remain separate.",
    variant: "queue",
    theme: "bone",
  },
  {
    job: "Permission is part of the next step.",
    inputs:
      "A site-approved educational workflow, permission state, language-review status and locally verified site context.",
    steps: [
      "Check the approved consent and recontact route.",
      "Prepare an educational draft for an appropriate human reviewer.",
      "Keep outreach blocked until every required permission is established.",
    ],
    output:
      "A proposed, attributed educational workflow. This concept shows only an unsent, non-addressed draft.",
    controls:
      "No direct-to-patient outreach. The sample translation is illustrative and awaits language review. No recipient or send function exists.",
    question: "Can I send the educational draft?",
    answer:
      "No. The concept preview has no recipient, message delivery or patient contact. A future governed workflow needs separate site approval and appropriate permissions.",
    variant: "permission",
    theme: "coral",
  },
  {
    job: "A denominator beside every pattern.",
    inputs:
      "Governed, adjudicated review states and criterion-level exceptions, with a defined baseline window.",
    steps: [
      "Define the cohort, baseline and review-state denominator.",
      "Inspect bottlenecks by criterion or accountable owner.",
      "Compare against manual review before drawing conclusions.",
    ],
    output:
      "A proposed site funnel and criterion-failure analysis. Demo counts describe nine fictional records only.",
    controls:
      "Unknown and blocked records remain visible. No measured time saving, recruitment improvement, ROI or clinical benefit is implied.",
    question: "Are the report numbers product performance?",
    answer:
      "No. They are simple counts of the visible synthetic sample, not measured adoption, accuracy, throughput or business outcomes.",
    variant: "report",
    theme: "ink",
  },
];
function ProductPage({ index }) {
  const m = modules[index],
    s = productSpecs[index],
    Icon = icons[index];
  return (
    <PageFrame
      eyebrow={"PROPOSED MODULE / 0" + (index + 1)}
      title={m.name + "|" + m.short}
      intro={m.offer + "."}
      theme={s.theme}
      breadcrumbs={[["Products", "/products"], [m.name]]}
      className={"product-page product-page--" + s.variant}
    >
      <Actions
        primary="Try the synthetic interaction"
        to="#module-preview"
        secondary="Discuss this module"
        secondaryTo={"/request-pilot?module=" + slug(m.name)}
      />
      <section className="module-detail-lead">
        <div className="module-job">
          <Icon size={40} />
          <h2>{s.job}</h2>
          <p>{m.text}</p>
          <span className="overline">
            FOR COORDINATORS & RESEARCH OPERATIONS
          </span>
        </div>
        <div className="module-steps">
          {s.steps.map((step, i) => (
            <div data-shift key={step}>
              <span>0{i + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="module-preview" className="page-section module-interaction">
        <div className="section-heading">
          <span className="overline">INTERACTIVE CONCEPT PREVIEW</span>
          <h2>
            {index === 0
              ? "Change the version. Inspect the source."
              : index === 1
                ? "Keep uncertainty beside the evidence."
                : index === 2
                  ? "Choose a record. Trace the handoff."
                  : index === 3
                    ? "A draft stays behind the gate."
                    : "Change the view. Keep the denominator."}
          </h2>
          <p>
            {index === 0
              ? "Switch v1 / v2 below. The source wording stays visible."
              : index === 1
                ? "Switch the fictional threshold. Dated evidence remains unknown."
                : index === 2
                  ? "Select any of the nine fictional records. A simulated source check is reversible."
                  : index === 3
                    ? "Explore the illustrative language versions. Permissions remain unverified."
                    : "Group the same nine fictional records by review state or accountable owner."}
          </p>
        </div>
        <div data-paper>
          <DemoWorkbench variant={s.variant} />
        </div>
      </section>
      <section className="definition-table module-contract">
        <div>
          <h3>Inputs to agree</h3>
          <p>{s.inputs}</p>
        </div>
        <div>
          <h3>Proposed output</h3>
          <p>{s.output}</p>
        </div>
        <div>
          <h3>Review boundary</h3>
          <p>{s.controls}</p>
        </div>
        <div>
          <h3>Current stage</h3>
          <p>
            Concept DEMO only. No validated matching, customer adoption, live
            integrations or clinical guidance.
          </p>
        </div>
      </section>
      <FAQ
        items={[
          [s.question, s.answer],
          [
            "How would we evaluate this module?",
            "Start with a coordinator-led workflow exercise. A limited governed pilot requires " +
              gate,
          ],
        ]}
      />
      <PageCTA
        module={slug(m.name)}
        title={"Test the job behind " + m.name + "."}
      />
      <section className="related-links">
        <span className="overline">CONTINUE THE WORKFLOW</span>
        {[modules[(index + 1) % 5], modules[(index + 2) % 5]].map((x) => (
          <TextLink key={x.name} to={"/products/" + slug(x.name)}>
            {x.name}
          </TextLink>
        ))}
      </section>
    </PageFrame>
  );
}
const solutionCopy = [
  {
    title: "Academic centers",
    headline: "A defined scope.|A named sponsor.",
    intro:
      "For trial-office directors, coordinators and the site PI / research office who govern access. Start with an observable screening bottleneck.",
    video: 0,
    theme: "bone",
    jobs: [
      [
        "Trial-office director",
        "Own the proposed scope, workflow fit and conditional budget.",
      ],
      [
        "Coordinator / site team",
        "Show the incumbent process, source exceptions and review baseline.",
      ],
      [
        "PI / research office",
        "Sponsor the retrospective design and determine the governance route.",
      ],
    ],
    focus: "One protocol. One retrospective design.",
    body: "A coordinator-led protocol-version replay is the first exercise. It is a way to ask where repeated chart review becomes difficult and who must approve each action.",
    points: [
      "Document the incumbent screening window and baseline.",
      "Specify chart access, adjudication and human review.",
      "Agree the endpoint and stop rule before any future data access.",
    ],
  },
  {
    title: "Site networks",
    headline: "Local permission.|Shared context.",
    intro:
      "For network recruitment and operations leads. Understand the local workflow before expanding across sites.",
    video: 2,
    theme: "ink",
    jobs: [
      [
        "Network lead",
        "Test repeatable operating fit without assuming uniform permissions.",
      ],
      [
        "Local site owner",
        "Confirm the governing protocol, review route and actual capacity.",
      ],
      [
        "Sponsor / research office",
        "Separate economic incentives, authorization and consent controls.",
      ],
    ],
    focus: "Site-level fit before network expansion.",
    body: "Public study status is not evidence of local capacity. A future network view must preserve site-specific permissions, protocol versions and accountable owners.",
    points: [
      "Keep local site capacity explicitly unconfirmed until verified.",
      "Test trial-office versus sponsor-funded incentives.",
      "Retain consent and conflict-of-interest controls as scope grows.",
    ],
  },
  {
    title: "Informatics & CRO teams",
    headline: "Trace the input.|Test the interpretation.",
    intro:
      "For research informatics programs and CRO feasibility teams designing a governed retrospective exercise with a site partner.",
    video: 1,
    theme: "sage",
    jobs: [
      [
        "Research informatics",
        "Define source provenance, extraction limits and the input contract.",
      ],
      [
        "CRO feasibility team",
        "Frame operational questions with a named local site sponsor.",
      ],
      [
        "Oversight / adjudication owner",
        "Review permissions, disagreement handling and evaluation limits.",
      ],
    ],
    focus: "A source contract before an integration.",
    body: "TrialQueue has no current EHR connection. The first design exercise asks what can be supplied lawfully and appropriately, how it is interpreted, and who adjudicates uncertainty.",
    points: [
      "Define governed cohort rights and minimum necessary fields.",
      "Review criterion interpretation and source-date uncertainty.",
      "Keep feasibility analysis separate from patient matching or enrollment.",
    ],
  },
];
function Solutions() {
  const { still } = useMotion();
  return (
    <PageFrame
      eyebrow="BUILT AROUND THE PEOPLE DOING THE WORK"
      title="Different responsibilities.|A shared review trail."
      intro="Start with the buyer, the operator and the people who govern access. Each brings a different question to the same source."
      breadcrumbs={[["Solutions"]]}
    >
      <div className="solutions-directory">
        {solutionCopy.map((s, i) => (
          <section data-page-reveal key={s.title}>
            <div>
              <span className="overline">
                0{i + 1} / {s.title}
              </span>
              <h2>{s.headline.replace("|", " ")}</h2>
              <p>{s.intro}</p>
              <TextLink to={solutionLinks[i].to}>
                Explore this workflow
              </TextLink>
            </div>
            <RoleVideo index={s.video} still={still} />
          </section>
        ))}
      </div>
      <PageCTA />
    </PageFrame>
  );
}
function SolutionPage({ index }) {
  const s = solutionCopy[index],
    { still } = useMotion();
  return (
    <PageFrame
      eyebrow={"SOLUTIONS / " + s.title.toUpperCase()}
      title={s.headline}
      intro={s.intro}
      theme={s.theme}
      breadcrumbs={[["Solutions", "/solutions"], [s.title]]}
    >
      <div className="solution-lead">
        <RoleVideo index={s.video} still={still} />
        <div>
          <span className="overline">THE FIRST EXERCISE</span>
          <h2>{s.focus}</h2>
          <p>{s.body}</p>
          <Actions
            primary="Plan a protocol-version exercise"
            to="/request-pilot"
            secondary="See the demo"
            secondaryTo="/demo"
          />
        </div>
      </div>
      <section className="responsibility-grid">
        {s.jobs.map(([title, body], i) => (
          <div data-shift key={title}>
            <span className="overline">0{i + 1} / RESPONSIBILITY</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </section>
      <section className="page-section split-section">
        <div>
          <span className="overline">WHAT TO AGREE TOGETHER</span>
          <h2>
            Make the next step
            <br />
            reviewable.
          </h2>
        </div>
        <ul className="check-list">
          {s.points.map((t) => (
            <li key={t}>
              <Check size={22} />
              {t}
            </li>
          ))}
        </ul>
      </section>
      <StopRule />
      <PageCTA />
    </PageFrame>
  );
}
function Demo() {
  return (
    <PageFrame
      eyebrow="AN ISOLATED, READ-ONLY CONCEPT"
      title="One amendment.|Follow every next step."
      intro="Explore a fictional oncology protocol and nine synthetic records. Three principal cases show a clean handoff, dated evidence and a blocked review. No actual patient data or clinical recommendations."
      theme="ink"
      breadcrumbs={[["Synthetic demo"]]}
      className="demo-page"
    >
      <div className="demo-instructions">
        <DemoBadge />
        <span>
          Try v1 / v2, select a record and inspect its source. Review actions
          are simulated and reversible.
        </span>
      </div>
      <DemoWorkbench />
      <div className="demo-case-notes">
        {[
          [
            "01",
            "Clean handoff",
            "TQ-SYN-001: current evidence supports one criterion. Remaining review is unresolved.",
          ],
          [
            "02",
            "Ambiguous exception",
            "TQ-SYN-002: a 1.7 result is outside the invented 14-day window. It stays unknown.",
          ],
          [
            "03",
            "Blocked / abstained",
            "TQ-SYN-003: 1.2 meets v1 but not v2. No automatic exclusion or eligibility decision.",
          ],
        ].map(([n, t, p]) => (
          <div key={n}>
            <span className="overline">CASE {n}</span>
            <h3>{t}</h3>
            <p>{p}</p>
          </div>
        ))}
      </div>
      <FAQ items={faqs.slice(0, 4)} />
      <PageCTA title="Evaluate the workflow, with your team." />
    </PageFrame>
  );
}
function Evidence() {
  return (
    <PageFrame
      eyebrow="EVIDENCE & VALIDATION"
      title="A useful concept|has to earn its place."
      intro="Registry availability is established. Local data access, validated pre-screen performance and commercial demand remain open questions."
      theme="ink"
      breadcrumbs={[["Evidence & validation"]]}
    >
      <div className="evidence-ledger">
        {[
          [
            "HIGH",
            "Public registry availability",
            "Public study data and field definitions exist. They do not include patient charts.",
          ],
          [
            "MEDIUM",
            "Adjacent commercial category",
            "Coordinator tools, registries and patient-discovery services address portions of the workflow. Differentiation must be tested.",
          ],
          [
            "LOW",
            "Local access & validated matching",
            "No governed local cohort, validated matching, customer adoption or willingness to pay has been demonstrated.",
          ],
        ].map(([level, t, p]) => (
          <article data-page-reveal key={level}>
            <span
              className={
                "evidence-level evidence-level--" + level.toLowerCase()
              }
            >
              {level}
              <small>EVIDENCE CONFIDENCE</small>
            </span>
            <div>
              <h2>{t}</h2>
              <p>{p}</p>
            </div>
          </article>
        ))}
      </div>
      <section className="page-section split-section">
        <div>
          <span className="overline">PRIMARY VALIDATION ENDPOINT</span>
          <h2>
            Recall for review.
            <br />
            Adjudicated by people.
          </h2>
          <p>
            Coordinator-verified eligible-for-review recall against
            retrospective manual screening. This is a review-workflow endpoint,
            not enrollment eligibility or clinical benefit.
          </p>
        </div>
        <div className="metric-paper" data-paper>
          <span className="overline">PROPOSED MEASUREMENT · NO RESULTS</span>
          <h3>Recall = TP / (TP + FN)</h3>
          <p>
            Of the cases adjudicated as needing review, how many did the
            pre-screen surface?
          </p>
          <hr />
          <h3>Precision = TP / (TP + FP)</h3>
          <p>
            Of the surfaced cases, how many were confirmed as needing review?
          </p>
          <small>
            TP, FP and FN use the agreed eligible-for-review label. No values
            are claimed.
          </small>
        </div>
      </section>
      <div className="definition-table">
        {[
          [
            "Comparable baseline",
            "Record cohort denominator, manual-screening window and reviewer process.",
          ],
          [
            "Human adjudication",
            "Define disagreement handling, reviewer roles and uncertainty.",
          ],
          [
            "Guardrails",
            "False exclusion, time per reviewed chart and consent breaches.",
          ],
          [
            "Representation & capacity",
            "Inspect criterion-specific failures and recruitment representation; verify local site capacity.",
          ],
          [
            "Commercial proof",
            "A named budget owner and signed conditional scope. Study counts and ad clicks are not revenue TAM.",
          ],
        ].map(([a, b]) => (
          <div key={a}>
            <h3>{a}</h3>
            <p>{b}</p>
          </div>
        ))}
      </div>
      <section className="page-section split-section">
        <div>
          <span className="overline">READINESS IS NOT YET CLAIMED</span>
          <h2>
            Five gates before
            <br />a limited pilot.
          </h2>
          <p>The synthetic exercise supplies none of these approvals.</p>
        </div>
        <GateList />
      </section>
      <StopRule />
      <ValidationNotes />
      <Sources />
      <PageCTA />
    </PageFrame>
  );
}
function ValidationNotes() {
  return (
    <section className="page-section validation-notes">
      <div className="section-heading">
        <span className="overline">VALIDATION RESEARCH PLAN</span>
        <h2>
          Ask about the work.
          <br />
          Test the commitment.
        </h2>
      </div>
      <FAQ
        items={[
          [
            "Buyer interview prompts",
            "Who owns the screening budget today? Which repeated review is most costly to coordinate? Would the trial office or sponsor fund a bounded protocol exercise? What written scope could you conditionally support?",
          ],
          [
            "Operator interview prompts",
            "Walk through the last protocol amendment. Where did you find the source and evidence date? How do you handle missing evidence or false exclusions? Which decisions need the PI, and what baseline screening window can be observed?",
          ],
          [
            "Oversight-owner interview prompts",
            "What governance route could authorize a retrospective cohort? Who defines the input contract and adjudication? Which consent, recontact, representation and conflict-of-interest controls apply? What would stop the exercise?",
          ],
          [
            "Proposed LinkedIn A/B angles",
            "A — “A protocol changed. Which exceptions need another look?” Invite research-operations teams to a coordinator-led version replay. B — “Before a new tool, map the manual review.” Invite a scoped baseline audit. Both must disclose concept DEMO and hypothetical pricing, use the same buyer geography and an agreed spend cap. No campaign is running.",
          ],
          [
            "Traffic and commitment measures",
            "Proposed measures: impressions, qualified visits, role-confirmed pilot requests and drop-offs. Log institution type, decision role and reply reason only with appropriate notice. No patient targeting or patient-derived lookalikes. Stop ads if misleading interpretation is reported. No analytics are installed in this preview.",
          ],
          [
            "Internal tracking proposal",
            "Proposed fields include buyer/operator/sponsor, interview date, incumbent baseline, data rights, oversight owner, module interest, price response, demo objection, cohort design, budget owner, pilot commitment, metric, stop rule, next action and source URL. No Notion or CRM has been changed.",
          ],
        ]}
      />
    </section>
  );
}
function Governance() {
  const gates = [
    [
      "01",
      "Governed input",
      "Institutional review and appropriate authorization or waiver, a defined cohort and minimum necessary access.",
      "Research office / data governance",
    ],
    [
      "02",
      "Protocol interpretation",
      "Identify the governing version, source document and uncertainty before interpreting a criterion.",
      "Coordinator / site PI",
    ],
    [
      "03",
      "Human review",
      "Inspect evidence, adjudicate unknowns and attribute every review action. No automatic determination.",
      "Coordinator / investigator",
    ],
    [
      "04",
      "Separate contact permission",
      "Consent/recontact, language approval and site capacity are independent gates. The demo stays unsent.",
      "Site-authorized oversight owner",
    ],
  ];
  return (
    <PageFrame
      eyebrow="GOVERNANCE & HUMAN ACCOUNTABILITY"
      title="A source. An owner.|A permission boundary."
      intro="Design the workflow around the people who authorize and review it. These are proposed controls for evaluation, not a claim of healthcare compliance."
      theme="sage"
      breadcrumbs={[["Governance"]]}
    >
      <div className="governance-path">
        <i className="governance-progress" aria-hidden="true" />
        {gates.map(([n, t, p, owner]) => (
          <article data-shift key={n}>
            <span className="gate-node">{n}</span>
            <div>
              <h2>{t}</h2>
              <p>{p}</p>
              <span className="overline">OWNER TO AGREE / {owner}</span>
            </div>
            <LockKey size={24} />
          </article>
        ))}
      </div>
      <section className="page-section">
        <div className="section-heading">
          <span className="overline">CURRENT BOUNDARIES</span>
          <h2>
            Separate the preview
            <br />
            from the proposed controls.
          </h2>
        </div>
        <div className="boundary-grid">
          <div>
            <h3>This website</h3>
            <p>
              Synthetic identifiers and source documents; local, reversible demo
              interactions; locked educational drafts. No records upload,
              patient contact, EHR access or clinical writes.
            </p>
          </div>
          <div>
            <h3>A future governed exercise</h3>
            <p>
              Written sponsorship and access rights; security and oversight
              review; source-linked audit requirements; consent and
              conflict-of-interest controls; agreed input and deletion
              contracts.
            </p>
          </div>
        </div>
      </section>
      <section className="page-section split-section">
        <div>
          <h2>
            First-order questions
            <br />
            remain open.
          </h2>
          <p>
            IRB review, HIPAA authorization or waiver, changing criteria, EHR
            extraction, investigator judgment, representative recruitment and
            actual site capacity need the relevant institutional owners.
          </p>
        </div>
        <div className="governance-note">
          <ShieldCheck size={34} />
          <h3>Review requirements with your institution.</h3>
          <p>
            Source links explain applicable topics. The preview does not
            establish legal sufficiency, regulatory clearance, security
            certification or clinical benefit.
          </p>
          <TextLink to="/resources/registry-local-data">
            Read the data-boundary guide
          </TextLink>
        </div>
      </section>
      <StopRule />
      <Sources />
      <PageCTA />
    </PageFrame>
  );
}
function Pilot() {
  const [funding, setFunding] = useState("Trial office");
  return (
    <PageFrame
      eyebrow="PILOT & HYPOTHESIS PRICING"
      title="A bounded scope.|An honest test."
      intro="One active protocol and an appropriately governed retrospective cohort. Evaluate the coordinator workflow against the process already in use."
      breadcrumbs={[["Pilot & pricing"]]}
    >
      <div className="pricing-ledger" data-paper>
        <div>
          <span className="overline">
            HYPOTHETICAL TEST PRICE · NOT AN ACTIVE OFFER
          </span>
          <h2>
            $1,500<span> / active protocol / month</span>
          </h2>
          <p>+ $5,000 proposed site onboarding</p>
          <small>
            No checkout, reimbursement claim, guaranteed outcome or pricing
            acceptance. Final scope and funding would require agreement.
          </small>
        </div>
        <div>
          <span className="overline">TEST THE ECONOMIC BUYER</span>
          <div
            className="funding-switch"
            role="group"
            aria-label="Proposed funding route"
          >
            {["Trial office", "Sponsor-supported"].map((x) => (
              <button
                key={x}
                onClick={() => setFunding(x)}
                aria-pressed={funding === x}
              >
                {x}
              </button>
            ))}
          </div>
          <p role="status">
            {funding === "Trial office"
              ? "Who owns the site operations budget, and which observed review bottleneck would justify a conditional paid scope?"
              : "Who retains site control, and how would sponsor funding preserve consent, local permission and conflict-of-interest safeguards?"}
          </p>
          <TextLink to="/request-pilot">Discuss a conditional scope</TextLink>
        </div>
      </div>
      <section className="page-section">
        <span className="overline">VALIDATION BEFORE EXPANSION</span>
        <div className="pilot-timeline">
          {[
            [
              "Interview",
              "Speak separately with buyer, operator and oversight owner.",
            ],
            [
              "Design",
              "Agree one cohort, one protocol, baseline and adjudication.",
            ],
            [
              "Review",
              "Evaluate recall and precision with false-exclusion and consent guardrails.",
            ],
            [
              "Decide",
              "Proceed only with written approvals and a conditional paid scope.",
            ],
          ].map(([t, p], i) => (
            <article data-page-reveal key={t}>
              <span>0{i + 1}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="page-section split-section">
        <div>
          <span className="overline">REQUIRED, NOT YET DEMONSTRATED</span>
          <h2>
            Readiness is a gate.
            <br />
            Not a headline.
          </h2>
          <TextLink to="/evidence">Review the endpoint and guardrails</TextLink>
        </div>
        <GateList />
      </section>
      <StopRule />
      <FAQ items={faqs.slice(2)} />
      <PageCTA title="Start with a protocol-version conversation." />
    </PageFrame>
  );
}
function Inquiry({ contact = false }) {
  const [params] = useSearchParams(),
    [submitted, setSubmitted] = useState(null),
    [showDraft, setShowDraft] = useState(false),
    [chosen, setChosen] = useState(
      contact
        ? params.get("topic") === "workspace-access"
          ? "Workspace access"
          : ""
        : params.get("module") || "",
    );
  const [error, setError] = useState("");
  useEffect(() => {
    if (!submitted) return;
    const el = document.querySelector(
      showDraft ? ".draft-confirmation" : ".business-form input",
    );
    el?.focus({ preventScroll: true });
    document
      .querySelector(".inquiry-form-panel")
      ?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [showDraft, submitted]);

  const submit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    if (!d.consent) {
      setError("Please acknowledge the preview privacy notice.");
      return;
    }
    setError("");
    setSubmitted({
      ...d,
      notice: "Preview notice v2.0",
      preparedAt: new Date().toISOString(),
    });
    setShowDraft(true);
  };
  const download = () => {
    const blob = new Blob(
      [
        Object.entries(submitted)
          .map(([k, v]) => k + ": " + v)
          .join("\n"),
      ],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = "TrialQueue-inquiry-draft.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <PageFrame
      eyebrow={
        contact ? "A BUSINESS WORKFLOW CONVERSATION" : "REQUEST A SCOPED PILOT"
      }
      title={
        contact
          ? "Start with the question.|Bring the right people."
          : "Bring one protocol.|We’ll map the review."
      }
      intro={
        contact
          ? "For trial operations, research informatics and feasibility teams. This local preview can prepare a business inquiry; it cannot send one."
          : "A first conversation about your workflow, institutional review route and conditional scope. No patient information or clinical records."
      }
      theme="bone"
      breadcrumbs={[[contact ? "Contact" : "Request a scoped pilot"]]}
    >
      <div className="inquiry-layout">
        <aside>
          <span className="overline">BEFORE A LIMITED PILOT</span>
          <h2>
            A named owner.
            <br />A measurable question.
          </h2>
          <p>
            Trial-office directors and site-network leads are the decision
            buyers. A site PI and research office govern access.
          </p>
          <ul className="check-list">
            <li>
              <Check />
              One protocol and a retrospective design.
            </li>
            <li>
              <Check />
              An observed manual-screening baseline.
            </li>
            <li>
              <Check />A governance route and written scope.
            </li>
          </ul>
          <p className="inquiry-boundary">
            <LockKey size={18} /> Business information only. No patient details,
            diagnoses, clinical narratives or uploads.
          </p>
          <TextLink to="/pilot">Review the pilot prerequisites</TextLink>
        </aside>
        <div className="inquiry-form-panel">
          {submitted && showDraft ? (
            <div className="draft-confirmation" role="status" tabIndex={-1}>
              <div className="confirmation-mark">
                <Check size={35} />
              </div>
              <span className="overline">DRAFT PREPARED · NOT SENT</span>
              <h2>Your conversation starter is ready.</h2>
              <p>
                This frontend preview has no submission service. Nothing was
                transmitted or saved to a CRM. Download your local copy or
                return to edit it.
              </p>
              <dl>
                {Object.entries(submitted)
                  .filter(
                    ([k]) => !["consent", "preparedAt", "notice"].includes(k),
                  )
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt>{k.replaceAll("_", " ")}</dt>
                      <dd>{v || "Not specified"}</dd>
                    </div>
                  ))}
              </dl>
              <small>
                {submitted.notice} · acknowledgement prepared{" "}
                {new Date(submitted.preparedAt).toLocaleString()}
              </small>
              <div className="page-actions">
                <button className="button" onClick={download}>
                  Download draft <DownloadSimple size={18} />
                </button>
                <button
                  className="plain-button"
                  onClick={() => setShowDraft(false)}
                >
                  Edit draft <ArrowCounterClockwise size={16} />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="business-form">
              <div className="form-preview-note">
                <span className="status unknown">PREVIEW FORM</span>
                <p>
                  Prepares a local draft only. No email, analytics or submission
                  service is connected.
                </p>
              </div>
              <label>
                Work email
                <input
                  name="work_email"
                  defaultValue={submitted?.work_email}
                  type="email"
                  autoComplete="email"
                  placeholder="you@institution.org"
                  required
                  maxLength={180}
                />
              </label>
              <label>
                Organization
                <input
                  name="organization"
                  defaultValue={submitted?.organization}
                  autoComplete="organization"
                  placeholder="Institution or organization"
                  required
                  maxLength={180}
                />
              </label>
              <div className="form-row">
                <label>
                  Your role
                  <select
                    name="role"
                    aria-label="Your role"
                    required
                    defaultValue={submitted?.role || ""}
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    {[
                      "Trial-office director",
                      "Site-network recruitment lead",
                      "Coordinator / site team",
                      "Site PI / research office",
                      "Research informatics",
                      "CRO feasibility",
                      "Other business role",
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Site / region
                  <input
                    name="site_region"
                    defaultValue={submitted?.site_region}
                    placeholder="e.g. US academic center"
                    required
                    maxLength={140}
                  />
                </label>
              </div>
              <label>
                {contact ? "Topic" : "Module of interest (optional)"}
                <select
                  name={contact ? "topic" : "module"}
                  value={chosen}
                  onChange={(e) => setChosen(e.target.value)}
                >
                  <option value="">
                    {contact
                      ? "General business inquiry"
                      : "Let’s identify the right module"}
                  </option>
                  {(contact
                    ? [
                        "Workflow conversation",
                        "Workspace access",
                        "Privacy or deletion request",
                        "Research sources",
                      ]
                    : modules.map((x) => x.name)
                  ).map((x) => (
                    <option key={x} value={contact ? x : slug(x)}>
                      {x}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {contact
                  ? "What would you like to discuss?"
                  : "Which protocol-change or screening step would you want to review?"}
                <textarea
                  name="workflow_fit"
                  defaultValue={submitted?.workflow_fit}
                  rows={4}
                  placeholder="Describe the operational workflow only. No patient information."
                  required
                  maxLength={1200}
                />
              </label>
              <label className="consent-check">
                <input
                  name="consent"
                  defaultChecked={!!submitted?.consent}
                  type="checkbox"
                  required
                />
                <span>
                  I have read the{" "}
                  <Link to="/legal/privacy" target="_blank">
                    preview privacy notice
                  </Link>{" "}
                  and understand this prepares a local draft only. I will not
                  include patient or clinical information.
                </span>
              </label>
              {error && <p role="alert">{error}</p>}
              <button className="button form-submit" type="submit">
                Prepare inquiry draft <ArrowUpRight size={18} />
              </button>
              <p className="form-fine-print">
                Nothing is sent. Notice version and acknowledgement time appear
                in your local draft. Future live collection requires a verified
                operator, destination and deletion route.
              </p>
            </form>
          )}
        </div>
      </div>
    </PageFrame>
  );
}
function Resources() {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("All");
  const filtered = guides.filter(
    (g) =>
      (category === "All" || g.category === category) &&
      (g.title + " " + g.intro).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <PageFrame
      eyebrow="THE RESOURCE LIBRARY"
      title="Notes for a more|accountable review."
      intro="Original concept guides for protocol changes, source boundaries and retrospective evaluation. Read alongside the linked primary sources."
      breadcrumbs={[["Resources"]]}
    >
      <div className="library-toolbar">
        <label className="library-search">
          <MagnifyingGlass size={21} />
          <input
            aria-label="Search guides"
            placeholder="Search guides"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div role="group" aria-label="Guide category">
          {["All", "Workflow", "Governance", "Evaluation"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={c === category}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="overline library-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "GUIDE" : "GUIDES"} · CONCEPT
        NOTES
      </p>
      <div className="guide-grid">
        {filtered.map((g, i) => (
          <Link key={g.slug} className="guide-card" to={"/resources/" + g.slug}>
            <div
              className={
                "guide-illustration guide-illustration--" +
                g.category.toLowerCase()
              }
              aria-hidden="true"
            >
              <span>0{guides.indexOf(g) + 1}</span>
              {g.category === "Workflow" ? (
                <GitDiff size={65} />
              ) : g.category === "Governance" ? (
                <LockKey size={65} />
              ) : (
                <ListChecks size={65} />
              )}
              <i />
              <i />
              <i />
            </div>
            <span className="overline">{g.category} / 4 MIN READ</span>
            <h2>{g.title}</h2>
            <p>{g.intro}</p>
            <span className="page-text-link">
              Read the guide
              <ArrowRight size={21} />
            </span>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No guide matches that search.</h2>
          <button
            className="plain-button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Clear search and filters <ArrowCounterClockwise size={17} />
          </button>
        </div>
      )}
      <Sources />
      <PageCTA />
    </PageFrame>
  );
}
function Guide({ guide }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const f = () => {
      const el = document.querySelector(".guide-article");
      if (el) {
        const box = el.getBoundingClientRect();
        setProgress(
          Math.max(0, Math.min(1, -box.top / (box.height - innerHeight * 0.4))),
        );
      }
    };
    window.addEventListener("scroll", f, { passive: true });
    f();
    return () => window.removeEventListener("scroll", f);
  }, [guide]);
  return (
    <PageFrame
      eyebrow={guide.category.toUpperCase() + " / CONCEPT GUIDE"}
      title={guide.title}
      intro={guide.intro}
      theme="bone"
      breadcrumbs={[["Resources", "/resources"], [guide.category + " guide"]]}
    >
      <div className="reading-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="guide-layout">
        <aside className="guide-toc">
          <span className="overline">IN THIS GUIDE</span>
          {guide.sections.map(([t], i) => (
            <a key={t} href={"#note-" + i}>
              <span>0{i + 1}</span>
              {t}
            </a>
          ))}
          <p>
            Original research-stage concept notes. No clinical or legal
            guidance.
          </p>
        </aside>
        <article className="guide-article">
          {guide.sections.map(([t, p], i) => (
            <section id={"note-" + i} key={t}>
              <span className="overline">0{i + 1}</span>
              <h2>{t}</h2>
              <p>{p}</p>
              {i === 1 && (
                <blockquote>
                  Visible uncertainty is a review state. It must not disappear
                  at a handoff.
                </blockquote>
              )}
            </section>
          ))}
          <div className="guide-callout">
            <DemoBadge />
            <p>
              All identifiers, values and examples in this guide are fictional.
              TrialQueue is not an operating clinical product.
            </p>
            <TextLink to="/demo">Follow the synthetic example</TextLink>
          </div>
        </article>
      </div>
      <Sources />
      <PageCTA />
    </PageFrame>
  );
}
function Why() {
  const [amount, setAmount] = useState(50);
  return (
    <PageFrame
      eyebrow="WHY TRIALQUEUE"
      title="Less scattered context.|More accountable review."
      intro="Protocol changes can send a team back through chart evidence, dates and unresolved questions. TrialQueue proposes a cited pre-screen layer for the workflow already in use."
      theme="bone"
      breadcrumbs={[["Why TrialQueue"]]}
    >
      <div className="workflow-comparison">
        <div>
          <span className="overline">THE OPERATIONAL BOTTLENECK</span>
          <h2>
            One amendment.
            <br />
            Context in different places.
          </h2>
          <p>
            Compare an illustrative manual handoff with a proposed cited record.
            This is a workflow concept, not a measured before-and-after outcome.
          </p>
          <label>
            Compare the handoff{" "}
            <input
              type="range"
              min="0"
              max="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <span>{amount}% proposed context shown</span>
          </label>
        </div>
        <div className="comparison-window">
          <div className="scattered-papers" aria-hidden={amount === 100}>
            <span>
              Protocol v2
              <br />
              <b>§4.1 threshold</b>
            </span>
            <span>
              Lab evidence
              <br />
              <b>Which date?</b>
            </span>
            <span>
              Coordinator notes
              <br />
              <b>Who owns this?</b>
            </span>
            <p>Illustrative scattered handoff</p>
          </div>
          <div
            className="joined-paper"
            style={{ clipPath: `inset(0 ${100 - amount}% 0 0)` }}
          >
            <span className="overline">PROPOSED CITED RECORD</span>
            <h3>TQ-SYN-002</h3>
            <div>
              Protocol v2 · §4.1 <Check size={17} />
            </div>
            <div>
              SYN-LAB-002 · 20 Sep <Quotes size={17} />
            </div>
            <div>
              Evidence status <span className="status unknown">Unknown</span>
            </div>
            <div>
              Next owner <b>Coordinator B</b>
            </div>
            <small>DEMO — SYNTHETIC DATA</small>
          </div>
          <i className="comparison-divider" style={{ left: amount + "%" }} />
        </div>
      </div>
      <section className="page-section">
        <div className="section-heading">
          <span className="overline">INCUMBENTS & ADJACENT ALTERNATIVES</span>
          <h2>
            The team already
            <br />
            has a process.
          </h2>
          <p>
            A proposed tool must demonstrate operational value within that
            reality. Switching costs and access remain untested.
          </p>
        </div>
        <div className="definition-table">
          {[
            [
              "Coordinator chart screening",
              "Human judgment and local knowledge are essential. The question is whether source-linked context reduces repeated coordination.",
            ],
            [
              "EHR registries & referral networks",
              "Established data and referral workflows may already address the need. Authorized extraction and differentiation need testing.",
            ],
            [
              "ClinicalTrials.gov / sponsor databases",
              "Study discovery and public protocol context are useful substitutes for some tasks; they are not equivalent patient-matching agents.",
            ],
            [
              "Patient-to-research discovery",
              "Antidote describes a patient-facing discovery experience. That is adjacent to the proposed site-side coordinator review workflow.",
            ],
            [
              "Site-side recruitment vendors",
              "Deep 6 AI is an adjacent category reference. Specific capabilities have not been independently verified for this brief.",
            ],
          ].map(([t, p]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
        <p className="source-footnote">
          Adjacent vendor references:{" "}
          <a href="https://www.antidote.me/" target="_blank" rel="noreferrer">
            Antidote
          </a>{" "}
          ·{" "}
          <a href="https://deep6.ai/" target="_blank" rel="noreferrer">
            Deep 6 AI
          </a>
          . No affiliation or endorsement.
        </p>
      </section>
      <section className="boundary-grid">
        <div>
          <span className="overline">THE DIFFERENTIATION TO TEST</span>
          <h3>Version change → evidence → owner.</h3>
          <p>
            Recalculate a synthetic criterion when the fictional protocol
            changes. Preserve its source, uncertainty and coordinator next
            action.
          </p>
        </div>
        <div>
          <span className="overline">THE BURDEN OF PROOF</span>
          <h3>Earn the right to expand.</h3>
          <p>
            Compare with manual screening, measure false exclusions and time per
            chart, and secure a conditional paid commitment.
          </p>
        </div>
      </section>
      <PageCTA />
    </PageFrame>
  );
}
function Company() {
  return (
    <PageFrame
      eyebrow="ABOUT TRIALQUEUE"
      title="A person at|every next step."
      intro="TrialQueue is a research-stage concept for a human-accountable pre-screen review workflow. The working brand, product and commercial assumptions remain under validation."
      theme="ink"
      breadcrumbs={[["Company"]]}
    >
      <div className="company-mark" data-paper>
        <img
          src="/assets/logos/trialqueue-mark-reverse.svg"
          alt="TrialQueue Review Turn symbol"
        />
        <span className="overline">CITED EVIDENCE → HUMAN REVIEW</span>
      </div>
      <section className="page-section split-section">
        <div>
          <span className="overline">OUR VISION</span>
          <h2>
            Make the source,
            <br />
            exception and owner
            <br />
            traceable.
          </h2>
        </div>
        <div>
          <p className="large-copy">
            A proposed operating layer should help a team inspect a decision’s
            context. It should preserve uncertainty and make the permission
            boundary visible.
          </p>
          <p>
            Our first mission is narrow: a one-protocol synthetic workbench with
            met / not met / unknown criteria and coordinator verification.
            Expand only after appropriate permission and measurable operational
            gain are demonstrated.
          </p>
        </div>
      </section>
      <div className="principles-list">
        {[
          [
            "01",
            "Start where the workflow fails.",
            "Observe the incumbent process with the operator, buyer and oversight owner.",
          ],
          [
            "02",
            "Keep the unresolved visible.",
            "Dated evidence, absent sources and interpretation uncertainty deserve a named next step.",
          ],
          [
            "03",
            "Measure before expanding.",
            "A synthetic demo is not demand, efficacy, compliance or a pilot result.",
          ],
        ].map(([n, t, p]) => (
          <div key={n} data-shift>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{p}</p>
          </div>
        ))}
      </div>
      <section className="page-section split-section">
        <div>
          <span className="overline">THE EXPANSION HYPOTHESIS</span>
          <h2>
            Site fit first.
            <br />
            Network scope later.
          </h2>
        </div>
        <div>
          <p>
            Begin in high-friction therapeutic areas with a governed site
            workflow. Network feasibility and sponsor-supported workflows are
            later hypotheses, subject to consent and conflict-of-interest
            controls.
          </p>
          <p>
            The number of studies is not revenue TAM. Commercial evidence
            requires signed site or sponsor budgets, repeatable onboarding and
            an observed reason to switch.
          </p>
          <TextLink to="/evidence">See what must be validated</TextLink>
        </div>
      </section>
      <PageCTA />
    </PageFrame>
  );
}
function SignIn() {
  return (
    <PageFrame
      eyebrow="WORKSPACE ACCESS"
      title="Your review.|Your team."
      intro="A complete workspace access concept. Authentication is not connected in this research-stage preview."
      theme="ink"
      breadcrumbs={[["Sign in"]]}
      className="signin-page"
      hideIntro
    >
      <div className="signin-layout">
        <div className="signin-art" aria-hidden="true">
          <div className="signin-rails">
            <i />
            <i />
            <i />
          </div>
          <img src="/assets/logos/trialqueue-mark-reverse.svg" alt="" />
          <span className="overline">
            CITED EVIDENCE.
            <br />
            HUMAN ACCOUNTABILITY.
          </span>
        </div>
        <div className="signin-panel">
          <LockKey size={29} />
          <h1>Sign in to TrialQueue</h1>
          <p>
            Workspace access will be available only for authorized teams after
            validation and required approvals.
          </p>
          <div className="signin-unavailable" role="status">
            <span className="status unknown">NOT CONNECTED</span>
            <p>This preview does not accept credentials or create accounts.</p>
          </div>
          <form>
            <label>
              Work email
              <input
                aria-label="Work email (unavailable in preview)"
                placeholder="you@institution.org"
                type="email"
                disabled
              />
            </label>
            <label>
              Password
              <input
                aria-label="Password (unavailable in preview)"
                placeholder="Workspace password"
                type="password"
                disabled
              />
            </label>
            <div className="signin-options">
              <label>
                <input type="checkbox" disabled />
                Remember this device
              </label>
              <Link to="/contact?topic=workspace-access">Access help</Link>
            </div>
            <button className="button" disabled type="button">
              <LockKey size={17} /> Sign in unavailable in preview
            </button>
          </form>
          <div className="signin-next">
            <p>Exploring the proposed workflow?</p>
            <TextLink to="/demo">Open the synthetic demo</TextLink>
            <Link to="/request-pilot">Discuss authorized pilot access</Link>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
function Legal({ privacy }) {
  const sections = privacy
    ? [
        [
          "Status of this notice",
          "Draft preview notice v2.0 · 18 October 2026. TrialQueue is a working research-stage brand. A verified legal operator, contact destination and reviewed live notice are prerequisites to collecting inquiries through a deployed service.",
        ],
        [
          "What this local preview does",
          "The inquiry form prepares a draft in browser memory. It is not transmitted to an email service, CRM or backend. Downloading it saves a text file to your device. Refreshing or leaving the page clears the form state. Do not enter patient, health or clinical information.",
        ],
        [
          "Authentication and demo data",
          "Sign-in controls are disabled and do not accept credentials. The workbench uses fixed synthetic records only. Review choices stay in page memory and are not written to clinical systems.",
        ],
        [
          "Assets and analytics",
          "Fonts and branded assets are served locally. No advertising pixels, campaign analytics, lead tracking or analytics success events are installed in this preview. The web server and browser may process ordinary request metadata; this is separate from the local form draft.",
        ],
        [
          "Proposed future inquiry fields",
          "A live B2B inquiry would require a reviewed notice and minimum necessary role, organization, work email, site/region and workflow-fit response. Consent/notice version and timestamp, source/UTM and qualified-lead status would require appropriate disclosure and retention/deletion rules before implementation. No clinical record upload is planned for this form.",
        ],
        [
          "Deletion and questions",
          "There is no stored inquiry database in this preview. Delete a downloaded draft on your own device and close or refresh the page to clear in-memory state. The contact page can prepare a local privacy inquiry but cannot deliver it; a verified request destination must be established before live collection.",
        ],
        [
          "External sources",
          "Links to official and vendor sources open external websites with their own policies. No endorsement or shared account access is implied. This draft needs operator and legal review before public use.",
        ],
      ]
    : [
        [
          "Purpose and status",
          "Draft preview terms · 18 October 2026. This website illustrates the TrialQueue research-stage concept. It is not an operating clinical product, a contractual service offer, or a validated patient matching system. The working name and mark are not cleared.",
        ],
        [
          "Synthetic demonstration",
          "Identifiers, source references, dates and values in the product preview are fictional. Met, not met and unknown describe a single invented criterion, not enrollment eligibility. Do not use the preview for diagnosis, treatment, recruitment or clinical decisions.",
        ],
        [
          "No operational service",
          "No EHR integration, patient contact, outbound messaging, clinical-system write, payment collection or authentication is provided. Simulated source checks are local, reversible demonstrations. Educational drafts remain unsent.",
        ],
        [
          "Pricing and pilot scope",
          "The $1,500 per active protocol per month and $5,000 onboarding figures are hypothetical test prices, not accepted pricing or an active checkout. Any future pilot needs separate written scope, sponsorship, data-access/security approvals and human oversight.",
        ],
        [
          "Permitted preview inputs",
          "Use business workflow descriptions only in the local inquiry form. Do not enter patient/provider identifiers, sensitive records, medical histories or credentials. No real clinical data should be supplied through this website.",
        ],
        [
          "Sources and intellectual property",
          "TrialQueue uses original copy and diagrams with linked primary-source references. Third-party names are contextual references, not partners or endorsements. Sources and conceptual illustrations do not establish legal, clinical or commercial clearance.",
        ],
        [
          "Future agreements",
          "A verified operator and reviewed terms, privacy notice, data agreements, security requirements and relevant institutional approvals must precede any live service or governed data exercise. These draft notes are not a substitute for those agreements.",
        ],
      ];
  return (
    <PageFrame
      eyebrow="DRAFT PREVIEW DOCUMENT"
      title={
        privacy ? "Privacy, stated plainly." : "The boundaries of this preview."
      }
      intro="For the local concept website. Operator and legal review are required before any live collection or service."
      breadcrumbs={[[privacy ? "Privacy notice" : "Preview terms"]]}
      className="legal-page"
    >
      <div className="legal-layout">
        <aside>
          <span className="overline">DRAFT · VERSION 2.0</span>
          <p>18 October 2026</p>
          <TextLink to={privacy ? "/legal/terms" : "/legal/privacy"}>
            {privacy ? "Read preview terms" : "Read privacy notice"}
          </TextLink>
        </aside>
        <article>
          {sections.map(([t, p], i) => (
            <section key={t}>
              <span className="overline">0{i + 1}</span>
              <h2>{t}</h2>
              <p>{p}</p>
            </section>
          ))}
          <TextLink to="/contact">Prepare a business inquiry</TextLink>
        </article>
      </div>
    </PageFrame>
  );
}
function NotFound() {
  return (
    <PageFrame
      eyebrow="404 / THE TRAIL ENDS HERE"
      title="Let’s find|the next step."
      intro="That page isn’t part of the preview. Return to the platform, open the synthetic demo or explore the resource library."
      breadcrumbs={[["Page not found"]]}
    >
      <div className="notfound-mark">
        <img src="/assets/logos/trialqueue-mark-primary.svg" alt="" />
      </div>
      <Actions
        primary="Explore the platform"
        to="/platform"
        secondary="Open the synthetic demo"
        secondaryTo="/demo"
      />
    </PageFrame>
  );
}
export default function SupportPages() {
  const { pathname } = useLocation();
  const productIndex = productLinks.findIndex((x) => x.to === pathname),
    solutionIndex = solutionLinks.findIndex((x) => x.to === pathname),
    guide = guides.find((g) => "/resources/" + g.slug === pathname);
  if (productIndex >= 0)
    return <ProductPage key={pathname} index={productIndex} />;
  if (solutionIndex >= 0)
    return <SolutionPage key={pathname} index={solutionIndex} />;
  if (guide) return <Guide key={pathname} guide={guide} />;
  const pages = {
    "/platform": Platform,
    "/products": Products,
    "/solutions": Solutions,
    "/demo": Demo,
    "/why-trialqueue": Why,
    "/evidence": Evidence,
    "/governance": Governance,
    "/pilot": Pilot,
    "/resources": Resources,
    "/company": Company,
    "/sign-in": SignIn,
  };
  const Page = pages[pathname];
  return Page ? (
    <Page key={pathname} />
  ) : pathname === "/request-pilot" ? (
    <Inquiry key={pathname} />
  ) : pathname === "/contact" ? (
    <Inquiry key={pathname} contact />
  ) : pathname === "/legal/privacy" ? (
    <Legal key={pathname} privacy />
  ) : pathname === "/legal/terms" ? (
    <Legal key={pathname} />
  ) : (
    <NotFound />
  );
}
