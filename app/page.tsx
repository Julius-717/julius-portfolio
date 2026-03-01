"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useTheme } from "next-themes";
import {
  FaGooglePlay,
  FaGithub,
  FaExternalLinkAlt,
  FaApple,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";
import {
  SiTypescript,
  SiIonic,
  SiFlutter,
  SiSolidity,
} from "react-icons/si";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const linkedIn = process.env.NEXT_PUBLIC_LINKEDIN;
  const github = process.env.NEXT_PUBLIC_GITHUB;

  const [text] = useTypewriter({
    words: [
      "Securing production mobile systems",
      "Shipping compliant, scalable platforms",
      "Reducing risk through DevSecOps",
      "From mobile apps to cloud security",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  const enterFromLeft = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.9 },
  };
  const enterFromRight = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.9 },
  };

  const primarySkills = [
    { name: "Mobile Platform Engineering", icon: "📱" },
    { name: "Application Security", icon: "🛡️" },
    { name: "CI/CD & DevOps", icon: "⚙️" },
    { name: "Cloud Infrastructure", icon: "☁️" },
    { name: "Secure Auth (OAuth, SSO)", icon: "🔐" },
  ];

  const secondarySkills = [
    {
      name: "Ionic / Angular / Capacitor",
      icon: <SiIonic className="text-teal-400" />,
    },
    {
      name: "TypeScript / JavaScript",
      icon: <SiTypescript className="text-blue-500" />,
    },
    { name: "Flutter / Dart", icon: <SiFlutter className="text-sky-400" /> },
  ];

  const exploratorySkills = [
    { name: "Web3", icon: "🌐" },
    { name: "Solidity", icon: <SiSolidity className="text-gray-300" /> },
  ];

  const projects = [
    {
      title: "Enquire AI",
      description: (
        <>
          A production AI-powered mobile platform serving real users across
          Android and iOS. I led the end-to-end development and modernization of
          the application, focusing on{" "}
          <span className="font-semibold">security</span>,{" "}
          <span className="font-semibold">performance</span>, and{" "}
          <span className="font-semibold">scalability</span>.
          <ul className="list-disc list-inside mt-4 space-y-2 text-[#374151] dark:text-[#CBD5E1]">
            <li>
              <span className="font-semibold">Platform Engineering:</span> Built
              and shipped a cross-platform Ionic/Angular + Capacitor app in 6
              months; optimized startup time, memory usage, and APK size for
              low-end devices.
            </li>
            <li>
              <span className="font-semibold">Security & Compliance:</span>
              Implemented secure Auth0 SSO (OAuth), improved API handling, and
              contributed to SOC 2 security controls and documentation.
            </li>
            <li>
              <span className="font-semibold">
                Cloud Security & SOC 2 Controls:
              </span>
              Enforced IAM least privilege policies across EC2, Lambda, and
              application roles. Enabled CloudTrail in all AWS regions with
              encrypted S3 storage. Configured GuardDuty, Security Hub, AWS
              Config, and Inspector for compliance monitoring and threat
              detection.
            </li>

            <li>
              <span className="font-semibold">Infrastructure Hardening:</span>
              Enforced IMDSv2 on EC2 instances, enabled S3 Block Public Access,
              versioning, lifecycle policies, and configured AWS WAF for rate
              limiting and application-layer protection.
            </li>
            <li>
              <span className="font-semibold">
                Reliability & Real-Time Systems:
              </span>{" "}
              Integrated WebSockets and AI APIs to support real-time
              communication and expert matching at scale.
            </li>
          </ul>
        </>
      ),
      image: "/images/enquire.png",
      tags: [
        "AI",
        "Mobile App",
        "Cross-Platform",
        "Ionic/Angular",
        "Capacitor",
        "Firebase",
        "DevSecOps",
      ],
      links: {
        playstore:
          "https://play.google.com/store/apps/details?id=ai.enquire.app&hl=en-US&pli=1",
        appstore: "https://apps.apple.com/us/app/enquire-ai/id6483439331",
        website: "https://app.enquire.ai",
        github: "",
        live: "",
      },
    },
    {
      title: "Portfolio Website",
      description:
        "My personal portfolio showcasing skills, projects, and blogs. Built with Next.js, TailwindCSS, and Framer Motion.",
      image: "/images/portfolio.png",
      tags: ["Next.js", "TailwindCSS", "Framer Motion"],
      links: {
        playstore: "",
        appstore: "",
        website: "",
        github: "",
        live: "",
      },
    },
  ];

  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="bg-[#FAFAF9] dark:bg-[#0A0A0F] transition-colors duration-300">
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

      {/* Navbar */}
      <header className="fixed top-0 w-full bg-[#FAFAF9]/95 dark:bg-[#0A0A0F]/95 backdrop-blur-md border-b border-[#E5E7EB] dark:border-[#1E1E2E] z-50">
        <nav className="max-w-6xl mx-auto px-6 flex justify-between items-center py-4">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold tracking-wider font-mono">
              <span className="text-[#111827] dark:text-white">J</span>
              <span className="text-[#0891B2] dark:text-cyan-400">G</span>
            </span>
          </a>
          <div className="hidden md:flex space-x-6 items-center">
            {["about", "skills", "projects", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-[#111827] dark:text-[#94A3B8] hover:text-[#0891B2] dark:hover:text-[#22D3EE] transition-colors duration-200"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
            <Link
              href="/case-studies"
              className="text-[#111827] dark:text-[#94A3B8] hover:text-[#0891B2] dark:hover:text-[#22D3EE] transition-colors duration-200 font-medium"
            >
              Case Studies
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg hover:bg-[#F3F4F6] dark:hover:bg-[#1E1E2E] transition-colors duration-200"
            >
              {currentTheme === "dark" ? (
                <Sun size={20} className="text-amber-400" />
              ) : (
                <Moon size={20} className="text-[#6B7280]" />
              )}
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#F3F4F6] dark:hover:bg-[#1E1E2E]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="md:hidden bg-[#FAFAF9] dark:bg-[#0A0A0F] border-t border-[#E5E7EB] dark:border-[#1E1E2E] px-6 py-4 space-y-4">
            {["about", "skills", "projects", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
                className="block text-[#111827] dark:text-[#94A3B8] hover:text-[#0891B2] dark:hover:text-[#22D3EE]"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
            <Link
              href="/case-studies"
              onClick={() => setMenuOpen(false)}
              className="block text-[#111827] dark:text-[#94A3B8] hover:text-[#0891B2] dark:hover:text-[#22D3EE] font-medium"
            >
              Case Studies
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-[#FAFAF9] dark:bg-[#0A0A0F] text-[#111827] dark:text-[#F1F5F9] pt-20">
        {/* Hero Section */}
        <section className="relative bg-[#FAFAF9] dark:bg-[#0A0A0F] text-[#111827] dark:text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 min-h-[80vh] md:min-h-screen flex items-center pt-24">
            <div className="w-full grid md:grid-cols-12 gap-8 items-center">
              {/* LEFT: text (spans 7/12 on md+) */}
              <motion.div {...enterFromLeft} className="md:col-span-7">
                <p className="text-lg md:text-xl text-[#374151] dark:text-gray-300 mb-2">
                  Hi There!
                </p>

                {/* Primary headline */}
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                  Mobile Platform & DevSecOps Engineer
                </h1>

                {/* Sub headline */}
                <p className="text-lg md:text-xl text-[#374151] dark:text-gray-300 mb-4 max-w-3xl">
                  Building secure, SOC 2–aligned systems on AWS — from
                  cross-platform applications to cloud infrastructure, CI/CD
                  automation, and application security.
                </p>

                <p className="text-sm text-[#0891B2] dark:text-cyan-400 font-medium mb-6">
                  Open to Remote US & EU Opportunities
                </p>

                {/* Typewriter */}
                <p className="text-xl md:text-2xl font-semibold text-[#0891B2] dark:text-cyan-400">
                  {text}
                  <Cursor cursorColor="#06b6d4" />
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition"
                    aria-label="Hire me"
                  >
                    Consult Me
                  </a>

                  <a
                    href="/pdf/Julius_Gachuhi_Resume.pdf"
                    download
                    className="inline-flex items-center px-6 py-3 border border-red-500 rounded-lg text-red-500 dark:text-white hover:bg-red-500 hover:text-white transition"
                    aria-label="Download CV"
                  >
                    Download CV
                  </a>
                </div>
              </motion.div>

              {/* RIGHT: avatar (spans 5/12) */}
              <motion.div
                {...enterFromRight}
                className="md:col-span-5 flex justify-center md:justify-end"
              >
                <div className="relative w-64 h-64 md:w-105 md:h-105 rounded-full overflow-hidden">
                  <Image
                    src="/images/me-removebg-preview.png"
                    alt="My Avatar"
                    fill
                    sizes="(max-width: 768px) 240px, 420px"
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>

        </section>

        {/* Metrics bar */}
        <section className="bg-[#F3F4F6] dark:bg-[#0D0D14] py-10 px-6 border-t border-[#E5E7EB] dark:border-gray-800">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-[#0891B2] dark:text-cyan-400">6 Months</p>
              <p className="text-sm text-[#6B7280] dark:text-gray-400">Product Delivery</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0891B2] dark:text-cyan-400">-1.5s</p>
              <p className="text-sm text-[#6B7280] dark:text-gray-400">Load Time Reduction</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0891B2] dark:text-cyan-400">+32%</p>
              <p className="text-sm text-[#6B7280] dark:text-gray-400">User Retention</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0891B2] dark:text-cyan-400">SOC 2</p>
              <p className="text-sm text-[#6B7280] dark:text-gray-400">Readiness Contributor</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0891B2] dark:text-cyan-400">AWS</p>
              <p className="text-sm text-[#6B7280] dark:text-gray-400">Security Controls</p>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="relative py-24 px-6 bg-[#FAFAF9] dark:bg-[#0A0A0F] text-[#111827] dark:text-[#F1F5F9] text-center"
        >
          {/* Title */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-8 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
          >
            About
          </motion.h2>

          {/* Avatar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-purple-500/60 shadow-xl">
              <Image
                src="/images/me.jpg"
                alt="My portrait"
                fill
                sizes="(max-width: 768px) 160px, 192px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 1 }}
            className="text-lg md:text-xl text-[#374151] dark:text-[#CBD5E1] mb-6"
          >
            I design and operate secure mobile platforms used in production
            environments.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 1.2 }}
            className="flex items-center justify-center gap-4 mb-8 text-[#6B7280] dark:text-[#9CA3AF]"
          >
            <span className="w-16 h-px bg-gray-600" />
            <span className="text-lg">✦</span>
            <span className="w-16 h-px bg-gray-600" />
          </motion.div>

          {/* Interest Tags */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 1.4 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {[
              {
                label: "Mobile Platform & DevSecOps Engineer",
                color: "bg-red-500/90",
              },
              {
                label: "Application Security & Secure Systems",
                color: "bg-emerald-500/90",
              },
              {
                label: "Cloud Infrastructure & CI/CD",
                color: "bg-indigo-500/90",
              },
              { label: "Distributed Systems R&D", color: "bg-pink-500/90" },
            ].map((chip) => (
              <span
                key={chip.label}
                className={`${chip.color} px-4 py-2 rounded-full text-white font-medium shadow-md`}
              >
                {chip.label}
              </span>
            ))}
          </motion.div>

          {/* Paragraph */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 1.6 }}
            className="max-w-3xl mx-auto text-base md:text-lg text-[#374151] dark:text-[#CBD5E1] leading-relaxed"
          >
            I'm a{" "}
            <span className="text-[#111827] dark:text-white font-semibold">
              Mobile Platform & DevSecOps Engineer
            </span>{" "}
            with 4+ years of experience building and operating
            production-grade mobile applications. My work sits at the
            intersection of cross-platform engineering, cloud infrastructure,
            CI/CD automation, and application security — ensuring systems are
            not only usable, but reliable, secure, and scalable. 🚀
            <br />
            <br />
            At{" "}
            <span className="text-[#111827] dark:text-white font-semibold">
              Enquire AI
            </span>
            , I led the delivery of a cross-platform mobile platform used in
            production, owning everything from application architecture to
            secure authentication, real-time systems, and deployment
            workflows. I contributed to SOC 2 readiness, implemented secure
            identity flows using Auth0, optimized performance for low-end
            devices, and collaborated with DevOps teams to strengthen CI/CD
            pipelines and security controls. ⚡
            <br />
            <br />
            I'm deepening applied offensive security skills —{" "}
            <span className="text-[#111827] dark:text-white font-semibold">
              penetration testing and vulnerability assessment
            </span>{" "}
            — to complement my platform-level defensive work and reduce risk
            across the full stack. 🛡️
          </motion.p>
        </section>

        <section
          id="skills"
          className="relative py-24 px-6 bg-[#FAFAF9] dark:bg-[#0A0A0F] text-[#111827] dark:text-[#F1F5F9]"
        >
          {/* Title */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center text-4xl md:text-5xl font-extrabold mb-6
             bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500
             bg-clip-text text-transparent"
          >
            Skills
          </motion.h2>

          <p className="text-center text-[#6B7280] dark:text-[#94A3B8] max-w-2xl mx-auto mb-20">
            Platform-first engineering, security-conscious delivery, and
            production reliability.
          </p>

          {/* PRIMARY */}
          <div className="max-w-6xl mx-auto mb-20">
            <h3 className="text-sm uppercase tracking-widest text-cyan-400 mb-8">
              Primary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {primarySkills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-[#1E1E2E] rounded-2xl
                   hover:border-cyan-500 hover:-translate-y-1
                   transition"
                >
                  <div className="text-3xl mb-4">{skill.icon}</div>
                  <p className="text-lg font-semibold text-[#111827] dark:text-white">
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SECONDARY */}
          <div className="max-w-6xl mx-auto mb-20">
            <h3 className="text-sm uppercase tracking-widest text-[#6B7280] dark:text-[#94A3B8] mb-8">
              Core Stack
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondarySkills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-center gap-4 p-6 bg-white/80 dark:bg-[#111118]/60
                   border border-[#E5E7EB] dark:border-[#1E1E2E] rounded-xl
                   hover:border-gray-600 transition"
                >
                  <div className="text-3xl">{skill.icon}</div>
                  <p className="text-[#111827] dark:text-[#E2E8F0] font-medium">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CLOUD SECURITY & COMPLIANCE */}
          <div className="max-w-6xl mx-auto mt-20">
            <h3 className="text-sm uppercase tracking-widest bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-8">
              Cloud Security & Compliance
            </h3>

            <div className="flex flex-wrap gap-4">
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
                <span
                  key={item}
                  className="px-4 py-2 rounded-full border border-emerald-500/40 text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-transparent"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* EXPLORATORY */}
          <div className="max-w-6xl mx-auto mt-20">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-6">
              Exploratory
            </h3>

            <div className="flex flex-wrap gap-4">
              {exploratorySkills.map((skill) => (
                <span
                  key={skill.name}
                  className="flex items-center gap-2 px-4 py-2
                   rounded-full border border-[#E5E7EB] dark:border-[#374151]
                   text-sm text-[#6B7280] dark:text-[#9CA3AF]
                   hover:border-gray-500 transition"
                >
                  <span>{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="relative py-24 px-6 bg-[#FAFAF9] dark:bg-[#0A0A0F] text-[#111827] dark:text-[#F1F5F9] text-center"
        >
          {/* Title */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-12 bg-linear-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
          >
            Projects
          </motion.h2>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-[#1E1E2E] rounded-2xl overflow-hidden shadow hover:shadow-2xl hover:-translate-y-1 transition flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-56">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow text-left">
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>

                  {/* Description */}
                  <div className="text-[#374151] dark:text-[#CBD5E1] mb-4">
                    {project.description}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-[#F3F4F6] dark:bg-[#1E1E2E] text-[#374151] dark:text-[#E2E8F0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 mt-auto">
                    {project.links.playstore && (
                      <a
                        href={project.links.playstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-400 hover:underline"
                      >
                        <FaGooglePlay /> Google Play
                      </a>
                    )}
                    {project.links.appstore && (
                      <a
                        href={project.links.appstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-500 dark:text-gray-200 hover:underline"
                      >
                        <FaApple /> App Store
                      </a>
                    )}
                    {project.links.website && (
                      <a
                        href={project.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:underline"
                      >
                        <FaExternalLinkAlt /> Website
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:underline"
                      >
                        <FaGithub /> GitHub
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-400 hover:underline"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Case Studies Teaser */}
        <section className="relative py-24 px-6 bg-[#FAFAF9] dark:bg-[#0A0A0F] text-[#111827] dark:text-[#F1F5F9]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Case Studies
                </h2>
                <p className="text-[#6B7280] dark:text-[#94A3B8] max-w-xl">
                  Deep dives into the security and infrastructure decisions behind
                  production systems.
                </p>
              </div>
              <Link
                href="/case-studies"
                className="hidden md:inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:underline font-medium shrink-0"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>

            {/* Featured cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  href: "/case-studies/iam-least-privilege-controls",
                  tags: ["AWS", "IAM", "SOC 2"],
                  title: "Enforcing IAM Least Privilege and Role-Based Access Across AWS",
                  summary: "How I replaced wildcard IAM policies with scoped roles for EC2, Lambda, and applications — including password policy enforcement for SOC 2 CC6.1.",
                  meta: "2024-02-15 · 7 min read",
                },
                {
                  href: "/case-studies/s3-security-hardening",
                  tags: ["AWS", "S3", "Data Security"],
                  title: "S3 Security Hardening: Encryption, Versioning, and Audit Logging",
                  summary: "How I enforced SSE-KMS encryption, blocked public access, enabled versioning, and turned on access logging across all S3 buckets for SOC 2 data controls.",
                  meta: "2024-02-20 · 8 min read",
                },
                {
                  href: "/case-studies/cloudtrail-cloudwatch-logging",
                  tags: ["CloudTrail", "Security Hub", "SOC 2"],
                  title: "Building a SOC 2 Logging Architecture with CloudTrail and Security Hub",
                  summary: "How I built centralized logging across all AWS regions with CloudTrail, CloudWatch alerting on IAM changes, GuardDuty, and a real-time Security Hub compliance dashboard.",
                  meta: "2024-03-10 · 9 min read",
                },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="block group p-6 bg-white dark:bg-[#111118]
                             border border-[#E5E7EB] dark:border-[#1E1E2E]
                             rounded-2xl hover:border-cyan-500 dark:hover:border-cyan-500
                             transition-all duration-200 flex flex-col"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-[#F3F4F6] dark:bg-[#1E1E2E] text-[#374151] dark:text-[#E2E8F0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed grow">
                    {card.summary}
                  </p>
                  <p className="text-xs text-[#9CA3AF] dark:text-[#64748B] mt-4">
                    {card.meta}
                  </p>
                </Link>
              ))}
            </div>

            <Link
              href="/case-studies"
              className="md:hidden mt-6 inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
            >
              View all case studies <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Blog section — commented out until blog content is ready
        <section
          id="blog"
          className="relative py-24 px-6 bg-[#FAFAF9] dark:bg-[#0A0A0F] text-[#111827] dark:text-[#F1F5F9] text-center"
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-12 bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"
          >
            Blog
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="text-lg text-[#6B7280] dark:text-[#94A3B8] max-w-2xl mx-auto mb-8"
          >
            Upcoming technical articles:
          </motion.p>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-[#6B7280] dark:text-[#94A3B8] max-w-2xl mx-auto space-y-3 text-left list-none"
          >
            {[
              "Implementing IMDSv2 and EC2 Hardening in AWS",
              "Designing SOC 2 Logging & Monitoring Architectures",
              "Securing Cross-Platform Authentication with Auth0 & OAuth",
              "Building CI/CD Pipelines with Integrated Security Scanning",
            ].map((title) => (
              <li key={title} className="flex items-start gap-3">
                <span className="text-[#0891B2] dark:text-cyan-400 mt-1">→</span>
                <span>{title}</span>
              </li>
            ))}
          </motion.ul>
        </section>
        */}

        <section
          id="contact"
          className="relative py-24 px-6 bg-[#FAFAF9] dark:bg-[#0A0A0F] text-[#111827] dark:text-[#F1F5F9] text-center"
        >
          {/* Title */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-12 bg-linear-to-r from-green-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent"
          >
            Let's Connect
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="text-lg mb-10 text-[#374151] dark:text-[#CBD5E1] max-w-2xl mx-auto"
          >
            Reach out for collaborations, opportunities, or just a chat. I'd
            love to hear from you!
          </motion.p>

          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
            <motion.a
              href={`mailto:${email}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-[#1E1E2E] rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              <FaEnvelope className="text-red-400 text-xl" /> Email
            </motion.a>

            <motion.a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-[#1E1E2E] rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              <FaLinkedin className="text-blue-500 text-xl" /> LinkedIn
            </motion.a>

            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-[#1E1E2E] rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              <FaGithub className="text-gray-400 text-xl" /> GitHub
            </motion.a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#F3F4F6] dark:bg-[#0D0D14] border-t border-[#E5E7EB] dark:border-[#1E1E2E] py-4 shadow-lg">
        <div className="flex justify-center items-center">
          <p className="text-sm font-medium bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center">
            © {new Date().getFullYear()} Julius "Kash" Gachuhi. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
