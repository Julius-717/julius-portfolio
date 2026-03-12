"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import { Sun, Moon, Menu, X, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  FaGooglePlay,
  FaGithub,
  FaExternalLinkAlt,
  FaApple,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";
import { SiTypescript, SiIonic, SiFlutter, SiSolidity } from "react-icons/si";

const TERMINAL_COMMANDS = [
  "terraform apply --auto-approve",
  "kubectl get pods -n production",
  "aws iam simulate-principal-policy",
  "docker build -t app:secure .",
  "snyk test --severity-threshold=high",
  "gh workflow run deploy.yml",
  "trivy image --exit-code 1 app:latest",
  "aws guardduty list-findings",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalIdx, setTerminalIdx] = useState(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const email = process.env.NEXT_PUBLIC_EMAIL;
  const linkedIn = process.env.NEXT_PUBLIC_LINKEDIN;
  const github = process.env.NEXT_PUBLIC_GITHUB;

  // Custom cursor
  useEffect(() => {
    const dot = document.querySelector(".cursor-dot") as HTMLElement;
    const ring = document.querySelector(".cursor-ring") as HTMLElement;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let frame: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX - 4}px`;
      dot.style.top = `${mouseY - 4}px`;
    };

    const animate = () => {
      ringX += (mouseX - ringX - 16) * 0.12;
      ringY += (mouseY - ringY - 16) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      frame = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      dot.style.transform = "scale(2.5)";
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.borderColor = "rgba(0, 200, 255, 0.9)";
    };

    const onLeave = () => {
      dot.style.transform = "scale(1)";
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderColor = "rgba(0, 200, 255, 0.5)";
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(animate);

    const interactables = document.querySelectorAll("a, button");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  // Terminal command cycling
  useEffect(() => {
    const id = setInterval(() => {
      setTerminalIdx((i) => (i + 1) % TERMINAL_COMMANDS.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const exploratorySkills = [
    { name: "Web3", icon: "🌐" },
    { name: "Solidity", icon: <SiSolidity className="text-gray-300" /> },
  ];

  interface ProjectLinks {
    playstore?: string;
    appstore?: string;
    website?: string;
    github?: string;
    live?: string;
  }
  interface Project {
    title: string;
    description: React.ReactNode;
    image: string;
    screenshots: string[];
    tags: string[];
    links: ProjectLinks;
    caseStudyLink: string | null;
  }

  const projects: Project[] = [
    {
      title: "Enquire AI — Mobile App",
      description: (
        <>
          A production AI-powered mobile platform serving real users across
          Android and iOS. I led the end-to-end engineering of the
          cross-platform application from architecture to deployment.
          <ul className="list-disc list-inside mt-4 space-y-2 text-[#8a9bc0]">
            <li>
              <span className="font-semibold">Platform Engineering:</span> Built
              and shipped a cross-platform Ionic/Angular + Capacitor app in 6
              months; optimized startup time, memory usage, and APK size for
              low-end devices.
            </li>
            <li>
              <span className="font-semibold">Authentication:</span> Implemented
              secure Auth0 SSO (OAuth 2.0 + PKCE) with token refresh, silent
              re-auth, and session management.
            </li>
            <li>
              <span className="font-semibold">Real-Time Systems:</span>{" "}
              Integrated WebSockets and AI APIs to support real-time
              communication and expert matching at scale.
            </li>
            <li>
              <span className="font-semibold">Performance:</span> Reduced app
              startup time by 1.5s and improved user retention by 32% through
              targeted profiling and optimization.
            </li>
          </ul>
        </>
      ),
      image: "/images/enquire-screen-1.jpeg",
      screenshots: [
        "/images/enquire-screen-1.jpeg",
        "/images/enquire-screen-2.jpeg",
        "/images/enquire-screen-3.jpeg",
        "/images/enquire-screen-4.jpeg",
      ],
      tags: [
        "Ionic",
        "Angular",
        "Capacitor",
        "Auth0",
        "WebSockets",
        "Cross-Platform",
        "Firebase",
      ],
      links: {
        playstore:
          "https://play.google.com/store/apps/details?id=ai.enquire.app&hl=en-US&pli=1",
        appstore: "https://apps.apple.com/us/app/enquire-ai/id6483439331",
      },
      caseStudyLink: null,
    },
    {
      title: "Enquire AI — Cloud Security & SOC 2",
      description: (
        <>
          Led the cloud security hardening and SOC 2 readiness program for
          Enquire AI&apos;s AWS infrastructure — designing and implementing
          controls across identity, data, network, logging, and vulnerability
          management.
          <ul className="list-disc list-inside mt-4 space-y-2 text-[#8a9bc0]">
            <li>
              <span className="font-semibold">IAM & Identity:</span> Enforced
              least privilege across EC2, Lambda, and application roles.
              Implemented strong password policy and eliminated wildcard
              permissions.
            </li>
            <li>
              <span className="font-semibold">Logging & Monitoring:</span>{" "}
              Enabled multi-region CloudTrail with encrypted S3 storage,
              CloudWatch alerting for IAM changes and security events, and
              centralized compliance via Security Hub and GuardDuty.
            </li>
            <li>
              <span className="font-semibold">Infrastructure Hardening:</span>{" "}
              Enforced IMDSv2 on all EC2 instances, enabled S3 Block Public
              Access, versioning, lifecycle policies, and deployed AWS WAF for
              rate limiting and application-layer protection.
            </li>
            <li>
              <span className="font-semibold">Vulnerability Management:</span>{" "}
              Enabled AWS Inspector for EC2 scanning and integrated Snyk and
              OWASP dependency checks into the CI/CD pipeline.
            </li>
          </ul>
        </>
      ),
      image: "/images/enquire.png",
      screenshots: [],
      tags: [
        "AWS",
        "SOC 2",
        "IAM",
        "CloudTrail",
        "GuardDuty",
        "Security Hub",
        "DevSecOps",
        "AWS WAF",
      ],
      links: {
        website: "https://app.enquire.ai",
      },
      caseStudyLink: "/case-studies",
    },
    {
      title: "Enquire AI — Web Platform",
      description:
        "The production web platform for Enquire AI, giving users full access to AI-powered insights and expert matching from any browser. Built for performance, security, and seamless cross-device continuity with the mobile app.",
      image: "/images/enquire.png",
      screenshots: [],
      tags: ["AI", "Web App", "Production", "Auth0", "SSO"],
      links: {
        website: "https://app.enquire.ai",
      },
      caseStudyLink: null,
    },
    {
      title: "Portfolio Website",
      description:
        "My personal portfolio showcasing skills, projects, and case studies. Built with Next.js, TailwindCSS, and Framer Motion.",
      image: "/images/portfolio.png",
      screenshots: [],
      tags: ["Next.js", "TailwindCSS", "Framer Motion"],
      links: {},
      caseStudyLink: null,
    },
  ];

  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="ds-page-wrapper bg-[#060810] transition-colors duration-300 relative">
      {/* Custom cursor */}
      <div
        id="cursor-dot"
        className="cursor-dot fixed w-2 h-2 bg-cyan-400 rounded-full z-9999 mix-blend-screen transition-transform duration-100"
        style={{ left: -20, top: -20 }}
      />
      <div
        id="cursor-ring"
        className="cursor-ring fixed w-8 h-8 border border-cyan-400/50 rounded-full z-9998 mix-blend-screen"
        style={{ left: -20, top: -20 }}
      />

      <Head>
        <title>Julius Gachuhi | Mobile Platform & DevSecOps Engineer</title>
        <meta
          name="description"
          content="Mobile Platform Engineer & DevSecOps | Ionic Angular Flutter Capacitor | Application Security SOC 2 Auth0 OAuth AWS CI/CD | Remote — US & EU"
        />
        <meta
          property="og:title"
          content="Julius Gachuhi | Mobile Platform & DevSecOps Engineer"
        />
        <meta
          property="og:description"
          content="Secure mobile platforms, cloud infrastructure, CI/CD automation, and application security for production systems."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-preview.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Julius Gachuhi",
              jobTitle: "Mobile Platform & DevSecOps Engineer",
              url: "https://YOUR_DOMAIN_HERE",
              sameAs: [
                "https://linkedin.com/in/YOUR_LINKEDIN_HERE",
                "https://github.com/YOUR_GITHUB_HERE",
              ],
              knowsAbout: [
                "Mobile Platform Engineering",
                "DevSecOps",
                "Application Security",
                "SOC 2",
                "AWS IAM",
                "CloudTrail",
                "GuardDuty",
                "CI/CD Pipelines",
                "Ionic",
                "Angular",
                "Flutter",
                "Capacitor",
                "Auth0",
                "OAuth",
                "OWASP",
                "GDPR Compliance",
                "Cloud Infrastructure",
              ],
            }),
          }}
        />
      </Head>

      {/* ── Navbar ───────────────────────────────────────────────── */}
      <header
        className="fixed top-0 w-full z-50 backdrop-blur-md border-b"
        style={{
          background: "rgba(6,8,16,0.92)",
          borderColor: "rgba(0,200,255,0.12)",
        }}
      >
        <nav className="max-w-6xl mx-auto px-6 flex justify-between items-center py-4">
          <a href="/" className="flex items-center space-x-2">
            <span
              className="text-lg font-bold tracking-wider"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              <span style={{ color: "var(--ds-white)" }}>J</span>
              <span style={{ color: "var(--ds-cyan)" }}>G</span>
            </span>
          </a>

          <div className="hidden md:flex space-x-6 items-center">
            {["about", "skills", "certifications", "projects", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="transition-colors duration-200"
                style={{ color: "var(--ds-muted)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--ds-cyan)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--ds-muted)")
                }
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
            <Link
              href="/case-studies"
              className="transition-colors duration-200 font-medium"
              style={{ color: "var(--ds-muted)" }}
            >
              Case Studies
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Available for hire pill */}
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                borderColor: "rgba(0,255,157,0.35)",
                color: "var(--ds-green)",
                background: "rgba(0,255,157,0.06)",
              }}
            >
              <span
                className="status-pulse w-2 h-2 rounded-full"
                style={{ background: "var(--ds-green)" }}
              />
              Available for hire
            </div>

            <button
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg transition-colors duration-200"
              style={{ color: "var(--ds-muted)" }}
            >
              {currentTheme === "dark" ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              className="md:hidden p-2 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{ color: "var(--ds-white)" }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            className="md:hidden border-t px-6 py-4 space-y-4"
            style={{
              background: "var(--ds-bg)",
              borderColor: "var(--ds-border)",
            }}
          >
            {["about", "skills", "certifications", "projects", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
                className="block"
                style={{ color: "var(--ds-muted)" }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
            <Link
              href="/case-studies"
              onClick={() => setMenuOpen(false)}
              className="block font-medium"
              style={{ color: "var(--ds-muted)" }}
            >
              Case Studies
            </Link>
          </div>
        )}
      </header>

      {/* ── Main ─────────────────────────────────────────────────── */}
      <main
        className="min-h-screen pt-20 relative z-10"
        style={{ color: "var(--ds-white)" }}
      >
        {/* ── Hero Section ─────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--ds-bg)" }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 min-h-[92vh] flex items-center pt-16 pb-0">
            <div className="w-full grid md:grid-cols-12 gap-12 items-center">

              {/* ── LEFT ─────────────────────────────────────── */}
              <div className="md:col-span-7 relative">
                {/* Corner bracket — top left */}
                <div
                  className="absolute -top-6 -left-4 w-8 h-8 pointer-events-none"
                  style={{
                    borderTop: "2px solid var(--ds-cyan)",
                    borderLeft: "2px solid var(--ds-cyan)",
                  }}
                />
                {/* Corner bracket — bottom right */}
                <div
                  className="absolute -bottom-6 -right-4 w-8 h-8 pointer-events-none"
                  style={{
                    borderBottom: "2px solid var(--ds-green)",
                    borderRight: "2px solid var(--ds-green)",
                  }}
                />

                {/* Availability badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-5"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    borderColor: "rgba(0,255,157,0.4)",
                    color: "var(--ds-green)",
                    background: "rgba(0,255,157,0.07)",
                  }}
                >
                  <span
                    className="status-pulse w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--ds-green)" }}
                  />
                  Open to Remote US &amp; EU
                </motion.div>

                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-3 mb-5"
                >
                  <span
                    className="w-10 h-px"
                    style={{ background: "var(--ds-cyan)" }}
                  />
                  <span
                    className="text-xs uppercase tracking-widest font-medium"
                    style={{
                      fontFamily: "var(--font-space-mono)",
                      color: "var(--ds-cyan)",
                    }}
                  >
                    Mobile Platform · DevSecOps · Cloud Security
                  </span>
                </motion.div>

                {/* H1 */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-5xl md:text-7xl font-extrabold leading-none mb-8"
                  style={{ color: "var(--ds-white)" }}
                >
                  Building
                  <br />
                  <span style={{ color: "var(--ds-cyan)" }}>Secure</span>
                  <br />
                  Cloud-<span style={{ color: "var(--ds-green)" }}>Native</span>
                  <br />
                  Systems
                </motion.h1>

                {/* Terminal strip */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="rounded-lg border px-4 py-3 mb-8 flex items-center gap-3 font-mono text-sm overflow-hidden"
                  style={{
                    background: "var(--ds-surface)",
                    borderColor: "var(--ds-border)",
                    fontFamily: "var(--font-jetbrains-mono)",
                  }}
                >
                  <span style={{ color: "var(--ds-green)" }}>~/jg $</span>
                  <span
                    className="truncate"
                    style={{ color: "var(--ds-white)" }}
                  >
                    {TERMINAL_COMMANDS[terminalIdx]}
                  </span>
                  <span className="term-cursor shrink-0" />
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  <a
                    href="#contact"
                    aria-label="Hire me"
                    className="btn-shimmer inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
                    style={{
                      background: "var(--ds-cyan)",
                      color: "#000",
                    }}
                  >
                    Consult Me
                  </a>
                  <a
                    href="/pdf/Julius_Gachuhi_Resume.pdf"
                    download
                    aria-label="Download CV"
                    className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm border transition-all duration-200 hover:border-(--ds-cyan)"
                    style={{
                      borderColor: "var(--ds-border)",
                      color: "var(--ds-white)",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "var(--ds-cyan)";
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--ds-cyan)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "var(--ds-border)";
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--ds-white)";
                    }}
                  >
                    Download CV
                  </a>
                </motion.div>

                {/* Tech pills */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="flex flex-wrap gap-2"
                >
                  {[
                    "AWS",
                    "React Native",
                    "Flutter",
                    "Terraform",
                    "K8s",
                    "SOC 2",
                    "GitHub Actions",
                    "Docker",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        fontFamily: "var(--font-space-mono)",
                        borderColor: "var(--ds-border)",
                        color: "var(--ds-muted)",
                        background: "rgba(13,18,32,0.7)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* ── RIGHT ────────────────────────────────────── */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="relative w-72 h-72 md:w-96 md:h-96"
                >
                  {/* Ambient glow orbs */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      filter: "blur(80px)",
                      background: "rgba(0,200,255,0.18)",
                      transform: "translate(-20%, -20%) scale(1.2)",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      filter: "blur(80px)",
                      background: "rgba(0,255,157,0.12)",
                      transform: "translate(20%, 20%) scale(1.1)",
                    }}
                  />

                  {/* Orbiting badges */}
                  <div className="orbit-ring absolute inset-0">
                    {[
                      { label: "AWS Cloud", angle: "top" },
                      { label: "SOC 2", angle: "right" },
                      { label: "Mobile Dev", angle: "bottom" },
                      { label: "CI/CD", angle: "left" },
                    ].map(({ label, angle }) => {
                      const pos: React.CSSProperties =
                        angle === "top"
                          ? { top: "-12px", left: "50%", transform: "translateX(-50%)" }
                          : angle === "right"
                          ? { right: "-16px", top: "50%", transform: "translateY(-50%)" }
                          : angle === "bottom"
                          ? { bottom: "-12px", left: "50%", transform: "translateX(-50%)" }
                          : { left: "-16px", top: "50%", transform: "translateY(-50%)" };
                      return (
                        <div key={label} className="absolute" style={pos}>
                          <span
                            className="orbit-badge inline-block px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap"
                            style={{
                              fontFamily: "var(--font-jetbrains-mono)",
                              background: "var(--ds-surface)",
                              borderColor: "rgba(0,200,255,0.3)",
                              color: "var(--ds-cyan)",
                            }}
                          >
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Hex gradient border wrapper */}
                  <div
                    className="absolute inset-6 hex-clip"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--ds-cyan) 0%, var(--ds-green) 100%)",
                      padding: "3px",
                    }}
                  >
                    <div
                      className="w-full h-full hex-clip overflow-hidden"
                      style={{ background: "var(--ds-surface)" }}
                    >
                      <Image
                        src="/images/me-removebg-preview.png"
                        alt="Julius Gachuhi"
                        fill
                        sizes="(max-width: 768px) 240px, 336px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ── Stats Strip ──────────────────────────────────── */}
          <div
            className="relative z-10 border-t mt-8"
            style={{
              borderColor: "var(--ds-border)",
              background: "rgba(13,18,32,0.7)",
            }}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-3 divide-x divide-[rgba(0,200,255,0.12)]">
              {[
                {
                  value: "3+",
                  unit: "Years",
                  label: "DevSecOps",
                  colorClass: "stat-card-cyan",
                },
                {
                  value: "12+",
                  unit: "Cloud",
                  label: "Projects",
                  colorClass: "stat-card-green",
                },
                {
                  value: "0↓",
                  unit: "Security",
                  label: "Breaches",
                  colorClass: "stat-card-orange",
                },
              ].map(({ value, unit, label, colorClass }) => (
                <div
                  key={label}
                  className={`stat-card ${colorClass} px-8 py-8 text-center`}
                >
                  <p
                    className="text-4xl font-bold leading-none"
                    style={{
                      fontFamily: "var(--font-space-mono)",
                      color:
                        colorClass === "stat-card-cyan"
                          ? "var(--ds-cyan)"
                          : colorClass === "stat-card-green"
                          ? "var(--ds-green)"
                          : "var(--ds-orange)",
                    }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs mt-2 uppercase tracking-widest"
                    style={{ color: "var(--ds-muted)" }}
                  >
                    {unit} {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="relative py-24 px-6 border-t"
          style={{ background: "#080c18", borderColor: "rgba(0,200,255,0.08)" }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Eyebrow */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-xs mb-3"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-cyan)" }}
            >
              [ ABOUT_ME ]
            </motion.p>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold mb-3 text-[#e8eeff]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              About
            </motion.h2>
            <div className="w-16 h-1 rounded-full mb-14" style={{ background: "var(--ds-cyan)" }} />

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Left: Hex photo */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                transition={{ duration: 0.7 }}
                className="relative flex justify-center"
              >
                <div className="relative w-64 h-64 md:w-72 md:h-72">
                  {/* Faint pulsing hex outline behind */}
                  <div
                    className="absolute hex-clip"
                    style={{
                      inset: "-20px",
                      background:
                        "linear-gradient(135deg, rgba(0,200,255,0.07) 0%, rgba(0,255,157,0.04) 100%)",
                      animation: "statusPulse 4s ease-in-out infinite",
                    }}
                  />
                  {/* Hex gradient border */}
                  <div
                    className="absolute inset-0 hex-clip"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--ds-cyan) 0%, var(--ds-green) 100%)",
                      padding: "3px",
                    }}
                  >
                    <div
                      className="w-full h-full hex-clip overflow-hidden"
                      style={{ background: "var(--ds-surface)" }}
                    >
                      <Image
                        src="/images/me.jpg"
                        alt="Julius Gachuhi"
                        fill
                        sizes="(max-width: 768px) 256px, 288px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Text */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <p className="text-[#8a9bc0] text-base md:text-lg leading-relaxed mb-6">
                  I&apos;m a{" "}
                  <span className="text-[#e8eeff] font-semibold">
                    Mobile Platform &amp; DevSecOps Engineer
                  </span>{" "}
                  with 4+ years of experience building and operating
                  production-grade mobile applications. My work sits at the
                  intersection of cross-platform engineering, cloud
                  infrastructure, CI/CD automation, and application security.
                </p>

                <blockquote
                  className="border-l-2 pl-4 mb-8 text-[#e8eeff] text-base leading-relaxed italic"
                  style={{ borderColor: "var(--ds-cyan)" }}
                >
                  &ldquo;Building systems that are not only usable, but
                  reliable, secure, and scalable — from the device to the
                  cloud.&rdquo;
                </blockquote>

                <p className="text-[#8a9bc0] text-sm leading-relaxed mb-8">
                  At{" "}
                  <span className="text-[#e8eeff] font-semibold">
                    Enquire AI
                  </span>
                  , I led delivery of a cross-platform mobile platform in
                  production — owning architecture, secure authentication,
                  real-time systems, and CI/CD. I contributed to SOC 2
                  readiness and deepened applied offensive security practices to
                  reduce risk across the full stack.
                </p>

                {/* Terminal-style tags */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Mobile Platform Engineer",
                    "DevSecOps",
                    "Cloud Security",
                    "SOC 2",
                    "CI/CD Automation",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs border"
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        background: "var(--ds-surface)",
                        borderColor: "rgba(0,200,255,0.2)",
                        color: "var(--ds-cyan)",
                      }}
                    >
                      <span style={{ color: "var(--ds-green)" }}>&gt;</span>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="relative py-24 px-6 border-t"
          style={{ background: "#060810", borderColor: "rgba(0,200,255,0.08)" }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Eyebrow */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-xs mb-3"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-cyan)" }}
            >
              [ SKILLS ]
            </motion.p>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold mb-3 text-[#e8eeff]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Skills
            </motion.h2>
            <div className="w-16 h-1 rounded-full mb-4" style={{ background: "var(--ds-cyan)" }} />
            <p className="text-[#5a6a8a] max-w-2xl mb-16">
              Platform-first engineering, security-conscious delivery, and
              production reliability.
            </p>

            {/* ── PRIMARY_SKILLS ─────────────────────────────── */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px" style={{ background: "rgba(0,200,255,0.1)" }} />
              <span
                className="text-xs"
                style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
              >
                --- // PRIMARY_SKILLS ---
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(0,200,255,0.1)" }} />
            </div>

            <div className="flex flex-col gap-3 mb-16">
              {[
                {
                  abbr: "ME",
                  label: "Mobile Platform Engineering",
                  desc: "Cross-platform apps from architecture to App Store — Ionic, Flutter, Capacitor",
                  from: "#00c8ff",
                  to: "#0077ff",
                },
                {
                  abbr: "AS",
                  label: "Application Security",
                  desc: "OWASP-aligned threat modeling, dependency scanning, and secure auth flows",
                  from: "#00ff9d",
                  to: "#00c8ff",
                },
                {
                  abbr: "CD",
                  label: "CI/CD & DevOps",
                  desc: "GitHub Actions pipelines with integrated security gates and automated deployment",
                  from: "#ff6b35",
                  to: "#ffaa00",
                },
                {
                  abbr: "CI",
                  label: "Cloud Infrastructure",
                  desc: "AWS-native architecture with IAM, VPC, CloudTrail, GuardDuty, and Security Hub",
                  from: "#00c8ff",
                  to: "#00ff9d",
                },
                {
                  abbr: "SA",
                  label: "Secure Auth (OAuth, SSO)",
                  desc: "Auth0, OAuth 2.0 + PKCE, and token lifecycle management for mobile and web",
                  from: "#7c3aed",
                  to: "#00c8ff",
                },
              ].map((skill) => (
                <motion.div
                  key={skill.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeInUp}
                  transition={{ duration: 0.4 }}
                  className="group relative flex items-center gap-5 p-5 rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "var(--ds-surface)",
                    borderColor: "rgba(0,200,255,0.12)",
                  }}
                >
                  {/* Animated left border */}
                  <div className="absolute left-0 top-0 w-0.5 h-0 bg-[#00c8ff] group-hover:h-full transition-all duration-300 ease-in-out" />
                  {/* Monogram circle */}
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      background: `linear-gradient(135deg, ${skill.from} 0%, ${skill.to} 100%)`,
                      color: "#000",
                    }}
                  >
                    {skill.abbr}
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#e8eeff] mb-0.5">{skill.label}</p>
                    <p className="text-xs text-[#5a6a8a]">{skill.desc}</p>
                  </div>
                  {/* Arrow */}
                  <span className="shrink-0 text-[#5a6a8a] group-hover:text-[#00c8ff] transition-colors duration-200">
                    →
                  </span>
                </motion.div>
              ))}
            </div>

            {/* ── CORE_STACK ─────────────────────────────────── */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px" style={{ background: "rgba(0,200,255,0.1)" }} />
              <span
                className="text-xs"
                style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
              >
                --- // CORE_STACK ---
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(0,200,255,0.1)" }} />
            </div>

            <div className="max-w-2xl flex flex-col gap-6 mb-16">
              {[
                { name: "TypeScript / JavaScript", icon: <SiTypescript className="text-blue-400" />, pct: 95 },
                { name: "Ionic / Angular / Capacitor", icon: <SiIonic className="text-teal-400" />, pct: 90 },
                { name: "Flutter / Dart", icon: <SiFlutter className="text-sky-400" />, pct: 75 },
              ].map((skill) => (
                <motion.div
                  key={skill.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeInUp}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{skill.icon}</span>
                    <span className="text-[#e8eeff] font-medium text-sm">{skill.name}</span>
                    <span
                      className="ml-auto text-xs"
                      style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
                    >
                      {skill.pct}%
                    </span>
                  </div>
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(0,200,255,0.08)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.pct}%` }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--ds-cyan) 0%, var(--ds-green) 100%)",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── CLOUD_SECURITY ─────────────────────────────── */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px" style={{ background: "rgba(0,200,255,0.1)" }} />
              <span
                className="text-xs"
                style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
              >
                --- // CLOUD_SECURITY ---
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(0,200,255,0.1)" }} />
            </div>

            <div className="flex flex-wrap gap-3 mb-16">
              {[
                "AWS IAM (Least Privilege)",
                "CloudTrail (All Regions)",
                "AWS Config",
                "GuardDuty",
                "Security Hub",
                "S3 Encryption (SSE-KMS / AES-256)",
                "IMDSv2 Enforcement",
                "AWS WAF",
                "AWS Inspector",
                "Dependency Scanning (Snyk / OWASP)",
                "CI/CD Governance",
                "SOC 2 Controls",
                "Logging & Monitoring Architecture",
              ].map((item) => (
                <motion.span
                  key={item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeInUp}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-200 hover:shadow-[0_0_8px_rgba(0,255,157,0.2)]"
                  style={{
                    borderColor: "rgba(0,255,157,0.3)",
                    color: "var(--ds-green)",
                    background: "rgba(0,255,157,0.04)",
                  }}
                >
                  <Lock size={10} />
                  {item}
                </motion.span>
              ))}
            </div>

            {/* ── EXPLORATORY ────────────────────────────────── */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px" style={{ background: "rgba(0,200,255,0.1)" }} />
              <span
                className="text-xs"
                style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
              >
                --- // EXPLORATORY ---
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(0,200,255,0.1)" }} />
            </div>

            <div className="flex flex-wrap gap-3">
              {exploratorySkills.map((skill) => (
                <span
                  key={skill.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all duration-200 hover:border-[rgba(0,200,255,0.4)]"
                  style={{
                    borderColor: "rgba(0,200,255,0.12)",
                    color: "var(--ds-muted)",
                  }}
                >
                  <span>{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Certifications Section ───────────────────────────────── */}
        <section
          id="certifications"
          className="relative py-24 px-6 border-t"
          style={{ background: "#060810", borderColor: "rgba(0,200,255,0.06)" }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Eyebrow */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-xs mb-3"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-cyan)" }}
            >
              [ CREDENTIALS ]
            </motion.p>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold mb-3 text-[#e8eeff]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Certifications &amp; Training
            </motion.h2>
            <div className="w-16 h-1 rounded-full mb-14" style={{ background: "var(--ds-cyan)" }} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* ── Card 1: Africa Hackon (hero, full-width) ── */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0 }}
                className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#050f08",
                  borderColor: "rgba(0,255,157,0.35)",
                  boxShadow: "0 0 60px rgba(0,255,157,0.07)",
                }}
              >
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* Badge image */}
                  <div className="shrink-0 flex items-center justify-center w-48 h-48 relative">
                    <div
                      className="absolute inset-0 hex-clip"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,255,157,0.25) 0%, rgba(0,200,255,0.15) 100%)",
                        padding: "3px",
                      }}
                    >
                      <div className="w-full h-full hex-clip overflow-hidden flex items-center justify-center"
                        style={{ background: "#050f08" }}>
                        <Image
                          src="/images/africahackon-badge.png"
                          alt="Africa Hackon Badge"
                          fill
                          className="object-contain hex-clip"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                        {/* Fallback monogram */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span
                            className="text-3xl font-extrabold"
                            style={{ fontFamily: "var(--font-syne)", color: "var(--ds-green)" }}
                          >
                            AH
                          </span>
                          <span
                            className="text-[9px] uppercase tracking-widest mt-1"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
                          >
                            Africa Hackon
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Top badges row */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className="px-2.5 py-1 rounded-full border text-[9px] uppercase tracking-widest font-semibold"
                        style={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          borderColor: "rgba(0,255,157,0.4)",
                          color: "var(--ds-green)",
                          background: "rgba(0,255,157,0.05)",
                        }}
                      >
                        Featured Certification
                      </span>
                      <span
                        className="flex items-center gap-1.5 text-[10px] font-medium"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-green)" }}
                      >
                        <span className="status-pulse w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--ds-green)" }} />
                        VERIFIED COMPLETE
                      </span>
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-extrabold text-[#e8eeff] mb-3"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      Cybersecurity Professional
                    </h3>

                    {/* Issuer row */}
                    <div className="flex items-center gap-2 mb-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--ds-green)", flexShrink: 0 }}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <a
                        href="https://africahackon.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline flex items-center gap-1"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-cyan)" }}
                      >
                        Africa Hackon
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          background: "rgba(0,255,157,0.08)",
                          color: "var(--ds-green)",
                        }}
                      >
                        2025
                      </span>
                    </div>

                    <p className="text-sm text-[#8a9bc0] leading-relaxed mb-6 max-w-2xl">
                      Hands-on cybersecurity training covering offensive security, penetration testing,
                      vulnerability assessment, and defensive security operations.
                    </p>

                    <a
                      href="https://www.credly.com/badges/6f22cdbc-2228-4f69-893e-8ca1533bb9d0/public_url"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200 hover:bg-[rgba(0,255,157,0.1)] hover:border-[rgba(0,255,157,0.6)]"
                      style={{
                        borderColor: "rgba(0,255,157,0.35)",
                        color: "var(--ds-green)",
                        background: "transparent",
                      }}
                    >
                      View Credential
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* ── Card 2: AWS Solutions Architect ── */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  background: "#0d0c08",
                  borderColor: "rgba(255,153,0,0.2)",
                }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{ background: "rgba(255,153,0,0.1)", border: "1px solid rgba(255,153,0,0.25)" }}>
                  <span className="text-xl font-extrabold" style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#ff9900" }}>AWS</span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="status-pulse w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#fbbf24" }} />
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#fbbf24" }}
                  >
                    IN PROGRESS
                  </span>
                </div>

                <h3
                  className="text-lg font-bold text-[#e8eeff] mb-1 leading-snug"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Solutions Architect Associate
                </h3>
                <p
                  className="text-xs mb-4"
                  style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
                >
                  Amazon Web Services
                </p>

                <div className="mt-auto">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      background: "rgba(255,153,0,0.08)",
                      color: "#ff9900",
                    }}
                  >
                    2025
                  </span>
                </div>
              </motion.div>

              {/* ── Card 3: SOC 2 ── */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  background: "#080c18",
                  borderColor: "rgba(0,200,255,0.2)",
                }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.2)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--ds-cyan)" }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="status-pulse w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--ds-cyan)" }} />
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-cyan)" }}
                  >
                    HANDS-ON VERIFIED
                  </span>
                </div>

                <h3
                  className="text-lg font-bold text-[#e8eeff] mb-1 leading-snug"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  SOC 2 Type II Implementation
                </h3>
                <p
                  className="text-xs mb-4"
                  style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
                >
                  Practical Experience · Enquire AI
                </p>

                <div className="mt-auto">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      background: "rgba(0,200,255,0.08)",
                      color: "var(--ds-cyan)",
                    }}
                  >
                    2024
                  </span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <section
          id="projects"
          className="relative py-24 px-6 border-t"
          style={{ background: "#080c18", borderColor: "rgba(0,200,255,0.08)" }}
        >
          {/* Eyebrow + Title */}
          <div className="max-w-6xl mx-auto mb-12">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-xs mb-3"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-cyan)" }}
            >
              [ PROJECTS ]
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold mb-3 text-[#e8eeff]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Projects
            </motion.h2>
            <div className="w-16 h-1 rounded-full" style={{ background: "var(--ds-cyan)" }} />
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, idx) => {
              const isLive = Object.keys(project.links).length > 0;
              const projectUrl = project.links.website
                ? project.links.website.replace(/^https?:\/\//, "")
                : project.links.playstore
                ? "play.google.com"
                : project.title.toLowerCase().replace(/ /g, "-") + ".app";
              return (
                <motion.div
                  key={project.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative rounded-xl overflow-hidden border flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,200,255,0.15)] hover:-translate-y-1"
                  style={{
                    background: "var(--ds-surface)",
                    borderColor: "rgba(0,200,255,0.12)",
                  }}
                >
                  {/* Status badge */}
                  <div
                    className="absolute top-12 right-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      background: "rgba(6,8,16,0.88)",
                      color: isLive ? "var(--ds-green)" : "#fbbf24",
                      border: `1px solid ${isLive ? "rgba(0,255,157,0.35)" : "rgba(251,191,36,0.35)"}`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: isLive ? "var(--ds-green)" : "#fbbf24" }}
                    />
                    {isLive ? "LIVE" : "IN PROGRESS"}
                  </div>

                  {/* Terminal title bar */}
                  <div
                    className="flex items-center justify-between px-4 py-3 border-b shrink-0"
                    style={{ background: "#0a0f1c", borderColor: "rgba(0,200,255,0.1)" }}
                  >
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                      <span className="w-3 h-3 rounded-full bg-green-400/80" />
                    </div>
                    <span
                      className="text-xs truncate max-w-[55%] text-center"
                      style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
                    >
                      {project.title}
                    </span>
                    <span className="w-14" />
                  </div>

                  {/* Browser chrome + image */}
                  <div className="shrink-0">
                    <div
                      className="flex items-center gap-2 px-4 py-2 border-b"
                      style={{ background: "#080c18", borderColor: "rgba(0,200,255,0.07)" }}
                    >
                      <div
                        className="flex-1 rounded px-3 py-1 text-xs truncate"
                        style={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          background: "rgba(0,200,255,0.04)",
                          color: "var(--ds-muted)",
                          border: "1px solid rgba(0,200,255,0.08)",
                        }}
                      >
                        {projectUrl}
                      </div>
                    </div>
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Screenshot strip */}
                  {project.screenshots.length > 0 && (
                    <div className="flex gap-2 px-4 pt-4 overflow-x-auto scrollbar-hide shrink-0">
                      {project.screenshots.map((src, i) => (
                        <div
                          key={i}
                          className="relative shrink-0 w-20 h-36 rounded-lg overflow-hidden border transition-all duration-200 hover:border-[#00c8ff]"
                          style={{ borderColor: "rgba(0,200,255,0.12)" }}
                        >
                          <Image
                            src={src}
                            alt={`${project.title} screen ${i + 1}`}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex flex-col grow text-left">
                    <h3 className="text-xl font-bold mb-3 text-[#e8eeff]">
                      {project.title}
                    </h3>

                    <div className="text-[#8a9bc0] text-sm mb-4 leading-relaxed">
                      {project.description}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-full border transition-all duration-200 hover:shadow-[0_0_8px_rgba(0,200,255,0.25)] hover:border-[rgba(0,200,255,0.35)] hover:text-[#00c8ff]"
                          style={{
                            borderColor: "rgba(0,200,255,0.12)",
                            color: "var(--ds-muted)",
                            background: "rgba(13,18,32,0.8)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div
                      className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t"
                      style={{ borderColor: "rgba(0,200,255,0.08)" }}
                    >
                      {project.links.playstore && (
                        <a href={project.links.playstore} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-green-400 hover:underline text-sm">
                          <FaGooglePlay /> Google Play
                        </a>
                      )}
                      {project.links.appstore && (
                        <a href={project.links.appstore} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#e8eeff] hover:underline text-sm">
                          <FaApple /> App Store
                        </a>
                      )}
                      {project.links.website && (
                        <a href={project.links.website} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:underline text-sm">
                          <FaExternalLinkAlt /> Website
                        </a>
                      )}
                      {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:underline text-sm">
                          <FaGithub /> GitHub
                        </a>
                      )}
                      {project.links.live && (
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-purple-400 hover:underline text-sm">
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                      {project.caseStudyLink && (
                        <Link
                          href={project.caseStudyLink}
                          className="group/cs ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,200,255,0.3)]"
                          style={{
                            borderColor: "rgba(0,200,255,0.3)",
                            color: "var(--ds-cyan)",
                            background: "rgba(0,200,255,0.05)",
                          }}
                        >
                          Read case study
                          <span className="transition-transform duration-200 group-hover/cs:translate-x-1">
                            →
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Case Studies Teaser */}
        <section
          className="relative py-24 px-6 border-t text-[#e8eeff]"
          style={{ background: "#060810", borderColor: "rgba(0,200,255,0.08)" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-3">
              <div>
                <p
                  className="text-xs mb-3"
                  style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-cyan)" }}
                >
                  [ CASE_STUDIES ]
                </p>
                <h2
                  className="text-4xl md:text-5xl font-extrabold mb-2 text-[#e8eeff]"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Case Studies
                </h2>
                <div className="w-16 h-1 rounded-full mb-4" style={{ background: "var(--ds-cyan)" }} />
                <p className="text-[#5a6a8a] max-w-xl">
                  Deep dives into the security and infrastructure decisions
                  behind production systems.
                </p>
              </div>
              <Link
                href="/case-studies"
                className="hidden md:inline-flex items-center gap-2 text-[#00c8ff] hover:underline font-medium shrink-0 mb-1"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>

            {/* Featured cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  href: "/case-studies/iam-least-privilege-controls",
                  tags: ["AWS", "IAM", "SOC 2"],
                  title: "Enforcing IAM Least Privilege and Role-Based Access Across AWS",
                  summary:
                    "How I replaced wildcard IAM policies with scoped roles for EC2, Lambda, and applications — including password policy enforcement for SOC 2 CC6.1.",
                  meta: "2024-02-15 · 7 min read",
                },
                {
                  href: "/case-studies/s3-security-hardening",
                  tags: ["AWS", "S3", "Data Security"],
                  title: "S3 Security Hardening: Encryption, Versioning, and Audit Logging",
                  summary:
                    "How I enforced SSE-KMS encryption, blocked public access, enabled versioning, and turned on access logging across all S3 buckets for SOC 2 data controls.",
                  meta: "2024-02-20 · 8 min read",
                },
                {
                  href: "/case-studies/cloudtrail-cloudwatch-logging",
                  tags: ["CloudTrail", "Security Hub", "SOC 2"],
                  title: "Building a SOC 2 Logging Architecture with CloudTrail and Security Hub",
                  summary:
                    "How I built centralized logging across all AWS regions with CloudTrail, CloudWatch alerting on IAM changes, GuardDuty, and a real-time Security Hub compliance dashboard.",
                  meta: "2024-03-10 · 9 min read",
                },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group p-6 bg-[#0d1220] border border-[rgba(0,200,255,0.12)] rounded-2xl hover:border-[#00c8ff] transition-all duration-200 flex flex-col"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full"
                        style={{ background: "rgba(0,200,255,0.08)", color: "var(--ds-muted)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-[#00c8ff] transition-colors leading-snug text-[#e8eeff]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#5a6a8a] leading-relaxed grow">{card.summary}</p>
                  <p
                    className="text-xs mt-4"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
                  >
                    {card.meta}
                  </p>
                </Link>
              ))}
            </div>

            <Link
              href="/case-studies"
              className="md:hidden mt-6 inline-flex items-center gap-2 text-[#00c8ff] hover:underline font-medium"
            >
              View all case studies <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Blog section — commented out until blog content is ready
        <section id="blog" className="relative py-24 px-6 bg-[#060810] text-[#e8eeff] text-center">
        </section>
        */}

        <section
          id="contact"
          className="relative py-24 px-6 border-t overflow-hidden"
          style={{ background: "#080c18", borderColor: "rgba(0,200,255,0.08)" }}
        >
          {/* Decorative code bracket motif */}
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 select-none pointer-events-none text-[160px] font-bold leading-none opacity-[0.03]"
            style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-cyan)" }}
          >
            {"</>"}
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Eyebrow */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-xs mb-3"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-cyan)" }}
            >
              [ CONTACT ]
            </motion.p>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold mb-3 text-[#e8eeff]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Let&apos;s Connect
            </motion.h2>
            <div className="w-16 h-1 rounded-full mb-14" style={{ background: "var(--ds-cyan)" }} />

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left: Status panel */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="p-8 rounded-xl border"
                style={{
                  background: "var(--ds-surface)",
                  borderColor: "rgba(0,200,255,0.12)",
                }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className="status-pulse w-2 h-2 rounded-full"
                    style={{ background: "var(--ds-green)" }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-green)" }}
                  >
                    STATUS: AVAILABLE
                  </span>
                </div>

                <h3
                  className="text-2xl font-bold text-[#e8eeff] mb-1"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Julius Gachuhi
                </h3>
                <p
                  className="text-sm mb-5"
                  style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
                >
                  Mobile Platform · DevSecOps Engineer
                </p>
                <p className="text-[#8a9bc0] text-sm leading-relaxed mb-6">
                  Open to full-time remote roles in US &amp; EU. Available for
                  contract engagements, consulting, and security collaborations.
                </p>

                <div
                  className="flex items-center gap-3 text-xs p-3 rounded-lg border"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    borderColor: "rgba(0,200,255,0.12)",
                    color: "var(--ds-muted)",
                    background: "rgba(0,200,255,0.03)",
                  }}
                >
                  <span style={{ color: "var(--ds-cyan)" }}>~/jg $</span>
                  <span>reach out --subject &quot;Let&apos;s work together&quot;</span>
                </div>
              </motion.div>

              {/* Right: Contact buttons */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col gap-3"
              >
                {[
                  {
                    href: `mailto:${email}`,
                    icon: <FaEnvelope className="text-lg" />,
                    label: "Email",
                    sub: email,
                    accent: "#ef4444",
                    external: false,
                  },
                  {
                    href: linkedIn,
                    icon: <FaLinkedin className="text-lg" />,
                    label: "LinkedIn",
                    sub: linkedIn
                      ? linkedIn.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\/?/, "in/").replace(/\/$/, "")
                      : undefined,
                    accent: "#3b82f6",
                    external: true,
                  },
                  {
                    href: github,
                    icon: <FaGithub className="text-lg" />,
                    label: "GitHub",
                    sub: github
                      ? github.replace(/^https?:\/\/(www\.)?github\.com\/?/, "github.com/").replace(/\/$/, "")
                      : undefined,
                    accent: "#9ca3af",
                    external: true,
                  },
                ].map(({ href, icon, label, sub, accent, external }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeInUp}
                    transition={{ duration: 0.4 }}
                    className="group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: "var(--ds-surface)",
                      borderColor: "rgba(0,200,255,0.12)",
                      borderLeft: `3px solid ${accent}`,
                    }}
                  >
                    <span style={{ color: accent }}>{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#e8eeff] text-sm">{label}</p>
                      <p className="text-xs text-[#5a6a8a] truncate">{sub}</p>
                    </div>
                    <span className="text-[#5a6a8a] group-hover:text-[#00c8ff] group-hover:translate-x-1 transition-all duration-200">
                      →
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="w-full py-6 border-t"
        style={{
          background: "var(--ds-surface)",
          borderColor: "var(--ds-border)",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center">
            © {new Date().getFullYear()} Julius &quot;Kash&quot; Gachuhi. All rights reserved.
          </p>
          <p
            className="text-xs text-center"
            style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ds-muted)" }}
          >
            Built with Next.js · TailwindCSS · Framer Motion · Deployed on Vercel
          </p>
        </div>
      </footer>
    </div>
  );
}
