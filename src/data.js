export const modules = [
  {
    name: "Trial Desk",
    offer: "Registry-to-local-protocol criteria normalization",
    short: "Bring the protocol into focus.",
    text: "Keep the public registry and local protocol in context. Surface version differences and the criterion that needs a person’s attention.",
    detail: "Protocol versions · criterion provenance · source context",
    art: "desk",
  },
  {
    name: "Trial Review",
    offer: "Candidate pre-screen with chart-evidence citations and uncertainty",
    short: "Keep the source beside the statement.",
    text: "A proposed pre-screen carries its evidence, date and uncertainty. An unanswered question stays unknown until a coordinator resolves it.",
    detail: "Cited source · evidence age · met / not met / unknown",
    art: "review",
  },
  {
    name: "Trial Proof",
    offer: "Coordinator case-review queue",
    short: "Give every exception an owner.",
    text: "Bring affected records into a shared review queue, with an attributed decision and dated next action. A pre-screen never becomes an enrollment decision.",
    detail: "Review owner · reversible decisions · exception trail",
    art: "proof",
  },
  {
    name: "Trial Signal",
    offer: "Approved consent/recontact and multilingual educational workflow",
    short: "Make permission part of the workflow.",
    text: "Prepare an educational draft within an approved workflow. The preview remains locked and unsent while permission and site capacity are unconfirmed.",
    detail: "Permission gate · language review · unsent draft",
    art: "signal",
  },
  {
    name: "Trial Report",
    offer: "Site funnel/criterion failure analysis",
    short: "Learn where review gets stuck.",
    text: "Explore criterion-level bottlenecks and site funnel patterns with clear denominators. Illustrative analysis is a question for validation, never a claim of impact.",
    detail: "Criterion patterns · denominators · site context",
    art: "report",
  },
];
export const cases = [
  {
    id: "TQ-SYN-001",
    value: "1.8",
    state: "Met",
    tone: "met",
    date: "16 Oct 2026",
    source: "SYN-LAB-001",
    owner: "Coordinator A",
    time: "09:12",
    summary: "Current evidence supports this criterion.",
    next: "Verify the cited source, then continue the remaining protocol review.",
    exception:
      "No exception on this illustrative criterion. Overall eligibility is undetermined.",
  },
  {
    id: "TQ-SYN-002",
    value: "1.7",
    state: "Unknown",
    tone: "unknown",
    date: "20 Sep 2026",
    source: "SYN-LAB-002",
    owner: "Coordinator B",
    time: "09:24",
    summary: "A value without current evidence is still unknown.",
    next: "Clarify the source date. The sample is outside the invented 14-day window.",
    exception:
      "Dated evidence. Do not infer a current value or exclude the record.",
  },
  {
    id: "TQ-SYN-003",
    value: "1.2",
    state: "Not met",
    tone: "notmet",
    date: "16 Oct 2026",
    source: "SYN-LAB-003",
    owner: "Coordinator A",
    time: "09:38",
    summary: "The amended threshold needs a human review.",
    next: "Review the version change and abstain from an overall determination.",
    exception:
      "Met under v1; not met under v2. No automatic exclusion or outreach.",
  },
];
export const sources = [
  {
    title: "What public study records contain",
    by: "ClinicalTrials.gov",
    url: "https://clinicaltrials.gov/data-api/about-api/study-data-structure",
    note: "Registry records describe studies. They do not provide patient charts or guarantee local site capacity.",
  },
  {
    title: "Eligibility and recruitment status fields",
    by: "ClinicalTrials.gov",
    url: "https://clinicaltrials.gov/policy/protocol-definitions",
    note: "Protocol definitions provide a starting point; local protocol interpretation and site review still matter.",
  },
  {
    title: "Research use of protected health information",
    by: "U.S. HHS",
    url: "https://www.hhs.gov/hipaa/for-professionals/special-topics/research/index.html",
    note: "A future pilot needs an approved data governance route and appropriate authorization or waiver.",
  },
  {
    title: "Protocol modifications and recruitment",
    by: "NIH IRB",
    url: "https://irbo.nih.gov/conducting-your-study/protocol-modifications/",
    note: "Protocol changes and recruitment materials belong within the applicable institutional review process.",
  },
];
export const faqs = [
  [
    "Is TrialQueue an operating clinical product?",
    "No. TrialQueue is a research-stage concept. This homepage and workbench are isolated, synthetic previews. There are no real patients, live integrations or validated matching results.",
  ],
  [
    "Does a “met” criterion mean a person is eligible?",
    "No. Met, not met and unknown describe one illustrative criterion in a cited pre-screen. The coordinator and investigator retain judgment. Nothing in this preview determines eligibility, enrollment, diagnosis or treatment.",
  ],
  [
    "What would the first pilot evaluate?",
    "One appropriately governed retrospective cohort and one protocol, compared with adjudicated manual screening. The primary endpoint is coordinator-verified eligible-for-review recall, alongside precision, false exclusions, time per reviewed chart and consent breaches. No patient contact is part of that exercise.",
  ],
  [
    "Can TrialQueue connect to our EHR today?",
    "No integration is available. EHR extraction, data access, input contracts, reviewer roles and security review are discovery questions for a named pilot sponsor. Please do not upload clinical records or patient details.",
  ],
  [
    "Who needs to be involved?",
    "The trial-office or site-network lead, a coordinator, a site PI, the research office and relevant data governance or oversight owners. The economic buyer may be the trial office or a sponsor; that funding route needs to be tested.",
  ],
  [
    "How are outreach and consent handled?",
    "The proposed workflow separates evidence review from permission to contact. In this concept, consent/recontact permission and site capacity remain unverified; all educational drafts are locked and unsent. No direct-to-patient outreach happens.",
  ],
  [
    "What would make you stop or reposition?",
    "No governed chart access, no PI sponsorship, no budget, or false exclusions that make pre-screening unsafe. A synthetic demonstration does not establish clinical benefit, regulatory compliance or willingness to pay.",
  ],
];
