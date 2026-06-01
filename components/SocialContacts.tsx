'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';

interface SocialLink {
  name: string;
  icon: React.ComponentType<any>;
  url: string;
  color: string;
  bgColor: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/DHIRUBHAIG', // Update with your GitHub
    color: 'hover:text-slate-400',
    bgColor: 'hover:bg-slate-700/50',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/dhiraj-kumar-gupta76/', // Update with your LinkedIn
    color: 'hover:text-blue-400',
    bgColor: 'hover:bg-blue-900/30',
  },
  {
    name: 'LeetCode',
    icon: SiLeetcode,
    url: 'https://leetcode.com/u/dhirubhai76/', // Update with your LeetCode
    color: 'hover:text-yellow-400',
    bgColor: 'hover:bg-yellow-900/30',
  },
  {
    name: 'GeeksforGeeks',
    icon: SiGeeksforgeeks,
    url: 'https://geeksforgeeks.org/user/yourusername', // Update with your GFG
    color: 'hover:text-green-400',
    bgColor: 'hover:bg-green-900/30',
  },
  {
    name: 'Email',
    icon: FaEnvelope,
    url: 'mailto:dheerajkumarg413@gmail.com',
    color: 'hover:text-red-400',
    bgColor: 'hover:bg-red-900/30',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function SocialContacts() {
  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
    >
      <motion.h3 
        className="text-2xl font-semibold text-white"
        variants={itemVariants}
      >
        Connect With Me
      </motion.h3>

      <motion.p
        className="text-center text-slate-400 max-w-md"
        variants={itemVariants}
      >
        Find me on these platforms to collaborate, connect, or just say hello!
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-4"
        variants={containerVariants}
      >
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={link.name}
              className={`relative flex items-center justify-center w-14 h-14 rounded-full border border-white/20 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 ${link.bgColor} ${link.color}`}
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              {/* Animated background glow on hover */}
              <motion.div
                className={`absolute inset-0 rounded-full opacity-0 blur-md -z-10 transition-opacity ${link.bgColor}`}
                whileHover={{ opacity: 1 }}
              />
              <Icon className="text-xl" />
            </motion.a>
          );
        })}
      </motion.div>

      <motion.p
        className="text-xs text-slate-500 text-center mt-4"
        variants={itemVariants}
      >
        Or fill out the contact form above to send me a direct message
      </motion.p>
    </motion.div>
  );
}
