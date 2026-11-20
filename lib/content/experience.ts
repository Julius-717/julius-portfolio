import { EMPLOYER_NAME } from "@/lib/site";

/**
 * Experience timeline. This is the ONLY place the employer is named,
 * via EMPLOYER_NAME in lib/site.ts.
 *
 * Source: verified facts supplied by Julius. Do not add metrics, titles or
 * dates that are not confirmed.
 */

export interface SubRole {
  title: string;
  current: boolean;
  /** null = not yet confirmed; rendered as a visible TODO. */
  period: string | null;
}

export interface Phase {
  period: string;
  title: string;
  groups: { label?: string; items: string[] }[];
  caseStudies?: string[];
}

export const EMPLOYMENT = {
  employer: EMPLOYER_NAME,
  location: "Remote · Nairobi, Kenya",
  period: "Mar 2022 – present",
  roles: [
    // TODO(julius): confirm exact sub-role dates.
    { title: "Cloud Security Engineer / DevOps Engineer", current: true, period: null },
    { title: "Mobile Platform Engineer", current: false, period: null },
  ] satisfies SubRole[],
};

export const PHASES: Phase[] = [
  {
    period: "Sep 2026 – present",
    title: "Ownership of the secure SDLC",
    groups: [
      {
        label: "Rebuilt security scanning as scheduled AWS CodeBuild projects managed in OpenTofu, all writing to one evidence store with notifications",
        items: [
          "SonarQube SAST, moved off Jenkins, with a dedicated least-privilege role",
          "OWASP Dependency-Check SCA, nightly",
          "Nuclei DAST, weekly, behind a fail-closed gate",
          "Dependabot configurations plus a weekly alerts report",
          "k6 nightly API smoke tests",
        ],
      },
      { items: ["Scan results surfaced in the product UI"] },
    ],
    caseStudies: ["secure-sdlc-pipeline", "dast-gate-fail-closed"],
  },
  {
    period: "2026",
    title: "AWS SOC 2 control remediation",
    groups: [
      {
        items: [
          "Logging and monitoring: CloudTrail, CloudWatch, AWS Config, Security Hub, alerting to Slack",
          "Threat detection: GuardDuty, Inspector",
          "Network isolation: NACL hardening, VPC endpoints, non-production closed to the internet, private subnets",
          "Edge: AWS WAF, HTTPS-only",
          "Data protection: S3 access logging, Block Public Access, versioning and replication; AWS Backup",
          "EC2 hardening: SSM Agent, IMDSv2",
          "IAM hygiene: no directly attached user policies, access-key age controls, replacing static credentials",
        ],
      },
    ],
  },
  {
    period: "Late 2025 – mid 2026",
    title: "Mobile engineering",
    groups: [
      {
        items: [
          "App store launch",
          "Release-test bug rounds and hotfixes",
          "Identity-verification data capture",
          "Google Play Billing upgrade via RevenueCat",
          "Signing-certificate management process",
          "Dependency CVE remediation",
        ],
      },
    ],
  },
];

/** Other verified work, not tied to a single phase. */
export const OTHER_WORK: { title: string; detail: string; caseStudy?: string }[] = [
  {
    title: "Account-wide IAM least-privilege review",
    detail:
      "Read-only collection, offline statement analysis, every suspected path confirmed with the IAM policy simulator, then granted-vs-used analysis for high-risk roles.",
    caseStudy: "iam-least-privilege-review",
  },
  {
    title: "SSH to AWS SSM Session Manager migration",
    detail:
      "Moved engineer access onto Session Manager: setup scripts for macOS/Linux and Windows and documented port forwarding, replacing SSH keys and jumpboxes.",
    caseStudy: "ssh-to-ssm-session-manager",
  },
  {
    title: "Infrastructure as code with OpenTofu",
    detail:
      "Brownfield adoption of hand-built resources with import blocks, recording hand changes so plans don't undo them; prescriptive SOC 2-compliant provisioning workflows per AWS service, each ending in a verification step and a list of known traps.",
  },
  {
    title: "Python Lambda reliability fix",
    detail:
      "Fixed an empty-chunk bug that made a batch job fail silently on one item while reporting success; added a partial status, per-item failure metrics via CloudWatch EMF, and an alarm in IaC.",
    caseStudy: "silent-pipeline-failure",
  },
  {
    title: "Application security",
    detail:
      "Fixed an XSS issue (Jinja2 autoescape); moved application config out of the codebase into environment variables; authored WAF rules for public API endpoints.",
  },
  {
    title: "CVE remediation",
    detail:
      "Python Lambda layers (pinning, rebuilds); npm/Angular/Ionic (upgrades, removing unused vulnerable packages, npm overrides); continuous Dependabot and OWASP reporting.",
  },
  {
    title: "Container / CI fix",
    detail:
      "Resolved CodeBuild failures caused by Docker Hub rate limits by moving base images off unauthenticated Docker Hub pulls.",
  },
];
