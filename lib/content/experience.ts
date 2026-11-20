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
  /** null = not yet confirmed; the period is simply not shown. */
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
    { title: "Cloud Security Engineer / DevOps Engineer", current: true, period: "Jan 2026 – present" },
    { title: "Mobile Platform Engineer", current: false, period: "Mar 2022 – Dec 2025" },
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
    period: "Mar 2022 – Dec 2025",
    title: "Mobile platform engineering",
    groups: [
      {
        items: [
          "Led end-to-end development of a cross-platform mobile app (Ionic, Angular, Capacitor), delivered within 6 months",
          "Migrated authentication to Auth0 single sign-on with OAuth 2.0",
          "Built WebSocket-based real-time communication and AI API integrations",
          "App store launch on Google Play and the Apple App Store",
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
    title: "SOC 2 documentation and change governance",
    detail:
      "Authored the Access Control Policy, Incident Response Plan, Backup and Disaster Recovery Procedures, Logging and Monitoring Standards and Secure SDLC workflows; routed infrastructure changes through CI/CD pipelines (GitHub Actions, Bitrise).",
  },
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
