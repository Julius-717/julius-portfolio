import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy.
 *
 * The site is fully static (SSG), so a per-request nonce is not available.
 * Next.js and the JSON-LD block emit inline scripts, which is why
 * script-src allows 'unsafe-inline'. Everything else is locked to 'self'.
 * 'unsafe-eval' and ws: are only added in development (React refresh / HMR).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Two years is the usual target; start at one and raise once confirmed.
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Legacy equivalent of frame-ancestors 'none' for older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // A stray lockfile in the user's home directory made Next infer the wrong root.
  turbopack: { root: __dirname },
  /**
   * The previous case studies were replaced. Keep old inbound links working.
   */
  async redirects() {
    const retired = [
      "cloudtrail-cloudwatch-logging",
      "imdsv2-ec2-hardening",
      "s3-security-hardening",
      "vulnerability-management-inspector-snyk",
      "waf-cloudfront-network-security",
    ];
    return [
      {
        source: "/case-studies/iam-least-privilege-controls",
        destination: "/case-studies/iam-least-privilege-review",
        permanent: true,
      },
      ...retired.map((slug) => ({
        source: `/case-studies/${slug}`,
        destination: "/case-studies",
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
