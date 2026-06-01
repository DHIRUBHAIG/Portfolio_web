'use client';

import ContactForm from '../components/ContactForm';
import ScrollProgress from '../components/ScrollProgress';
import ThemeToggle from '../components/ThemeToggle';
import { motion } from 'framer-motion';
import {
  FaAward,
  FaBook,
  FaBolt,
  FaChartLine,
  FaCheck,
  FaChevronUp,
  FaCloud,
  FaEnvelope,
  FaGithub,
  FaGraduationCap,
  FaLaptopCode,
  FaLightbulb,
  FaLock,
  FaNetworkWired,
  FaQuoteLeft,
  FaRocket,
  FaStar,
  FaTools,
  FaBriefcase,
  FaDatabase,
} from 'react-icons/fa';
import {
  SiCodechef,
  SiGithub,
  SiHackerrank,
  SiLeetcode,
  SiNodedotjs,
  SiOpenai,
  SiPython,
  SiReact,
} from 'react-icons/si';
import { AiOutlineCloudServer } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';

const stats = [
  { label: 'Projects Completed', value: 14 },
  { label: 'Certifications Earned', value: 8 },
  { label: 'Coding Problems Solved', value: 440 },
  { label: 'Technologies Learned', value: 18 },
];


const certifications = [
  {
    title: "Machine Learning Foundations",
    org: "Cisco",
    date: "2026",
    link: "/Modern_AI.pdf",
  },
  {
    title: "Python Programming",
    org: "Cisco",
    date: "2026",
    link: "Python.pdf",
  },
  {
    title: "Data Science Fundamentals",
    org: "Cisco",
    date: "2026",
    link: "Data_Science.pdf",
  },
  {
    title: "AI Fundamentals",
    org: "cisco",
    date: "2026",
    link: "Apply_AI.pdf",
  },
];

const skills = [
  { name: 'C++', percent: 90 },
  { name: 'Java', percent: 82 },
  { name: 'Python', percent: 94 },
  { name: 'JavaScript', percent: 86 },
  { name: 'React.js', percent: 88 },
  { name: 'Next.js', percent: 82 },
  { name: 'Node.js', percent: 78 },
  { name: 'MongoDB', percent: 74 },
  { name: 'TensorFlow', percent: 72 },
  { name: 'OpenCV', percent: 70 },
];

const projects = [
  {
    title: 'AI Dynamic E-Commerce Platform',
    description:
      'A premium shopping experience with personalized recommendations, AI search, product analytics, and intelligent dashboard insights for modern retailers.',
    tech: ['React', 'Node.js', 'TensorFlow', 'MongoDB', 'Stripe'],
    features: ['Recommendation engine', 'AI-powered search', 'Analytics dashboard', 'Secure payments'],
    demo: '#projects',
    github: '#projects',
  },
  {
    title: 'Machine Learning Prediction System',
    description:
      'Data-driven forecasting platform with robust analysis, dynamic visualizations, and a prediction model tuned for precision and user trust.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Plotly', 'Flask'],
    features: ['Exploratory analysis', 'Model training', 'Interactive dashboard', 'Data visualizations'],
    demo: '#projects',
    github: 'https://github.com/DHIRUBHAIG',
  },
  {
    title: 'Portfolio Website',
    description:
      'A responsive recruiter-focused portfolio with glassmorphism UI, motion design, SEO-ready structure, and premium brand positioning.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'EmailJS'],
    features: ['Modern UI', 'Dark theme', 'Responsive layout', 'Contact form integration'],
    demo: '#contact',
    github: 'https://github.com/DHIRUBHAIG',
  },
];

// const certifications = [
//   { title: 'Machine Learning Foundations', org: 'Coursera', date: '2024' },
//   { title: 'Python Programming', org: 'Google', date: '2024' },
//   { title: 'Data Science Fundamentals', org: 'IBM', date: '2024' },
//   { title: 'AI Fundamentals', org: 'Microsoft', date: '2024' },
// ];

