import { modules } from "./data";
export const slug = (name) => name.toLowerCase().replaceAll(" ", "-");
export const productLinks = modules.map((m) => ({
  to: "/products/" + slug(m.name),
  label: m.name,
  detail: m.offer,
}));
export const solutionLinks = [
  {
    to: "/solutions/academic-centers",
    label: "Academic centers",
    detail: "Trial-office, coordinator and PI review",
  },
  {
    to: "/solutions/site-networks",
    label: "Site networks",
    detail: "Local permissions before wider feasibility",
  },
  {
    to: "/solutions/research-informatics-cro",
    label: "Informatics & CRO teams",
    detail: "Provenance and retrospective evaluation",
  },
];
export const guides = [
  {
    slug: "protocol-version-review",
    category: "Workflow",
    title: "When a protocol changes, follow the source.",
    intro:
      "A coordinator-led walkthrough of one fictional amendment, three evidence states and an attributed next step.",
    sections: [
      [
        "Start with the version, not the value.",
        "In TQ-DEMO-ONC-01, the fictional ANC threshold moves from 1.0 to 1.5 ×10⁹/L on 15 October 2026. Record both protocol versions, the changed criterion and its source reference (§4.1). The number alone does not explain which protocol applied when the evidence was collected.",
      ],
      [
        "Keep the date beside the evidence.",
        "TQ-SYN-001 has a current synthetic value of 1.8 and meets this single criterion. TQ-SYN-002 has a value of 1.7 dated 20 September; it remains unknown because it is outside the invented 14-day window. TQ-SYN-003 has a current value of 1.2 and needs review against the amended rule. None of these states determines overall enrollment eligibility.",
      ],
      [
        "Give the exception a person.",
        "A coordinator inspects the cited source and records an attributed, reversible review step. An absent source, stale result or ambiguous rule calls for clarification or abstention. It never justifies silently treating an unknown as a failed criterion.",
      ],
      [
        "Stop at the permission boundary.",
        "The synthetic educational draft stays unsent. Evidence review does not establish permission to recontact someone, consent to a study, or current site capacity. Those require the appropriate site process before any future patient contact.",
      ],
    ],
  },
  {
    slug: "registry-local-data",
    category: "Governance",
    title: "A study record is only one part of the picture.",
    intro:
      "Separate public protocol context, governed chart evidence and locally verified operating conditions.",
    sections: [
      [
        "Public registry context",
        "ClinicalTrials.gov provides public study records and documented fields for eligibility and recruitment status. Those records can be a starting point for criteria normalization; they are not a patient chart, and a recruitment label does not guarantee that a particular site has capacity.",
      ],
      [
        "Local protocol authority",
        "A local team must identify the protocol version that governs its workflow, including amendments and source-document provenance. A proposed normalization layer should retain the original wording, the interpreted criterion and uncertainty about that interpretation.",
      ],
      [
        "Governed local evidence",
        "Any future chart-based exercise needs appropriately authorized access, a defined cohort, minimum necessary data and an identified oversight owner. Integration, extraction and input contracts remain discovery questions for TrialQueue; no EHR connection is available in this preview.",
      ],
      [
        "Separate the permissions",
        "Permission to use information for research, permission to recontact someone and consent to participate in a study are different questions. A B2B pilot inquiry supplies none of these permissions. Start with your research office and the applicable institutional review route.",
      ],
    ],
  },
  {
    slug: "retrospective-pilot",
    category: "Evaluation",
    title: "Evaluate the review, before expanding the workflow.",
    intro:
      "Define a denominator, adjudicated baseline and stop rule before a governed retrospective exercise.",
    sections: [
      [
        "Fix the retrospective design",
        "Choose one protocol, an appropriately governed retrospective cohort and the baseline screening window. Name the site sponsor, the coordinator/operator, the adjudication owner and the oversight owner before any data is supplied. No patient contact is part of this design.",
      ],
      [
        "Define the primary endpoint",
        "Coordinator-verified eligible-for-review recall compares cases flagged for review with the cases identified through adjudicated manual screening. Record the denominator and disagreement handling. This is a review-workflow endpoint, not evidence of clinical benefit or an automated eligibility decision.",
      ],
      [
        "Measure the tradeoffs",
        "Report precision alongside recall, false exclusions, time per reviewed chart and any consent breach. Examine criterion-specific failures and representative recruitment concerns. Do not claim a time saving until a comparable baseline and measured result exist.",
      ],
      [
        "Agree on the stop condition",
        "Stop or reposition if there is no governed chart access, PI sponsorship or budget, or if false exclusions make pre-screening unsafe. A limited pilot also needs eight interviews, one governed design, one named sponsor, written conditional paid scope, and signed access/security and human-oversight approvals.",
      ],
    ],
  },
];
export const resourceLinks = [
  {
    to: "/resources",
    label: "Resource library",
    detail: "Workflow, data boundaries and evaluation",
  },
  {
    to: "/evidence",
    label: "Evidence & validation",
    detail: "What is known, unknown and still to test",
  },
  {
    to: "/governance",
    label: "Governance",
    detail: "Sources, people and permission gates",
  },
  {
    to: "/why-trialqueue",
    label: "Why TrialQueue",
    detail: "Incumbent workflows and tradeoffs",
  },
  {
    to: "/demo",
    label: "Synthetic demo",
    detail: "One amendment. Nine fictional records.",
  },
];
export const routes = [
  "/",
  "/why-trialqueue",
  "/platform",
  "/products",
  ...productLinks.map((x) => x.to),
  "/solutions",
  ...solutionLinks.map((x) => x.to),
  "/demo",
  "/evidence",
  "/governance",
  "/pilot",
  "/request-pilot",
  "/resources",
  ...guides.map((x) => "/resources/" + x.slug),
  "/company",
  "/contact",
  "/sign-in",
  "/legal/privacy",
  "/legal/terms",
];
