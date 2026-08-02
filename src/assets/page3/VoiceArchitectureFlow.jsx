import React, { useEffect, useRef } from 'react';
import './VoiceArchitectureFlow.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// All x/y coordinates live here so the whole diagram can be
// re-tuned from one place instead of hunting through JSX.
// Canvas viewBox is 0 0 3200 500.
// ─────────────────────────────────────────────────────────────
const Y_TOP = 115;  // Local Backend branch (>=90%)
const Y_MID = 250;  // Exact vertical center of 500px container!
const Y_BOT = 385;  // Retry branch (<60%)

const POS = {
  step1Card: 150,   // User Voice Input
  dotA: 270,        // 20px gap after Step 1 right border (250 + 20)
  dotB: 460,        // 20px gap before Step 2 left border (480 - 20)

  step2Card: 580,   // AssemblyAI STT
  dotC: 700,        // 20px gap after Step 2 right border (680 + 20)

  step3Card: 990,   // ZentriXA Hybrid Engine (wide card width 220 => left 880, right 1100)
  dotD: 1120,       // 20px gap after Step 3 right border (1100 + 20)

  plusBranch: 1240, // decorative plus buttons before each branch

  branchDot: 1380,  // 20px gap before Branch cards left border (1400 - 20)
  branchCard: 1500, // Local Backend / LLM Fallback / Retry cards

  postDot: 1620,    // 20px gap after Branch cards right border (1600 + 20)
  postPlus: 1750,   // after top/mid branch cards
  convergeDot: 1880, // 20px gap before Step 4 left border (1900 - 20)

  step4Card: 2000,  // Text-to-Voice Conversion
  dotE: 2120,       // 20px gap after Step 4 right border (2100 + 20)
  dotF: 2430,       // 20px gap before Final Step left border (2450 - 20)

  finalCard: 2550   // Voice Execution Success
};

