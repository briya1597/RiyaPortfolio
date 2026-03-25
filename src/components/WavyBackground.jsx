import React, { useEffect, useRef } from 'react';

const WavyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    let width, height;
    let animationFrameId;
    let time = 0;
    
    // Starfield configuration
    const starCount = 300; // Increased count
    const stars = [];
    
    // Ribbon configuration
    const linesPerRibbon = 15;
    const ribbonPointCount = 80;
    
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Initialize stars
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.8,
          speed: Math.random() * 0.4 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          blinkSpeed: Math.random() * 0.05 + 0.01
        });
      }
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    const draw = () => {
      // Clear with background color awareness
      ctx.clearRect(0, 0, width, height);
      
      time += 0.015; // Faster for "snake-like" feel
      
      // 1. Draw Starfield
      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.y -= star.speed; 
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
        
        const twinkle = 0.5 + 0.5 * Math.sin(time * 2 + i);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a tiny glow to some stars
        if (i % 10 === 0) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "white";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      ctx.restore();

      // 2. Draw Curvy Snake-like Ribbons
      const ribbons = [
        { color: 'rgba(14, 165, 233, 0.4)', offset: 0, amp: 100, freq: 0.005 },
        { color: 'rgba(139, 92, 246, 0.4)', offset: Math.PI, amp: 80, freq: 0.006 }
      ];

      ribbons.forEach((ribbon) => {
        for (let l = 0; l < linesPerRibbon; l++) {
          ctx.beginPath();
          ctx.strokeStyle = ribbon.color;
          ctx.lineWidth = 1.2;
          
          const lineGap = l * 8;
          
          for (let i = 0; i < ribbonPointCount; i++) {
            // "Snake" logic: x is screen width, y is a wave that propagates
            const x = (width / ribbonPointCount) * i;
            
            // Central curvature (the "snake" body curve)
            const mainCurve = Math.sin(x * 0.001 + time * 0.5 + ribbon.offset) * ribbon.amp;
            
            // Secondary curvature (fine ripples)
            const ripple = Math.sin(x * 0.005 - time + ribbon.offset) * 30;
            
            // Parallel spacing that twists
            const twist = Math.sin(x * 0.002 + time + l * 0.1) * lineGap;
            
            const y = height / 2 + mainCurve + ripple + twist;
            
            if (i === 0) ctx.moveTo(x, y);
            else {
              // Smooth bezier-like curves
              const prevX = (width / ribbonPointCount) * (i - 1);
              const prevMainCurve = Math.sin(prevX * 0.001 + time * 0.5 + ribbon.offset) * ribbon.amp;
              const prevRipple = Math.sin(prevX * 0.005 - time + ribbon.offset) * 30;
              const prevTwist = Math.sin(prevX * 0.002 + time + l * 0.1) * lineGap;
              const prevY = height / 2 + prevMainCurve + prevRipple + prevTwist;
              
              const midX = (prevX + x) / 2;
              const midY = (prevY + y) / 2;
              
              ctx.quadraticCurveTo(prevX, prevY, midX, midY);
            }
          }
          ctx.stroke();
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] bg-slate-50 dark:bg-slate-950 transition-colors duration-700"
    />
  );
};

export default WavyBackground;
