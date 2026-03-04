"use client";

import React, { useEffect, useState } from "react";
import collageLogo from "../../public/assets/images/college-logo.jpeg"
export default function LandingPage() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a12] text-[#f0f0f5] font-['Inter',sans-serif]">

            {/* ── Animated gradient background ── */}
            <div
                className="fixed inset-0 z-0 animate-[bgShift_12s_ease-in-out_infinite_alternate]"
                style={{
                    background: `
            radial-gradient(ellipse 80% 60% at 50% -20%, rgba(37,99,235,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(139,92,246,0.15) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(16,185,129,0.12) 0%, transparent 70%),
            #0a0a12
          `,
                }}
            />

            {/* ── Grid overlay ── */}
            <div
                className="fixed inset-0 z-1 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* ── Floating orbs ── */}
            <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-35 bg-linear-to-br from-indigo-500 to-violet-500 -top-[100px] -right-[80px] animate-[float_8s_ease-in-out_infinite]" />
            <div className="absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-35 bg-linear-to-br from-emerald-500 to-emerald-600 -bottom-[60px] -left-[60px] animate-[float_8s_ease-in-out_infinite_3s]" />
            <div className="absolute w-[250px] h-[250px] rounded-full blur-[100px] opacity-35 bg-linear-to-br from-amber-500 to-amber-600 top-[40%] left-[60%] animate-[float_8s_ease-in-out_infinite_6s]" />

            {/* ── Particles ── */}
            <div className="fixed inset-0 z-1 pointer-events-none overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/15 animate-[rise_linear_infinite]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            width: `${2 + Math.random() * 2}px`,
                            height: `${2 + Math.random() * 2}px`,
                            animationDuration: `${6 + Math.random() * 8}s`,
                            animationDelay: `${Math.random() * 6}s`,
                        }}
                    />
                ))}
            </div>

            {/* ── Main content ── */}
            <div className="relative z-2 text-center max-w-[900px] px-6 py-8">

                {/* College crest */}
                <div
                    className={`
            w-[110px] h-[110px] mx-auto mb-8 rounded-full
            bg-linear-to-br from-[#1e3a5f] to-blue-600
            flex items-center justify-center
            shadow-[0_0_60px_rgba(37,99,235,0.35),0_0_0_4px_rgba(255,255,255,0.08)]
            transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-[0.6]"}
          `}
                >
                    <img src={collageLogo.src} alt="Logo" className="font-['Playfair_Display',serif] font-extrabold text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] rounded-full"/>
                        
                </div>

                {/* Label */}
                <div
                    className={`
            inline-flex items-center gap-2 px-5 py-2 rounded-full
            bg-white/6 border border-white/10
            text-[0.8rem] tracking-[0.12em] uppercase text-white/70
            backdrop-blur-xl mb-8
            transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] delay-300
            ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          `}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulseDot_2s_ease-in-out_infinite]" />
                    Established Legacy of Excellence
                </div>

                {/* Title */}
                <h1
                    className={`
            font-['Playfair_Display',serif] font-extrabold
            text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.1] mb-6
            bg-linear-to-br from-white via-indigo-200 via-40% to-indigo-400
            bg-clip-text text-transparent
            transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] delay-500
            ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
                >
                    Amiruddaula Islamia
                    <br />
                    Degree College
                </h1>

                {/* Tagline */}
                <p
                    className={`
            text-[clamp(1rem,2.5vw,1.25rem)] text-white/55
            leading-relaxed max-w-[600px] mx-auto mb-12 font-normal
            transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] delay-700
            ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
                >
                    Empowering minds, shaping futures — a beacon of knowledge,
                    discipline, and academic excellence for generations.
                </p>

                {/* CTA buttons */}
                <div
                    className={`
            flex gap-4 justify-center flex-wrap
            transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] delay-900
            ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
                >
                    <a
                        href="/erp/login"
                        className="
              inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
              bg-linear-to-br from-indigo-500 to-violet-500
              text-white font-semibold text-base
              shadow-[0_4px_24px_rgba(99,102,241,0.35)]
              hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(99,102,241,0.5)]
              transition-all duration-300 no-underline
            "
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        ERP Login
                    </a>
                    
                </div>

                {/* Stats */}
                <div
                    className={`
            flex gap-5 justify-center flex-wrap mt-16
            transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] delay-1100
            ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
                >
                    {[
                        { number: "50+", label: "Years of Legacy" },
                        { number: "5K+", label: "Alumni Network" },
                        { number: "100+", label: "Expert Faculty" },
                        { number: "20+", label: "Programs Offered" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="
                px-6 py-5 rounded-2xl min-w-[150px]
                bg-white/4 border border-white/8
                backdrop-blur-2xl
                hover:bg-white/7 hover:border-white/15 hover:-translate-y-1
                transition-all duration-300
              "
                        >
                            <div className="font-['Playfair_Display',serif] text-3xl font-bold bg-linear-to-br from-indigo-300 to-indigo-500 bg-clip-text text-transparent mb-1">
                                {stat.number}
                            </div>
                            <div className="text-[0.8rem] text-white/45 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Keyframe styles (minimal, only for custom animations) ── */}

        </div>
    );
}