function VoiceArchitectureFlow() {
  const sectionRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const wrapper = scrollWrapperRef.current;
    if (!canvas || !section || !wrapper) return;

    // Dynamic scroll distance calculation to stop precisely when POS.finalCard centers
    const getScrollMax = () => {
      const wrapperWidth = wrapper.clientWidth;
      return Math.max(400, POS.finalCard - wrapperWidth / 2 + 120);
    };

    const horizontalTween = gsap.to(canvas, {
      x: () => -getScrollMax(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top+=70',
        end: () => '+=' + getScrollMax(),
        pin: true,
        pinType: 'transform',
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 1,
      },
    });

    // Draw every connector path as horizontal scroll passes over it
    const paths = canvas.querySelectorAll('.flow-path');
    const postDotAnchor = canvas.querySelector('.post-dot-anchor');

    paths.forEach((path, idx) => {
      const length = path.getTotalLength();

      // Path 1 (User Voice Input -> AssemblyAI STT) animates first on section reveal
      if (idx === 0) {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
        return;
      }

      // Path 2A & Path 2B (AssemblyAI STT -> Hybrid Engine) animate right after Path 1 reaches second card
      if (idx === 1 || idx === 2) {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: idx === 1 ? 0.8 : 0.4,
          ease: 'power2.out',
          delay: idx === 1 ? 1.0 : 1.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
        return;
      }

      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      // Synchronize post-branch paths (Path 6B reverse, 7B blue, 8B green) to animate together at postDot
      const triggerEl = path.classList.contains('path-post-trigger') && postDotAnchor ? postDotAnchor : path;

      if (path.classList.contains('path-converge')) {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: path,
            containerAnimation: horizontalTween,
            start: 'left right-=100',
            end: 'right center+=250',
            scrub: true,
          },
        });
        return;
      }

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: triggerEl,
          containerAnimation: horizontalTween,
          start: 'left right-=100',
          end: 'right center',
          scrub: true,
        },
      });
    });

    const revealElements = canvas.querySelectorAll('.flow-element');
    gsap.set(revealElements, { xPercent: -50, yPercent: -50 });

    revealElements.forEach((el) => {
      if (el.classList.contains('gs-reveal')) {
        gsap.from(el, {
          scale: 0.9,
          opacity: 0.5,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            containerAnimation: horizontalTween,
            start: 'left right-=50',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="voice-flow-section" ref={sectionRef}>
      <div className="voice-flow-header">
        <span className="voice-flow-badge">Architecture & Data Flow</span>
        <h3 className="voice-flow-title">Zentrixa-AI Voice-to-Action Decision Engine</h3>
      </div>

      <div className="voice-flow-wrapper-card">
        <div className="voice-scroll-container" ref={scrollWrapperRef}>
          <div className="voice-canvas" ref={canvasRef}>
            <svg className="flow-svg-layer" viewBox="0 0 2800 500">
              <defs>
                <linearGradient id="blueLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7B2FFF" />
                  <stop offset="100%" stopColor="#00D4FF" />
                </linearGradient>

                <linearGradient id="highConfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>

                <linearGradient id="midConfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="50%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#4ADE80" />
                </linearGradient>

                <linearGradient id="retryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>

                <linearGradient id="convergeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>

              {/* Path 1: dotA straight to dotB */}
              <path
                className="flow-path path-purple"
                d={`M ${POS.dotA} ${Y_MID} L ${POS.dotB} ${Y_MID}`}
              />

              {/* Path 2A: AssemblyAI -> Left Dot of Hybrid Engine */}
              <path className="flow-path path-purple" d={`M ${POS.dotC} ${Y_MID} L ${POS.step3Card - 130} ${Y_MID}`} />

              {/* Path 2B: Hybrid Engine Card Right Edge -> dotD */}
              <path className="flow-path path-purple" d={`M ${POS.step3Card + 110} ${Y_MID} L ${POS.dotD} ${Y_MID}`} />

              {/* Path 3: dotD -> Local Backend (>=90%) - Blue Line */}
              <path
                className="flow-path path-high-conf"
                d={`M ${POS.dotD} ${Y_MID} C ${POS.plusBranch} ${Y_MID}, ${POS.branchDot - 40} ${Y_TOP}, ${POS.branchCard - 130} ${Y_TOP}`}
              />
              <path
                className="flow-path path-high-conf"
                d={`M ${POS.branchCard - 130} ${Y_TOP} L ${POS.branchCard - 100} ${Y_TOP}`}
              />

              {/* Path 4: dotD -> Middle Branch Dot (60-89%) - Pure Green Line */}
              <path
                className="flow-path path-mid-conf"
                d={`M ${POS.dotD} ${Y_MID} L ${POS.branchCard - 130} ${Y_MID}`}
              />


              {/* Path 5: dotD -> Retry (<60%) - Orange Line */}
              <path
                className="flow-path path-retry-out"
                d={`M ${POS.dotD} ${Y_MID} C ${POS.plusBranch} ${Y_MID}, ${POS.branchDot - 40} ${Y_BOT}, ${POS.branchCard - 130} ${Y_BOT}`}
              />
              <path
                className="flow-path path-retry-out"
                d={`M ${POS.branchCard - 130} ${Y_BOT} L ${POS.branchCard - 100} ${Y_BOT}`}
              />

              {/* Path 6A: Retry Card -> Post Dot */}
              <path
                className="flow-path path-retry-out"
                d={`M ${POS.branchCard + 100} ${Y_BOT} L ${POS.postDot} ${Y_BOT}`}
              />

              {/* Path 6B: Retry Post Dot -> Loop-back directly to bottom border of ZentriXA Hybrid Engine card */}
              <path
                className="flow-path path-retry-loop path-post-trigger"
                d={`M ${POS.postDot} ${Y_BOT} C ${POS.postDot + 25} ${Y_BOT + 35}, ${POS.postDot - 180} ${Y_BOT + 65}, ${POS.step3Card + 120} ${Y_BOT + 65} C ${POS.step3Card + 40} ${Y_BOT + 65}, ${POS.step3Card} ${Y_MID + 65}, ${POS.step3Card} ${Y_MID + 55}`}
              />

              {/* Path 7A: Local Backend Card -> Post Dot */}
              <path
                className="flow-path path-high-conf"
                d={`M ${POS.branchCard + 100} ${Y_TOP} L ${POS.postDot} ${Y_TOP}`}
              />

              {/* Path 7B: Post Dot -> Converge (synchronized with 6B & 8B) */}
              <path
                className="flow-path path-high-conf path-post-trigger"
                d={`M ${POS.postDot} ${Y_TOP} C ${POS.postPlus} ${Y_TOP}, ${POS.convergeDot - 60} ${Y_MID}, ${POS.convergeDot} ${Y_MID}`}
              />



              {/* Path 8B: Post Dot -> Converge (synchronized with 6B & 7B) */}
              <path
                className="flow-path path-mid-conf path-post-trigger"
                d={`M ${POS.postDot} ${Y_MID} L ${POS.convergeDot} ${Y_MID}`}
              />

              {/* Path 9: Converge -> Text-to-Voice */}
              <path
                className="flow-path path-high-conf"
                d={`M ${POS.convergeDot} ${Y_MID} L ${POS.step4Card - 100} ${Y_MID}`}
              />

              {/* Path 10: Straight line connecting dotE to dotF */}
              <path
                className="flow-path path-converge"
                d={`M ${POS.dotE} ${Y_MID} L ${POS.dotF} ${Y_MID}`}
              />
            </svg>

            {/* Step 1: User Voice Input */}
            <div className="flow-element flow-card gs-reveal" style={{ left: `${POS.step1Card}px`, top: `${Y_MID + 90}px` }}>
              <div className="flow-card-head" style={{ background: 'linear-gradient(135deg, #7B2FFF, #4C1D95)' }}>
                <span className="flow-step-num">Step 1</span>
                <span className="flow-icon">👤 🎙️</span>
                <h4 className="flow-card-title">User Voice Input</h4>
              </div>
              <div className="flow-card-body">
                <p className="flow-card-desc">Speaks voice command into UI.</p>
                <div className="flow-tag-pill tag-purple">Speech Audio</div>
              </div>
            </div>

            <div className="flow-element flow-dot gs-reveal" style={{ left: `${POS.dotA}px`, top: `${Y_MID}px` }} />

            <div className="flow-element flow-dot gs-reveal" style={{ left: `${POS.dotB}px`, top: `${Y_MID}px` }} />

            {/* Step 2: AssemblyAI STT */}
            <div className="flow-element flow-card gs-reveal" style={{ left: `${POS.step2Card}px`, top: `${Y_MID + 90}px` }}>
              <div className="flow-card-head" style={{ background: 'linear-gradient(135deg, #00D4FF, #0284C7)' }}>
                <span className="flow-step-num">Step 2</span>
                <span className="flow-icon">📝 ⚡</span>
                <h4 className="flow-card-title">AssemblyAI STT</h4>
              </div>
              <div className="flow-card-body">
                <p className="flow-card-desc">Transcribes speech to text in real time.</p>
                <div className="flow-tag-pill tag-cyan">Voice-to-Text</div>
              </div>
            </div>

            <div className="flow-element flow-dot gs-reveal" style={{ left: `${POS.dotC}px`, top: `${Y_MID}px` }} />

            <div className="flow-element flow-dot gs-reveal" style={{ left: `${POS.step3Card - 130}px`, top: `${Y_MID}px` }} />

            {/* Step 3: ZentriXA Hybrid Engine */}
            <div className="flow-element flow-card wide-card gs-reveal" style={{ left: `${POS.step3Card}px`, top: `${Y_MID + 90}px` }}>
              <div className="flow-card-head" style={{ background: 'linear-gradient(135deg, #A855F7, #6D28D9)' }}>
                <span className="flow-step-num">Step 3</span>
                <span className="flow-icon">🧠 ⚡</span>
                <h4 className="flow-card-title">Zentrixa-AI Hybrid Engine</h4>
              </div>
              <div className="flow-card-body">
                <p className="flow-card-desc">Scores transcript confidence score.</p>
                <div className="flow-tag-pill tag-purple">Confidence Router</div>
              </div>
            </div>

            <div className="flow-element flow-dot gs-reveal" style={{ left: `${POS.dotD}px`, top: `${Y_MID}px` }} />

            {/* Branch A: Local Backend (>=90%) */}
            <div className="flow-element flow-branch-badge badge-blue gs-reveal" style={{ left: `${POS.branchDot + 20}px`, top: `${Y_TOP - 38}px` }}>
              ≥ 90% Confidence
            </div>
            <div className="flow-element flow-dot gs-reveal" style={{ left: `${POS.branchDot}px`, top: `${Y_TOP}px` }} />
            <div className="flow-element flow-card branch-high-conf gs-reveal" style={{ left: `${POS.branchCard}px`, top: `${Y_TOP}px` }}>
              <div className="flow-card-head" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderTop: '3px solid #00D4FF', padding: '12px 14px' }}>
                <h4 className="flow-card-title" style={{ color: '#FFFFFF', fontWeight: 900, textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' }}>Local Backend</h4>
              </div>
            </div>

            {/* Branch B: LLM Fallback (60% - 89%) */}
            <div className="flow-element flow-branch-badge badge-green gs-reveal" style={{ left: `${POS.branchDot + 60}px`, top: `${Y_MID - 38}px` }}>
              60% – 89% Confidence
            </div>
            <div className="flow-element flow-dot dot-green gs-reveal" style={{ left: `${POS.branchDot}px`, top: `${Y_MID}px` }} />
            <div className="flow-element flow-card branch-mid-conf gs-reveal" style={{ left: `${POS.branchCard}px`, top: `${Y_MID}px` }}>
              <div className="flow-card-head" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderTop: '3px solid #22C55E', padding: '12px 14px' }}>
                <h4 className="flow-card-title" style={{ color: '#FFFFFF', fontWeight: 900, textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' }}>LLM Fallback</h4>
              </div>
            </div>

            {/* Branch C: Retry / Re-listen (<60%) */}
            <div className="flow-element flow-branch-badge badge-orange gs-reveal" style={{ left: `${POS.branchDot + 20}px`, top: `${Y_BOT - 38}px` }}>
              &lt; 60% Confidence
            </div>
            <div className="flow-element flow-dot gs-reveal" style={{ left: `${POS.branchDot}px`, top: `${Y_BOT}px` }} />
            <div className="flow-element flow-card branch-retry gs-reveal" style={{ left: `${POS.branchCard}px`, top: `${Y_BOT}px` }}>
              <div className="flow-card-head" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderTop: '3px solid #F59E0B', padding: '12px 14px' }}>
                <h4 className="flow-card-title" style={{ color: '#FFFFFF', fontWeight: 900, textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' }}>Re-listen</h4>
              </div>
            </div>

            <div className="flow-element flow-tag-pill tag-orange retry-label gs-reveal" style={{ left: `${(POS.branchCard + POS.step3Card) / 2}px`, top: `${Y_BOT + 28}px` }}>
              Retries until confidence improves
            </div>

            {/* Post-branch dots for all three decision paths aligned at POS.postDot */}
            <div className="flow-element flow-dot post-dot-anchor gs-reveal" style={{ left: `${POS.postDot}px`, top: `${Y_TOP}px` }} />
            <div className="flow-element flow-dot dot-green gs-reveal" style={{ left: `${POS.postDot}px`, top: `${Y_MID}px` }} />
            <div className="flow-element flow-dot dot-orange gs-reveal" style={{ left: `${POS.postDot}px`, top: `${Y_BOT}px` }} />


            {/* Converge point */}
            <div className="flow-element flow-dot gs-reveal" style={{ left: `${POS.convergeDot}px`, top: `${Y_MID}px` }} />

            {/* Step 4: Text-to-Voice Conversion */}
            <div className="flow-element flow-card step4-card-anchor gs-reveal" style={{ left: `${POS.step4Card}px`, top: `${Y_MID + 90}px` }}>
              <div className="flow-card-head" style={{ background: 'linear-gradient(135deg, #3B82F6, #7B2FFF)' }}>
                <span className="flow-step-num">Step 4</span>
                <span className="flow-icon">🔊</span>
                <h4 className="flow-card-title">Text-to-Voice Conversion</h4>
              </div>
              <div className="flow-card-body">
                <p className="flow-card-desc">Converts response back into speech.</p>
                <div className="flow-tag-pill tag-cyan">Speech Synthesis</div>
              </div>
            </div>

            <div className="flow-element flow-dot gs-reveal" style={{ left: `${POS.dotE}px`, top: `${Y_MID}px` }} />

            <div className="flow-element flow-dot gs-reveal" style={{ left: `${POS.dotF}px`, top: `${Y_MID}px` }} />

            {/* Final Step: Voice Execution Success */}
            <div className="flow-element flow-card gs-reveal" style={{ left: `${POS.finalCard}px`, top: `${Y_MID}px` }}>
              <div className="flow-card-head" style={{ background: 'linear-gradient(135deg, #EC4899, #8B5CF6)' }}>
                <span className="flow-step-num">Final Step</span>
                <span className="flow-icon">🎉</span>
                <h4 className="flow-card-title">Voice Execution Success</h4>
              </div>
              <div className="flow-card-body">
                <p className="flow-card-desc">Delivers spoken result to user.</p>
                <div className="flow-tag-pill tag-pink">Output Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceArchitectureFlow;