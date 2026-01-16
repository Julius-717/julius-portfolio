"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import { Sun, Moon, Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useTheme } from "next-themes";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import {
  FaGooglePlay,
  FaGithub,
  FaExternalLinkAlt,
  FaApple,
  FaEnvelope,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiIonic,
  SiAngular,
  SiNodedotjs,
  SiPython,
  SiFlutter,
  SiDart,
  SiSolidity,
  SiCapacitor,
} from "react-icons/si";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

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

  const stacks = [
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
    { name: "Dart", icon: <SiDart className="text-cyan-400" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "Ionic", icon: <SiIonic className="text-teal-400" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
    { name: "Python", icon: <SiPython className="text-yellow-300" /> },
    { name: "Solidity", icon: <SiSolidity className="text-gray-200" /> },
    { name: "Angular", icon: <SiAngular className="text-red-600" /> },
    { name: "Flutter", icon: <SiFlutter className="text-sky-400" /> },
    { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> },
    { name: "CSS3", icon: <SiCss3 className="text-blue-400" /> },
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
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
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
      },
    },
    {
      title: "Portfolio Website",
      description:
        "My personal portfolio showcasing skills, projects, and blogs. Built with Next.js, TailwindCSS, and Framer Motion.",
      image: "/images/portfolio.png",
      tags: ["Next.js", "TailwindCSS", "Framer Motion"],
      links: {
        github: "https://github.com/yourusername/portfolio",
        live: "https://yourdomain.com",
      },
    },
  ];

  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const sections = ["about", "skills", "projects", "blog", "contact"];

  useEffect(() => setMounted(true), []);

  // Detect which section is in viewport
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let current = "about";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPosition) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Julius Gachuhi | Mobile Platform & DevSecOps Engineer</title>

        <meta
          name="description"
          content="Mobile Platform & DevSecOps Engineer building secure, scalable mobile applications, cloud infrastructure, and CI/CD pipelines. Experience in application security, SOC 2 readiness, and production systems."
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
      </Head>

      {/* Navbar */}
      <header className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow z-50">
        <nav className="max-w-6xl mx-auto px-6 flex justify-between items-center py-4">
          <a href="/" className="flex items-center space-x-2">
            <Image
              src="/images/kash1.png"
              alt="Julius Kash Logo"
              width={40} // adjust size
              height={40}
              className="rounded-full"
              priority
            />
            <span className="sr-only">Julius Kash</span> {/* Accessible name */}
          </a>
          <div className="hidden md:flex space-x-6">
            {["about", "skills", "projects", "blog", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {currentTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 space-y-4">
            {["about", "skills", "projects", "blog", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 pt-20">
        {/* Hero Section */}
        <section className="relative bg-black text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 min-h-[80vh] md:min-h-screen flex items-center pt-24">
            <div className="w-full grid md:grid-cols-12 gap-8 items-center">
              {/* LEFT: text (spans 7/12 on md+) */}
              <motion.div {...enterFromLeft} className="md:col-span-7">
                <p className="text-lg md:text-xl text-gray-300 mb-2">
                  Hi There!
                </p>

                {/* Primary headline */}
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                  Mobile Platform & DevSecOps Engineer
                </h1>

                {/* Sub headline */}
                <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl">
                  I build, secure, and scale production mobile platforms — from
                  cross-platform apps to cloud infrastructure, CI/CD pipelines,
                  and application security.
                </p>

                {/* Typewriter */}
                <p className="text-xl md:text-2xl font-semibold text-cyan-400">
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
                    href="/pdf/Kash_Resume.pdf"
                    download
                    className="inline-flex items-center px-6 py-3 border border-red-500 rounded-lg text-white hover:bg-red-500 transition"
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

          {/* Vertical social icons - fixed on the left, visible on md+ */}
          <div className="hidden md:flex flex-col items-center fixed left-6 top-1/2 -translate-y-1/2 gap-4 z-50">
            {sections.map((section) => (
              <a key={section} href={`#${section}`} className="relative group">
                {/* Circle indicator */}
                <motion.div
                  animate={{
                    scale: activeSection === section ? 1.5 : 1,
                    backgroundColor:
                      activeSection === section ? "#06b6d4" : "#4b5563", // cyan for active, gray for inactive
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-3 h-3 rounded-full bg-gray-500 cursor-pointer"
                />

                {/* Tooltip */}
                <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
              </a>
            ))}
          </div>

          <section
            id="about"
            className="relative py-24 px-6 bg-black text-white text-center"
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
              className="text-lg md:text-xl text-gray-300 mb-6"
            >
              Little about me. Also, it’s not that hard to find me.
            </motion.p>

            {/* Divider */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 1.2 }}
              className="flex items-center justify-center gap-4 mb-8 text-gray-400"
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
              className="max-w-3xl mx-auto text-base md:text-lg text-gray-300 leading-relaxed"
            >
              I’m a{" "}
              <span className="text-white font-semibold">
                Mobile Platform & DevSecOps Engineer
              </span>{" "}
              with 4+ years of experience building and operating
              production-grade mobile applications. My work sits at the
              intersection of cross-platform engineering, cloud infrastructure,
              CI/CD automation, and application security — ensuring systems are
              not only usable, but reliable, secure, and scalable. 🚀
              <br />
              <br />
              At <span className="text-white font-semibold">Enquire AI</span>, I
              led the delivery of a cross-platform mobile platform used in
              production, owning everything from application architecture to
              secure authentication, real-time systems, and deployment
              workflows. I contributed to SOC 2 readiness, implemented secure
              identity flows using Auth0, optimized performance for low-end
              devices, and collaborated with DevOps teams to strengthen CI/CD
              pipelines and security controls. ⚡
              <br />
              <br />
              I’m currently advancing my expertise in{" "}
              <span className="text-white font-semibold">
                cybersecurity and penetration testing
              </span>
              , with a focus on application security and cloud risk reduction —
              positioning myself to operate as a platform-level engineer, not
              just a feature builder. 🛡️
            </motion.p>
          </section>

          <section
            id="skills"
            className="relative py-24 px-6 bg-black text-white"
          >
            {/* Title */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center text-4xl md:text-5xl font-extrabold mb-6
               bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500
               bg-clip-text text-transparent"
            >
              Skills
            </motion.h2>

            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-20">
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
                    className="p-8 bg-gray-900 border border-gray-800 rounded-2xl
                     hover:border-cyan-500 hover:-translate-y-1
                     transition"
                  >
                    <div className="text-3xl mb-4">{skill.icon}</div>
                    <p className="text-lg font-semibold text-white">
                      {skill.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SECONDARY */}
            <div className="max-w-6xl mx-auto mb-20">
              <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-8">
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
                    className="flex items-center gap-4 p-6 bg-gray-900/60
                     border border-gray-800 rounded-xl
                     hover:border-gray-600 transition"
                  >
                    <div className="text-3xl">{skill.icon}</div>
                    <p className="text-gray-200 font-medium">{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* EXPLORATORY */}
            <div className="max-w-6xl mx-auto">
              <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-6">
                Exploratory
              </h3>

              <div className="flex flex-wrap gap-4">
                {exploratorySkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="flex items-center gap-2 px-4 py-2
                     rounded-full border border-gray-700
                     text-sm text-gray-400
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
            className="relative py-24 px-6 bg-black text-white text-center"
          >
            {/* Title */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold mb-12 bg-linear-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
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
                  className="bg-gray-900 rounded-2xl overflow-hidden shadow hover:shadow-2xl hover:-translate-y-1 transition flex flex-col"
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
                    <div className="text-gray-300 mb-4">
                      {project.description}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-200"
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
                          className="flex items-center gap-2 text-gray-200 hover:underline"
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
          <section
            id="blog"
            className="relative py-24 px-6 bg-black text-white text-center"
          >
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold mb-12 bg-linear-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent"
            >
              Blog
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.7 }}
              className="text-lg text-gray-400 max-w-2xl mx-auto"
            >
              I’m currently writing articles on mobile development, DevSecOps,
              and cybersecurity. Stay tuned — new posts coming soon! 🚀
            </motion.p>
          </section>

          <section
            id="contact"
            className="relative py-24 px-6 bg-black text-white text-center"
          >
            {/* Title */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold mb-12 bg-linear-to-r from-green-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent"
            >
              Let’s Connect
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.7 }}
              className="text-lg mb-10 text-gray-300 max-w-2xl mx-auto"
            >
              Reach out for collaborations, opportunities, or just a chat. I’d
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
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition"
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
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition"
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
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition"
              >
                <FaGithub className="text-gray-400 text-xl" /> GitHub
              </motion.a>
            </div>
          </section>
        </section>
      </main>
      {/* Floating WhatsApp Support */}
      <div className="relative group">
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl animate-pulse transition-all duration-300"
          style={{ bottom: "25%" }}
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </a>
        <span className="absolute bottom-20 right-0 w-max px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with me on WhatsApp
        </span>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-gray-900 py-4 shadow-lg z-50">
        <div className="flex justify-center items-center">
          <p className="text-sm font-medium bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center">
            © {new Date().getFullYear()} Julius “Kash” Gachuhi. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
