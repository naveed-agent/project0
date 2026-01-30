"use client";

import React, { useState, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Typewriter from 'typewriter-effect';
import * as THREE from 'three';

// --- Interfaces ---
interface Experience {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

interface ProjectTag {
  name: string;
  color: string;
}

interface Project {
  name: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  source_code_link: string;
}

// --- 3D Background Components ---
const StarsBackground = () => {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000 * 3; i++) pos[i] = (Math.random() - 0.5) * 10;
    return pos;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.003} sizeAttenuation depthWrite={false} />
    </Points>
  );
};

const MovingGalaxy = () => {
  const ref = useRef<THREE.Points>(null!);
  const [positions, colors] = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorInside = new THREE.Color("#f7d794");
    const colorOutside = new THREE.Color("#915eff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 1.5;
      const spinAngle = radius * 5;
      const branchAngle = ((i % 3) * Math.PI * 2) / 3;
      const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3) * radius;
      const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3) * radius;
      const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3) * radius;

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY * 0.5;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone().lerp(colorOutside, radius / 1.5);
      col[i3] = mixedColor.r; col[i3 + 1] = mixedColor.g; col[i3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => { ref.current.rotation.y += delta * 0.15; });

  return (
    <group position={[-1.2, 0, -0.5]} rotation={[0.4, 0, 0.2]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3}>
        <PointMaterial vertexColors transparent opacity={0.8} size={0.008} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};

const RealisticMoon = () => (
  <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
    <mesh position={[1.2, 0, -0.2]}>
      <sphereGeometry args={[0.25, 64, 64]} />
      <meshStandardMaterial color="#e1e1e1" roughness={0.8} metalness={0.1} />
      <pointLight intensity={2} color="#ffffff" distance={5} />
    </mesh>
  </Float>
);