const experiences = [
  {
    title: 'AI Research Intern',
    role: 'LNCT Innovation Lab',
    duration: '2024 - Present',
    details: ['Built ML pipelines', 'Collaborated on neural research', 'Published internal prototypes'],
  },
  {
    title: 'Frontend Developer',
    role: 'Freelance Projects',
    duration: '2023 - Present',
    details: ['Created responsive web apps', 'Implemented modern UI systems', 'Optimized for performance'],
  },
  {
    title: 'Campus Tech Lead',
    role: 'AI Club, LNCT',
    duration: '2023 - Present',
    details: ['Led peer workshops', 'Managed hackathon teams', 'Organized training sessions'],
  },
];

const blogs = [
  { title: 'AI Impact in Real-World Systems', category: 'AI', tag: 'Analysis' },
  { title: 'Competitive Programming Strategies', category: 'Programming', tag: 'Career' },
  { title: 'Building Modern Web Apps with Next.js', category: 'Web Development', tag: 'Tutorial' },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-6 sm:px-10 lg:px-16">
      <ScrollProgress />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950 via-slate-950/70 to-transparent" />
      <div className="absolute right-[-80px] top-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="relative z-10 flex flex-col gap-6 rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Dhiraj Kumar Gupta</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">AI & ML Portfolio for Recruiters</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              B.Tech CSE-AIML student at LNCT Bhopal with a passion for building intelligent systems, scalable software,
              and premium digital products.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ThemeToggle />
            <a href="#contact" className="rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:scale-[1.02]">
              Contact Me
            </a>
          </div>
        </header>

        <section id="hero" className="relative overflow-hidden rounded-[40px] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="hero-bg" aria-hidden="true" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-200">AI/ML · Software · Leadership</span>
                <span className="rounded-full bg-slate-900/75 px-4 py-2 text-sm text-slate-300">LNCT Bhopal</span>
              </div>
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Hi, I&apos;m Dhiraj Kumar Gupta</h2>
              <p className="max-w-xl text-lg leading-8 text-slate-300">
                A driven Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning,
                building intelligent products, powerful developer experiences, and recruiter-ready digital strategies.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Specializations</p>
                  <p className="mt-3 text-xl font-semibold text-white">AI/ML Developer</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Strengths</p>
                  <p className="mt-3 text-xl font-semibold text-white">Software Engineer</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {['AI/ML Developer', 'Software Engineer', 'Competitive Programmer', 'Full Stack Developer', 'Tech Innovator'].map((tag) => (
                  <span key={tag} className="rounded-3xl bg-slate-900/70 px-4 py-3 text-sm text-slate-200 shadow-inner shadow-slate-950/20">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="rounded-full bg-gradient-to-r from-sky-400 to-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                  Hire Me
                </a>
                <a href="/Dhiraj-Kumar-Gupta-Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Download Resume
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-slate-300">
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="rounded-3xl bg-slate-900/70 px-4 py-3 hover:bg-slate-800">
                  LinkedIn
                </a>
                <a href="https://github.com/DHIRUBHAIG" target="_blank" rel="noreferrer" className="rounded-3xl bg-slate-900/70 px-4 py-3 hover:bg-slate-800">
                  GitHub
                </a>
                <a href="https://leetcode.com/u/dhirubhai76/" target="_blank" rel="noreferrer" className="rounded-3xl bg-slate-900/70 px-4 py-3 hover:bg-slate-800">
                  LeetCode
                </a>
                <a href="https://leetcode.com/u/dhirubhai76/" target="_blank" rel="noreferrer" className="rounded-3xl bg-slate-900/70 px-4 py-3 hover:bg-slate-800">
                  HackerRank
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative h-full w-full rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
                <div className="glass-panel absolute inset-0 rounded-[32px]" />
                <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center gap-6 text-center">
                  <div className="h-40 w-40 rounded-full bg-gradient-to-br from-sky-400/20 via-cyan-300/10 to-emerald-300/10 p-1">
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-950/90">
  <img
    src="/id.jpeg"
    alt="Dhiraj Kumar Gupta"
    className="h-full w-full object-cover"
  />
</div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Personal Brand</p>
                    <h3 className="text-2xl font-semibold text-white">Future ML Engineer</h3>
                    <p className="max-w-sm text-sm leading-7 text-slate-300">
                      Designing intelligent systems, building polished user experiences, and advancing academic excellence with every project.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/75 px-4 py-3 text-left">
                      <p className="text-sm text-slate-400">Profile</p>
                      <p className="font-semibold text-white">AI Engineering · Data Science · Full Stack</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-900/75 px-4 py-3 text-left">
                      <p className="text-sm text-slate-400">Education</p>
                      <p className="font-semibold text-white">B.Tech in CSE-AIML, LNCT Bhopal</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="space-y-8 rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">About Me</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Professional Summary</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              A passionate AI/ML student with strong foundations in software development, data structures, algorithms,
              object-oriented programming, machine learning, AI, database systems, and modern web technologies.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-xl shadow-slate-950/20">
              <FaLightbulb className="h-8 w-8 text-cyan-300" />
              <h3 className="mt-4 text-xl font-semibold text-white">Career Vision</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                To deliver impactful AI solutions, contribute to research-driven projects, and lead innovation in the next wave of intelligent platforms.
              </p>
            </article>
            <article className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-xl shadow-slate-950/20">
              <FaBolt className="h-8 w-8 text-emerald-300" />
              <h3 className="mt-4 text-xl font-semibold text-white">Technical Interests</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                AI research, ML pipelines, computer vision, full stack systems, cloud deployment, and efficient problem solving.
              </p>
            </article>
            <article className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-xl shadow-slate-950/20">
              <FaChartLine className="h-8 w-8 text-sky-300" />
              <h3 className="mt-4 text-xl font-semibold text-white">Growth Journey</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Continuously learning new frameworks, participating in contests, and transforming ideas into powerful digital experiences.
              </p>
            </article>
          </div>
        </section>

        <section id="education" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Education</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Academic Excellence</h2>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 px-5 py-4 text-sm text-slate-300">
              Current CGPA: <span className="font-semibold text-white">8.6 / 10</span>
            </div>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_0.7fr]">
            <div className="space-y-6 rounded-[32px] border border-white/10 bg-slate-900/70 p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-400 to-teal-400 text-slate-950">
                  <FaGraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">B.Tech CSE-AIML</p>
                  <h3 className="text-2xl font-semibold text-white">LNCT Bhopal</h3>
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-300">
                Focused coursework in data structures, algorithms, OOP, DBMS, operating systems, networks, AI, machine learning, and deep learning.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'AI', 'Machine Learning', 'Deep Learning'].map((item) => (
                  <span key={item} className="rounded-3xl bg-slate-950/70 px-4 py-3 text-sm text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-[32px] border border-white/10 p-8 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Highlights</p>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
                <li className="flex items-start gap-3">
                  <FaStar className="mt-1 text-cyan-300" />
                  Achieved strong academic performance through AI-focused coursework and real-world applications.
                </li>
                <li className="flex items-start gap-3">
                  <FaAward className="mt-1 text-emerald-300" />
                  Completed several certifications and developed multiple AI-driven projects during degree.
                </li>
                <li className="flex items-start gap-3">
                  <FaBook className="mt-1 text-sky-300" />
                  Deep interest in research, system design, and building intelligent software that solves practical problems.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="skills" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Skills</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Technical Expertise</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Interactive skill levels that show strong capabilities across AI, web development, backend systems, databases, and modern tooling.
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="grid gap-4">
              {skills.map((skill) => (
                <div key={skill.name} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-white">{skill.name}</p>
                    <p className="text-sm text-slate-300">{skill.percent}%</p>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-teal-400" style={{ width: `${skill.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid gap-4 rounded-[32px] border border-white/10 bg-slate-900/70 p-8">
              <div className="flex items-center gap-4 text-slate-300">
                <SiPython className="h-8 w-8 text-yellow-400" />
                <p className="text-sm">Python · NumPy · Pandas · Scikit-learn · TensorFlow</p>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <SiReact className="h-8 w-8 text-sky-400" />
                <p className="text-sm">React.js · Next.js · Tailwind CSS · HTML · CSS</p>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <SiNodedotjs className="h-8 w-8 text-green-400" />
                <p className="text-sm">Node.js · Express.js · MongoDB · MySQL · REST APIs</p>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <SiOpenai className="h-8 w-8 text-white" />
                <p className="text-sm">AI/ML system design · Computer Vision · Predictive Analytics · Data Engineering</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Projects</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Premium Project Showcase</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              A selection of strategic AI, machine learning, and web development projects crafted for performance and recruiter impact.
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -8 }}
                className="glass-panel rounded-[32px] border border-white/10 p-6 shadow-xl shadow-slate-950/20"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Featured Project</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full bg-slate-900/70 px-3 py-2 text-xs uppercase tracking-[0.15em] text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 space-y-2 text-sm text-slate-300">
                  {project.features.map((feature) => (
                    <p key={feature} className="flex items-center gap-2">
                      <FaCheck className="text-emerald-400" /> {feature}
                    </p>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a href={project.demo} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105">
                    Live Demo <BiLinkExternal />
                  </a>
                  <a href={project.github} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/5">
                    GitHub <SiGithub />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="achievements" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Achievements</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Performance Metrics</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Demonstrating the scale of work, certifications, and competitive coding readiness recruiters want to see.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[28px] bg-slate-900/70 p-6 text-center shadow-xl shadow-slate-950/20">
                <p className="text-4xl font-semibold text-white">{stat.value}+</p>
                <p className="mt-3 text-sm uppercase tracking-[0.25em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="coding" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Coding Profiles</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Competitive Programming Presence</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              High-value coding and open-source presence across LeetCode, CodeChef, HackerRank, and GitHub.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
  {
    platform: "LeetCode",
    icon: SiLeetcode,
    username: "@dhirubhai76",
    stat: "90+ problems",
    link: "https://leetcode.com/u/dhirubhai76/",
  },
  {
    platform: "Coding Ninjas",
    icon: SiCodechef,
    username: "@dhiraj_gupta",
    stat: "3-star coder",
    link: "https://www.codechef.com/users/dhiraj_gupta",
  },
  {
    platform: "HackerRank",
    icon: SiHackerrank,
    username: "@dhiraj_gupta",
    stat: "Data Structures badge",
    link: "https://www.hackerrank.com/profile/dhirubhaig413",
  },
  {
    platform: "GitHub",
    icon: FaGithub,
    username: "@DHIRUBHAIG",
    stat: "Active open-source work",
    link: "https://github.com/DHIRUBHAIG",
  },
].map((profile) => {
              const Icon = profile.icon;
              return (
             
  <a
    key={profile.platform}
    href={profile.link}
    target="_blank"
    rel="noopener noreferrer"
    className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-xl shadow-slate-950/20 block transition hover:scale-105 hover:border-cyan-400/40"
  >
    <div className="flex items-center gap-4">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900/70 text-cyan-300">
        <Icon className="h-6 w-6" />
      </span>

      <div>
        <p className="text-base font-semibold text-white">
          {profile.platform}
        </p>
        <p className="text-sm text-slate-400">
          {profile.username}
        </p>
      </div>
    </div>

    <p className="mt-5 text-sm leading-7 text-slate-300">
      {profile.stat}
    </p>
  </a>
);
              
            })}
          </div>
        </section>

        <section id="certifications" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Certifications</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Industry Certifications</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Recognized credentials in machine learning, Python, data science, and AI fundamentals.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {certifications.map((cert) => (
              <div key={cert.title} className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">{cert.date}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{cert.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{cert.org}</p>



                {/* <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  View Certificate <BiLinkExternal />
                </button> */}

 <a
  href={cert.link}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
>
  View Certificate <BiLinkExternal />
</a>               








              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Experience</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Internships & Leadership</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              A balanced profile of internship experience, freelance delivery, campus leadership, and tech events.
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {experiences.map((item) => (
              <div key={item.title} className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-xl shadow-slate-950/20">
                <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-900/70 px-4 py-3 text-slate-300">
                  <FaBriefcase className="h-5 w-5 text-cyan-300" />
                  <span className="uppercase tracking-[0.2em] text-[0.72rem]">{item.duration}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.role}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-teal-400" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Services</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">What I Can Do</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Versatile service offerings for startups, internships, and enterprise-grade AI/web development projects.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { icon: FaLaptopCode, title: 'Web Development', desc: 'Responsive UX, modern frontend, polished brand websites.' },
              { icon: AiOutlineCloudServer, title: 'AI/ML Solutions', desc: 'ML pipelines, prediction systems, computer vision, NLP.' },
              { icon: FaCloud, title: 'Backend Development', desc: 'APIs, server architecture, Node.js, Express, database design.' },
              { icon: FaDatabase, title: 'Database Design', desc: 'MySQL, MongoDB, data modeling, performance optimization.' },
              { icon: FaTools, title: 'Technical Consulting', desc: 'Product planning, prototype strategy, cloud readiness.' },
              { icon: FaRocket, title: 'Product Launch Support', desc: 'Deployment, performance tuning, modern launch workflows.' },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-xl shadow-slate-950/20">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900/70 text-cyan-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="testimonials" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Testimonials</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">What Others Say</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Feedback from mentors, faculty, and teammates that reinforces professionalism, technical skill, and leadership.
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              { quote: 'Dhiraj delivered high-quality solutions with strong attention to AI detail and product polish.', author: 'Prof. Anuj, LNCT' },
              { quote: 'A fast learner who translates complex algorithms into real systems with great teamwork.', author: 'Mentor, AI Club' },
              { quote: 'His leadership and coding skills made our hackathon submission stand out in performance and design.', author: 'Team Member' },
            ].map((item) => (
              <div key={item.author} className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-xl shadow-slate-950/20">
                <FaQuoteLeft className="h-6 w-6 text-cyan-300" />
                <p className="mt-5 text-sm leading-7 text-slate-300">{item.quote}</p>
                <p className="mt-6 text-sm font-semibold text-white">{item.author}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="blog" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Blog</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Insights & Articles</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Thoughtful career writing and technical commentary focused on AI, machine learning, programming, and growth.
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {blogs.map((post) => (
              <article key={post.title} className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-xl shadow-slate-950/20">
                <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/70 px-3 py-2 text-xs uppercase tracking-[0.25em] text-cyan-300">
                  {post.category}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{post.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{post.tag} article for learners, coders, and AI builders.</p>
                <a href="https://en.wikipedia.org/wiki/Artificial_intelligence" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-100">
                  Read More <BiLinkExternal />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="resume" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Resume</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Preview & Download</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="Dhiraj-Kumar-Gupta-Resume.pdf" target="_blank" rel="noreferrer" className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                Download PDF
              </a>
              <a href="/Dhiraj-Kumar-Gupta-Resume.pdf" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5">
                View Full Resume
              </a>
            </div>
          </div>
          <div className="mt-8 rounded-[32px] border border-white/10 bg-slate-900/70 p-8">
            <p className="text-sm leading-7 text-slate-300">
              Resume sections include academic achievements, AI projects, technical skills, certifications, and leadership roles designed to make a strong impression during placement and internship evaluations.
            </p>
          </div>
        </section>

        <section id="contact" className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Contact</p>
              <h2 className="text-3xl font-semibold text-white">Start a new project or internship opportunity</h2>
              <p className="max-w-xl text-sm leading-7 text-slate-300">
                I&apos;m available for internships, freelance collaborations, and research support. Let&apos;s connect to build AI-enabled software, web experiences, or competitive technical solutions.
              </p>
              <div className="space-y-4 rounded-[32px] border border-white/10 bg-slate-900/70 p-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <FaEnvelope className="h-5 w-5 text-cyan-300" />
                  <span>dhirajkumarg413@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <FaNetworkWired className="h-5 w-5 text-teal-300" />
                  <span>91+ 7631746503</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <FaLock className="h-5 w-5 text-sky-300" />
                  <span>Open for internships, training, and collaborative AI initiatives.</span>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>

        <footer className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 text-slate-300 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Footer</p>
              <p className="mt-4 text-lg font-semibold text-white">Designed and Developed by Dhiraj Kumar Gupta</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <a href="#hero" className="hover:text-white">Home</a>
              <a href="https://github.com/DHIRUBHAIG/smart_vehicle_number_plate_detection" className="hover:text-white">Projects</a>
              <a href="https://www.linkedin.com/in/dhiraj-kumar-gupta76/" className="hover:text-white">Contact</a>
              <a href="Dhiraj-Kumar-Gupta-Resume.pdf" className="hover:text-white">Resume</a>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Dhiraj Kumar Gupta. All rights reserved.</p>
            <p>Crafted for AI, ML, software development, and internship success.</p>
          </div>
        </footer>
      </div>
      <a href="#hero" className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-2xl shadow-cyan-400/20 transition hover:scale-105">
        <FaChevronUp className="h-5 w-5" />
      </a>
    </main>
  );
}
