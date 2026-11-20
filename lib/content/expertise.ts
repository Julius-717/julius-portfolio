/**
 * Expertise domains. No employer name here.
 *
 * Proficiency:
 *   professional = done in production, with evidence
 *   developing   = in progress, in review, or a research interest
 *
 * TODO(julius): review the professional/developing split; it is a proposal
 * derived from the verified facts, not something you have confirmed.
 */

export type Proficiency = "professional" | "developing";

export interface Skill {
  name: string;
  detail: string;
  level: Proficiency;
}

export interface Domain {
  slug: string;
  title: string;
  summary: string;
  skills: Skill[];
}

export const DOMAINS: Domain[] = [
  {
    slug: "cloud-security",
    title: "Cloud Security & SOC 2",
    summary: "Remediating AWS controls for SOC 2 across logging, detection, network, edge, data and compute.",
    skills: [
      { name: "Logging & monitoring", detail: "CloudTrail, CloudWatch, AWS Config, Security Hub, alert routing to Slack", level: "professional" },
      { name: "Threat detection", detail: "GuardDuty, Amazon Inspector", level: "professional" },
      { name: "Network isolation", detail: "NACL hardening, VPC endpoints, private subnets, closing non-production to the internet", level: "professional" },
      { name: "Edge protection", detail: "AWS WAF, HTTPS-only, edge access-control review", level: "professional" },
      { name: "WAF rules for public APIs", detail: "Rule design for public API endpoints", level: "professional" },
      { name: "Data protection", detail: "S3 Block Public Access, access logging, versioning, replication; AWS Backup", level: "professional" },
      { name: "EC2 hardening", detail: "IMDSv2, SSM Agent", level: "professional" },
    ],
  },
  {
    slug: "iam",
    title: "IAM & Access",
    summary: "Evidence-backed least-privilege review and moving people off static credentials and SSH.",
    skills: [
      { name: "Least-privilege review", detail: "Authorization details, credential report, service-last-accessed, IAM Access Analyzer", level: "professional" },
      { name: "Policy analysis", detail: "Wildcards, NotAction, unconditioned PassRole, escalation primitives, trust policies, permission boundaries", level: "professional" },
      { name: "Verification", detail: "IAM policy simulator; granted-vs-used comparison with Access Advisor and CloudTrail", level: "professional" },
      { name: "IAM hygiene", detail: "No directly attached user policies, access-key age controls, replacing static credentials", level: "professional" },
      { name: "SSM Session Manager", detail: "Keyless, IAM-authorised access replacing SSH keys and jumpboxes", level: "professional" },
      { name: "Cloud IAM attack-path analysis", detail: "Research interest", level: "developing" },
    ],
  },
  {
    slug: "devsecops",
    title: "DevSecOps Pipelines",
    summary: "Security scanning as scheduled, IaC-managed build projects writing to one evidence store.",
    skills: [
      { name: "Pipeline platform", detail: "AWS CodeBuild projects on schedules, managed in OpenTofu, least-privilege role per project", level: "professional" },
      { name: "SAST", detail: "SonarQube, migrated off Jenkins", level: "professional" },
      { name: "SCA & dependency monitoring", detail: "OWASP Dependency-Check (nightly), Dependabot with a weekly alerts report", level: "professional" },
      { name: "DAST", detail: "Nuclei (weekly) behind a fail-closed gate with a self-test mode", level: "professional" },
      { name: "API smoke tests", detail: "k6, nightly smoke/regression checks in CI", level: "professional" },
      { name: "Evidence & reporting", detail: "Single evidence store, notifications, results surfaced in the product UI", level: "professional" },
    ],
  },
  {
    slug: "appsec",
    title: "AppSec & Vulnerability Management",
    summary: "Fixing application-level issues and keeping dependencies patched across Python and JavaScript stacks.",
    skills: [
      { name: "XSS remediation", detail: "Jinja2 autoescape", level: "professional" },
      { name: "Configuration hygiene", detail: "Application config moved out of the codebase into environment variables", level: "professional" },
      { name: "Python CVE remediation", detail: "Lambda layers: pinning and rebuilds", level: "professional" },
      { name: "JavaScript CVE remediation", detail: "npm / Angular / Ionic: upgrades, removing unused vulnerable packages, npm overrides", level: "professional" },
      { name: "Build supply chain", detail: "Moving CI base images off unauthenticated Docker Hub pulls", level: "professional" },
    ],
  },
  {
    slug: "iac",
    title: "Infrastructure as Code",
    summary: "OpenTofu for greenfield and brownfield AWS, with workflows that end in verification.",
    skills: [
      { name: "OpenTofu", detail: "Managing AWS security controls and the security-scanning pipeline as code", level: "professional" },
      { name: "Brownfield adoption", detail: "Import blocks for hand-built resources; recording hand changes so plans don't undo them", level: "professional" },
      { name: "Provisioning workflows", detail: "Prescriptive SOC 2-compliant workflows per AWS service, each ending in a verification step and known traps", level: "professional" },
      { name: "Observability as code", detail: "CloudWatch alarms and EMF metrics defined in IaC", level: "professional" },
    ],
  },
  {
    slug: "software-engineering",
    title: "Software Engineering",
    summary: "Where I started: shipping mobile apps, and the engineering habits I bring to security tooling.",
    skills: [
      { name: "Mobile", detail: "Ionic, Angular, Capacitor, TypeScript", level: "professional" },
      { name: "Release engineering", detail: "App store launch, release-test bug rounds and hotfixes, signing-certificate management", level: "professional" },
      { name: "Payments", detail: "Google Play Billing upgrade via RevenueCat", level: "professional" },
      { name: "Python", detail: "AWS Lambda batch processing and reliability fixes", level: "professional" },
    ],
  },
];
