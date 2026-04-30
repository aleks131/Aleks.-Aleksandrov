"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaBriefcase,
  FaGraduationCap,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaRocket,
  FaChevronRight,
} from "react-icons/fa";
import SectionTitle from "./shared/SectionTitle";

// ── Types ──────────────────────────────────────────────────────────
interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  type: "work" | "education";
  skills?: string[];
  achievements?: string[];
  gradient: string;
  highlight?: boolean;
  badgeText?: string;
  metric?: { value: string; label: string };
}

// ── Animated Counter ───────────────────────────────────────────────
const AnimatedMetric = ({
  value,
  label,
  gradient,
}: {
  value: string;
  label: string;
  gradient: string;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center py-3 px-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
    >
      <motion.span
        className={`text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}
        initial={{ y: 20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {value}
      </motion.span>
      <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mt-1">
        {label}
      </span>
    </motion.div>
  );
};

// ── Skill Chip with stagger ────────────────────────────────────────
const SkillChip = ({
  name,
  delay,
  gradient,
}: {
  name: string;
  delay: number;
  gradient: string;
}) => (
  <motion.span
    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-600/40 shadow-sm hover:shadow-md transition-shadow"
    initial={{ opacity: 0, y: 10, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay, type: "spring", stiffness: 200 }}
    whileHover={{
      scale: 1.1,
      y: -2,
      transition: { duration: 0.15 },
    }}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`}
    />
    {name}
  </motion.span>
);

// ── Timeline Card with 3D tilt ─────────────────────────────────────
const TimelineCard = ({
  item,
  index,
  isActive,
}: {
  item: ExperienceItem;
  index: number;
  isActive: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  // Alternate entrance direction
  const slideFrom = index % 2 === 0 ? -60 : 60;

  return (
    <motion.div
      ref={inViewRef}
      className="relative pl-16 md:pl-24 pb-6 last:pb-0 group"
      initial={{ opacity: 0, x: slideFrom, rotateY: index % 2 === 0 ? -5 : 5 }}
      animate={
        inView
          ? { opacity: 1, x: 0, rotateY: 0 }
          : {}
      }
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* ── Timeline dot with ripple ── */}
      <div className="absolute left-0 md:left-5 top-6 z-20">
        {/* Ripple rings */}
        {isActive && (
          <>
            <motion.div
              className={`absolute inset-0 w-10 h-10 -m-1 rounded-full bg-gradient-to-r ${item.gradient} opacity-20`}
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className={`absolute inset-0 w-10 h-10 -m-1 rounded-full bg-gradient-to-r ${item.gradient} opacity-10`}
              animate={{ scale: [1, 2.5, 1], opacity: [0.2, 0, 0.2] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5,
              }}
            />
          </>
        )}

        <motion.div
          className={`relative w-8 h-8 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg cursor-pointer`}
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 15,
            delay: index * 0.12 + 0.15,
          }}
          whileHover={{ scale: 1.3, rotate: 15 }}
        >
          {item.type === "work" ? (
            <FaBriefcase className="text-white text-[10px]" />
          ) : (
            <FaGraduationCap className="text-white text-xs" />
          )}
        </motion.div>
      </div>

      {/* ── Card with 3D tilt ── */}
      <div style={{ perspective: "1000px" }}>
        <motion.div
          ref={cardRef}
          className={`relative rounded-2xl overflow-hidden border transition-all duration-300 ${
            item.highlight
              ? "border-blue-500/20 dark:border-blue-400/20 shadow-xl"
              : "border-gray-200/80 dark:border-gray-700/50 shadow-lg"
          } bg-white dark:bg-gray-900/90 backdrop-blur-sm`}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.15s ease-out",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            boxShadow: "0 25px 60px -12px rgba(0,0,0,0.2)",
          }}
        >
          {/* ── Animated gradient border glow ── */}
          <motion.div
            className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-500 -z-10`}
          />

          {/* ── Header ── */}
          <div
            className={`relative px-6 py-5 bg-gradient-to-r ${item.gradient} overflow-hidden`}
          >
            {/* Animated light sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
              initial={{ x: "-100%" }}
              whileInView={{ x: "200%" }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: index * 0.12 + 0.4,
                ease: "easeInOut",
              }}
            />

            {/* Floating particles in header */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}

            <div className="relative z-10 flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-1.5 text-white/85 text-sm">
                  <FaBuilding className="text-white/60 text-xs" />
                  <span className="font-medium">{item.company}</span>
                </div>
              </div>

              {item.badgeText && (
                <motion.span
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white border border-white/30 shadow-inner"
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    delay: 0.5,
                  }}
                >
                  <FaRocket className="text-[9px]" />
                  {item.badgeText}
                </motion.span>
              )}
            </div>

            <div className="relative z-10 flex items-center gap-4 mt-3 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-[10px]" />
                {item.location}
              </span>
              <span className="flex items-center gap-1 bg-white/15 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                <FaCalendarAlt className="text-[10px]" />
                {item.duration}
              </span>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="px-6 py-5">
            {/* Key metric callout */}
            {item.metric && (
              <div className="mb-4 -mx-2">
                <div
                  className={`bg-gradient-to-r ${item.gradient} bg-opacity-5 rounded-xl p-1`}
                  style={{
                    background: `linear-gradient(135deg, rgba(99,102,241,0.05), rgba(139,92,246,0.05))`,
                  }}
                >
                  <AnimatedMetric
                    value={item.metric.value}
                    label={item.metric.label}
                    gradient={item.gradient}
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <ul className="space-y-2.5">
              {item.description.map((desc, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <motion.span
                    className="mt-2 flex-shrink-0"
                    whileHover={{ scale: 1.5 }}
                  >
                    <FaChevronRight
                      className={`text-[8px] bg-clip-text`}
                      style={{
                        color:
                          item.gradient.includes("blue")
                            ? "#3b82f6"
                            : item.gradient.includes("purple")
                            ? "#8b5cf6"
                            : item.gradient.includes("cyan")
                            ? "#06b6d4"
                            : "#6b7280",
                      }}
                    />
                  </motion.span>
                  <span>{desc}</span>
                </motion.li>
              ))}
            </ul>

            {/* Skills */}
            {item.skills && item.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {item.skills.map((skill, i) => (
                  <SkillChip
                    key={skill}
                    name={skill}
                    delay={0.3 + i * 0.04}
                    gradient={item.gradient}
                  />
                ))}
              </div>
            )}

            {/* Achievements */}
            {item.achievements && item.achievements.length > 0 && (
              <div className="pt-4 space-y-2">
                {item.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.3 }}
                      transition={{ duration: 0.4 }}
                    >
                      <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0 text-xs" />
                    </motion.div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ── Main Component ─────────────────────────────────────────────────
const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { ref: sectionInViewRef, inView: sectionInView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  // Scroll-linked progress for the timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawProgress = useTransform(scrollYProgress, [0.1, 0.85], [0, 100]);
  const lineHeight = useSpring(rawProgress, { stiffness: 80, damping: 20 });
  const lineHeightPercent = useTransform(lineHeight, (v) => `${v}%`);

  // Track which card is "active" based on scroll
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      Math.floor(v * 6),
      4
    );
    setActiveIndex(idx);
  });

  const { scrollYProgress: bgProgress } = useScroll();
  const y1 = useTransform(bgProgress, [0, 1], [0, -80]);
  const y2 = useTransform(bgProgress, [0, 1], [0, -120]);

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Student Assistant — Commercial Analytics",
      company: "Salling Group",
      location: "Denmark",
      duration: "07/2025 – 01/2026",
      description: [
        "Designed and deployed a computer vision + OCR automation pipeline (Python, YOLO, Tesseract) processing 3,000+ labels per batch",
        "Structured a modular batch workflow (detection → OCR → preprocessing → structured output) enabling scalability",
        "Developed Python-based automation tools and automated job pipelines in Azure ML Studio",
        "Contributed to KPI dashboard development in Power BI, collaborating with data scientists and stakeholders",
      ],
      skills: [
        "Python",
        "YOLO",
        "Tesseract OCR",
        "EasyOCR",
        "Azure ML Studio",
        "Power BI",
        "Computer Vision",
      ],
      achievements: [
        "Reduced extraction time from ~2 weeks to 3–4 days per batch",
        "Implemented automated job validation mapping business requirements to technical execution",
      ],
      type: "work",
      gradient: "from-blue-600 to-cyan-500",
      highlight: true,
      badgeText: "Latest Role",
      metric: { value: "3,000+", label: "Labels processed per batch" },
    },
    {
      id: 2,
      title: "Intern — Trade Planning & Pricing",
      company: "Salling Group",
      location: "Denmark",
      duration: "02/2025 – 06/2025",
      description: [
        "Contributed to migration of legacy reporting scripts to SAP DataSphere, ensuring data integrity",
        "Automated reporting processes using SAP DataSphere, SQL, and R, reducing manual effort",
        "Supported testing and validation of migrated workflows under the new system structure",
      ],
      skills: [
        "SAP DataSphere",
        "SQL",
        "R",
        "Process Automation",
        "System Migration",
      ],
      achievements: [
        "Improved analytical reliability through automated reporting workflows",
        "Ensured data consistency throughout enterprise system transition",
      ],
      type: "work",
      gradient: "from-indigo-600 to-blue-500",
      highlight: true,
      metric: { value: "100%", label: "Data integrity maintained" },
    },
    {
      id: 3,
      title: "Production Assistant & Internal Systems",
      company: "Salling Group",
      location: "Denmark",
      duration: "03/2022 – 02/2025",
      description: [
        "Designed and deployed three internal full-stack web applications (Next.js + Node.js) replacing paper-based workflows",
        "Led operational shifts of 10+ team members in a high-volume warehouse environment",
        "Identified process inefficiencies and implemented structured technical improvements",
      ],
      skills: [
        "Next.js",
        "Node.js",
        "JavaScript",
        "Full-Stack",
        "Leadership",
      ],
      achievements: [
        "Eliminated ~100 printed pages/week — all 3 apps still in active production 1+ year later",
        "Bridged hands-on operations with systematic digital solutions",
      ],
      type: "work",
      gradient: "from-cyan-600 to-teal-500",
      highlight: true,
      metric: { value: "3 Apps", label: "Running in production" },
    },
    {
      id: 4,
      title: "BSc Global Business Engineering — Software Technology",
      company: "VIA University College",
      location: "Denmark",
      duration: "Aug 2021 – Jan 2026",
      description: [
        "Software & Systems — Software Engineering, .NET, Web Development, SAP ABAP, Database Systems",
        "Data & Analytics — Data Analytics Infrastructure, Business Intelligence, Data Analysis",
        "Business & Management — Product Management, Project Management, Strategy, Innovation",
      ],
      skills: [
        "Software Engineering",
        "Database Systems",
        "SAP ABAP",
        "Data Analytics",
        ".NET",
      ],
      achievements: [
        "Bachelor Project: Smart Gallery System — Automated Presentation Device",
        "Graduated January 2026",
      ],
      type: "education",
      gradient: "from-purple-600 to-indigo-500",
      badgeText: "Graduated",
    },
    {
      id: 5,
      title: "Earlier Experience & Education",
      company: "Various — Bulgaria",
      location: "Bulgaria",
      duration: "2016 – 2020",
      description: [
        "Developed resilience and adaptability across hospitality and construction roles",
        "Graduated Vasil Drumev High School (Mathematics & English specialization) — Veliko Tarnovo",
      ],
      type: "work",
      gradient: "from-gray-500 to-gray-600",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 relative overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-700/8 rounded-full filter blur-[120px]"
          style={{ y: y1, x: -50 }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-700/8 rounded-full filter blur-[120px]"
          style={{ y: y2, x: 50 }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(99,102,241,0.2) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div ref={sectionInViewRef}>
          <SectionTitle
            title="Experience & Education"
            subtitle="From warehouse operations to commercial analytics — a progressive journey building production-grade systems within Salling Group."
          />
        </div>

        {/* ── Scroll Progress Indicator ── */}
        <div className="hidden md:flex justify-center mb-8">
          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  i <= activeIndex
                    ? `bg-gradient-to-r ${exp.gradient} shadow-md`
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                whileHover={{ scale: 1.5 }}
                title={exp.title}
              />
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-medium">
              {activeIndex + 1}/{experiences.length}
            </span>
          </motion.div>
        </div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative max-w-3xl mx-auto">
          {/* Animated vertical line with scroll-linked fill */}
          <div className="absolute left-[15px] md:left-[36px] top-0 bottom-0 w-[2px] bg-gray-200/50 dark:bg-gray-700/30 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 rounded-full origin-top"
              style={{ height: lineHeightPercent }}
            />
          </div>

          {/* Cards */}
          {experiences.map((item, index) => (
            <TimelineCard
              key={item.id}
              item={item}
              index={index}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;