// --- Main Portfolio Component ---
export default function PortfolioPage() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const experiences: Experience[] = [
    {
      title: "Senior AI Developer",
      company_name: "Tech Solutions Inc.",
      icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
      iconBg: "#383E56",
      date: "March 2023 - Present",
      points: [
        "Developing and maintaining AI agents using OpenAI and LangChain.",
        "Collaborating with cross-functional teams to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback.",
      ],
    },
    {
      title: "Next.js Developer",
      company_name: "Web Wizards",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      iconBg: "#E6DEDD",
      date: "Jan 2022 - Feb 2023",
      points: [
        "Built dynamic web applications using Next.js and Tailwind CSS.",
        "Optimized website performance for maximum speed and scalability.",
        "Integrated RESTful APIs and handled state management with Redux.",
      ],
    },
  ];

  const projects: Project[] = [
    {
      name: "AI SaaS Platform",
      description: "A comprehensive AI platform that allows users to generate high-quality content and images using GPT-4 models.",
      tags: [
        { name: "nextjs", color: "text-blue-400" },
        { name: "mongodb", color: "text-green-400" },
        { name: "tailwind", color: "text-pink-400" },
      ],
      image: "/my-portfolio.png",
      source_code_link: "https://github.com/naveed-agent/my-portfolio"
    },
    {
      name: "E-Commerce App",
      description: "Full-stack e-commerce solution with Stripe integration, real-time inventory tracking, and admin dashboard.",
      tags: [
        { name: "react", color: "text-cyan-400" },
        { name: "restapi", color: "text-green-400" },
        { name: "scss", color: "text-pink-400" },
      ],
      image: "/e-commerce.png",
      source_code_link: "https://github.com/naveed-agent/e-commerce",
    },
    {
      name: "Task Management",
      description: "A collaborative tool for teams to manage tasks, set deadlines, and track progress with interactive charts.",
      tags: [
        { name: "nextjs", color: "text-blue-400" },
        { name: "supabase", color: "text-emerald-400" },
        { name: "framer", color: "text-orange-400" },
      ],
      image: "/AI WEB APPLICATION.png",
      source_code_link: "https://github.com/naveed-agent/AI WEB APPLICATION",
    },
  ];

  const socialLinks = [
    { name: 'WhaAtsApp', url: 'https://wa.me/923177045793', color: 'hover:text-green-400' },
    { name: 'LinAAkedIn', url: 'https://linkedin.com/in/arsalanzafar', color: 'hover:text-blue-400' },
    { name: 'GitHub', url: 'https://github.com/naveed-agent', color: 'hover:text-white' },
    { name: 'Instagram', url: 'https://www.instagram.com/chmohsin.bhowana?igsh=ZXg3dDE2bzRqaXJp%22_source=qr', color: 'hover:text-pink-400' },
  ];

  const services = [
    {
      title: "Generative AI Developer",
      desc: "Generative AI Developer creating interactive and user-friendly AI integrated websites.",
      icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
      gradient: "linear-gradient(to bottom right, #06b6d4, #a855f7)"
    },
    {
      title: "Next Js Developer",
      desc: "Next.js developer building dynamic and responsive web applications with React.",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      gradient: "linear-gradient(to bottom right, #34d399, #06b6d4)"
    },
    {
      title: "Backend Developer",
      desc: "Backend developer creating server-side solutions using Fastapi and Postgres.",
      icon: "https://cdn-icons-png.flaticon.com/512/2165/2165004.png",
      gradient: "linear-gradient(to bottom right, #a855f7, #ec4899)"
    },
    {
      title: "React Js Developer",
      desc: "React.js developer crafting engaging and responsive user interfaces with tailwindcss.",
      icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
      gradient: "linear-gradient(to bottom right, #3b82f6, #6366f1)"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-slate-200 font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* --- NAVIGATION BAR (GLOBAL & STICKY) --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#050816]/50 backdrop-blur-lg border-b border-white/5">
        <div className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
          <div className="text-xl font-black tracking-tighter text-white cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            AI <span className="text-cyan-500">.</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <button onClick={() => scrollToSection('about')} className="text-[10px] md:text-xs font-bold tracking-widest text-slate-300 hover:text-cyan-400 transition uppercase">About</button>
            <button onClick={() => scrollToSection('work')} className="text-[10px] md:text-xs font-bold tracking-widest text-slate-300 hover:text-cyan-400 transition uppercase">Work</button>
            <button onClick={() => scrollToSection('contact')} className="text-[10px] md:text-xs font-bold tracking-widest text-slate-300 hover:text-cyan-400 transition uppercase">Contact</button>

            <div className="relative">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/10 transition flex items-center gap-2 text-white"
              >
                GET IN TOUCH
                <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#0b0e1a] border border-white/10 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl z-50">
                  {socialLinks.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`block px-4 py-3 text-sm font-medium text-slate-400 rounded-xl transition-all ${link.color} hover:bg-white/5`}>
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div 
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: "url('/14.JPG')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#050816]/75 z-0"></div>

        <div className="relative z-10 w-full pt-20">
          <div className="flex flex-col md:flex-row-reverse items-center justify-center px-8 max-w-7xl mx-auto gap-10 md:gap-20">
            
            {/* PHOTO BOX - Updated to be Transparent and Multi-line Name */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75 }}>
              <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05}>
                <div className="w-[280px] h-[320px] md:w-[400px] md:h-[450px] flex justify-center items-center rounded-2xl border border-white/10 bg-transparent p-[1px] shadow-[0_20px_50px_rgba(145,94,255,0.1)]">
                  <div className="w-full h-full bg-transparent rounded-2xl flex flex-col justify-center items-center overflow-hidden p-4">
                    <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center">
                      <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-bold tracking-widest uppercase">Next Gen AI Automation</div>
                      <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-transparent flex items-center justify-center border-4 border-[#915eff]/50 overflow-hidden mb-4 shadow-lg shadow-purple-500/20">
                        <img src="/007.jpg" alt="MOHSIN BHOWANA" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-center">
                        <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-white leading-tight uppercase">MOHSIN BHOWANA</h1>
                        <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 leading-tight uppercase"></h1>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Tilt>
            </motion.div>

            {/* TEXT CONTENT */}
            <div className="flex-1 text-center md:text-left">
              <motion.div initial={{ opacity: 0, x: -510 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75 }}>
               <h2 className="text-white font-bold text-3xl">
 
                    Hi, I'm <span className="text-[#915eff]">MOHSIN</span>
                </h2>
                <div className="text-white font-bold text-12xl md:text-14xl min-h-[150px]">
                  <Typewriter options={{ strings: ['Generative AI Developer', 'Next.js Developer', 'Backend Specialist'], autoStart: true, loop: true, wrapperClassName: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500" }} />
                </div>
                <p className="pt-6 max-w-xl md:mx-0 mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-8">
  Building intelligent workflows that scale. I bridge the gap between
  <span className="text-white font-medium"> complex AI models </span>
  and real-world business automation.
</p>

                <button onClick={() => scrollToSection('worTYIk')} className="bg-[#915eff] hover:bg-[#7a49e0] text-white px-18 py-33 rounded-full font-bold transition-all shadow-lg shadow-purple-50/2">
                    View My Work
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* --- ABOUT SECTION --- */}
      <section 
        id="about" 
        className="relative py-12 overflow-hidden"
        style={{
          backgroundImage: "url('/12.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[#050816]/90 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20">
          <div className="max-w-4xl">
             <p className="text-cyan-500 uppercase tracking-[0.3em] text-xs font-bold mb-4">Get to know me</p>
             <h2 className="text-white text-5xl md:text-7xl font-extrabold mb-10 tracking-tight">Overview<span className="text-cyan-500">.</span></h2>
             <p className="text-slate-300 text-lg md:text-2xl leading-relaxed font-light">
              I'm a skilled <span className="text-white font-semibold">Generative AI developer</span> specialist building robust systems with FastAPI and Next.js. I focus on creating seamless user experiences powered by intelligent backends.
             </p>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {services.map((service, index) => (
              <Tilt key={index} scale={1.02} className="flex">
                <div className="w-full p-[1px] rounded-[20px]" style={{ background: service.gradient }}>
                  <div className="bg-[#0b0e1a]/80 backdrop-blur-md rounded-[20px] py-10 px-6 flex-1 min-h-[340px] flex flex-col items-center justify-center border border-white/5">
                    <div className="p-4 bg-white/5 rounded-2xl mb-6"><img src={service.icon} alt={service.title} className="w-12 h-12 object-contain" /></div>
                    <h3 className="text-white text-xl font-bold text-center mb-4">{service.title}</h3>
                    <p className="text-slate-400 text-sm text-center leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* --- WORK SECTION --- */}
      <section 
        id="work" 
        className="relative py-32 overflow-hidden border-t border-white/5"
        style={{
          backgroundImage: "url('/11.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[#050816]/95 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-slate-500 uppercase tracking-[0.3em] text-xs font-bold mb-4">What I have done so far</p>
            <h2 className="text-white text-5xl md:text-7xl font-extrabold mb-20 tracking-tight">Work Experience<span className="text-cyan-500">.</span></h2>
          </motion.div>

          <div className="relative mb-32">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-slate-800 rounded-full"></div>
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-[45%] pl-12 md:pl-0">
                    <motion.div 
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="bg-[#1d1836]/90 backdrop-blur-md p-8 rounded-2xl border-b-[6px] border-[#232631] shadow-2xl relative"
                    >
                      <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">{exp.date}</span>
                      <h3 className="text-white text-2xl font-bold mt-2">{exp.title}</h3>
                      <p className="text-slate-400 text-sm font-semibold mb-4 italic">{exp.company_name}</p>
                      <ul className="list-disc ml-5 space-y-2">
                        {exp.points.map((point, idx) => (
                          <li key={idx} className="text-slate-300 text-sm leading-relaxed">{point}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#E6DEDD] border-4 border-[#232631] flex items-center justify-center z-20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                     <img src={exp.icon} alt="icon" className="w-[60%] h-[60%] object-contain grayscale-[0.5]" />
                  </div>
                  <div className="hidden md:block w-[45%]"></div>
                </div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-white text-5xl md:text-7xl font-extrabold mb-10 tracking-tight">Projects<span className="text-cyan-500">.</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project: Project, index: number) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }} viewport={{ once: true }}>
                <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.02} className="bg-[#1d1836]/90 backdrop-blur-md p-5 rounded-2xl h-full border border-white/5 hover:border-cyan-500/30 transition-all shadow-2xl">
                  <div className="relative w-full h-[230px]">
                    <img src={project.image} alt={project.image} className="w-full h-full object-cover rounded-2xl" />
                  </div>
                  <div className="mt-5">
                    <h3 className="text-white font-bold text-[24px]">{project.image}</h3>
                    <p className="mt-2 text-slate-400 text-[14px] leading-relaxed line-clamp-3">{project.description}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <p key={tag.name} className={`text-[14px] font-medium ${tag.color}`}>#{tag.name}</p>
                    ))}
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION - Updated to Transparent --- */}
      <section id="contact" className="relative w-full h-screen overflow-hidden bg-[#050816]">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
            <ambientLight intensity={0.4} />
            <Suspense fallback={null}>
              <StarsBackground />
              <MovingGalaxy />
              <RealisticMoon />
            </Suspense>
            <Preload all />
          </Canvas>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-transparent border border-white/20 p-10 rounded-3xl w-full max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-2 text-center">Contact Us</h2>
            <form className="flex flex-col gap-5 mt-8">
              <input type="text" placeholder="Your Name" className="bg-transparent border border-white/20 p-4 rounded-xl text-white outline-none focus:border-[#915eff]" />
              <input type="email" placeholder="Your Email" className="bg-transparent border border-white/20 p-4 rounded-xl text-white outline-none focus:border-[#915eff]" />
              <textarea placeholder="Your Message" rows={4} className="bg-transparent border border-white/20 p-4 rounded-xl text-white outline-none focus:border-[#915eff]" />
              <button type="submit" className="border border-[#915eff] text-[#915eff] font-bold py-4 rounded-xl hover:bg-[#915eff] hover:text-white transition-all">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-500 text-xs border-t border-white/5 bg-[#050816]">
        <div className="flex justify-center gap-6 mb-4">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className={`transition-colors ${s.color}`}>{s.name}</a>
          ))}
        </div>
        © 2026 MOHSIN BHOWANA. Built with Next.js & Framer Motion.
      </footer>
    </div>
  );
}