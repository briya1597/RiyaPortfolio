import React, { useRef, useEffect } from 'react';

const ParabolicLines = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const mouse = { x: w / 2, y: h / 2 };

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Create distinct lines that constantly mutate their shape
    const lines = [];
    const lineCount = 40; 
    
    for (let i = 0; i < lineCount; i++) {
        // Distribute lines from the 4 edges of the screen
        const edge = i % 4;
        let startX, startY;
        if (edge === 0) { startX = Math.random() * w; startY = 0; } // Top
        else if (edge === 1) { startX = w; startY = Math.random() * h; } // Right
        else if (edge === 2) { startX = Math.random() * w; startY = h; } // Bottom
        else { startX = 0; startY = Math.random() * h; } // Left

        lines.push({
            startX, startY,
            phase1: Math.random() * Math.PI * 2,
            phase2: Math.random() * Math.PI * 2,
            speed1: 0.01 + Math.random() * 0.02,
            speed2: 0.01 + Math.random() * 0.02,
            colorIndex: Math.random() > 0.5 ? 0 : 1 // 0 = sky, 1 = violet
        });
    }

    let time = 0;

    const render = () => {
      // Clear with 0.15 opacity. This makes lines look like moving, wriggling strings
      // rather than a static "multiplied image".
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)'; 
      ctx.fillRect(0, 0, w, h);

      time += 0.02;

      const dxCenter = mouse.x - w / 2;
      const dyCenter = mouse.y - h / 2;
      const distToMouse = Math.sqrt(dxCenter*dxCenter + dyCenter*dyCenter);
      
      const hoverRadius = 450;
      let chaos = 1; 
      
      // The cursor influence: un-messes the lines drastically when near the center
      if (distToMouse < hoverRadius) {
        chaos = (distToMouse / hoverRadius);
      }
      
      // Smooth easing so it snaps to perfect parabolic beauty
      chaos = Math.pow(chaos, 1.5); 

      ctx.lineWidth = 1.2;
      
      lines.forEach((line) => {
        // Step the internal noise
        line.phase1 += line.speed1;
        line.phase2 += line.speed2;
        
        // "Perfect" control points for a smooth, regular web when chaos is 0
        const perfectCp1X = w / 2;
        const perfectCp1Y = line.startY;
        const perfectCp2X = line.startX;
        const perfectCp2Y = h / 2;

        // "Irregular lines which do not stick to their shape"
        // We add wild sine wave offsets to the control points based on chaos.
        const offX1 = Math.sin(line.phase1 + time) * 400 * chaos;
        const offY1 = Math.cos(line.phase1 + time) * 400 * chaos;
        const offX2 = Math.cos(line.phase2 + time) * 400 * chaos;
        const offY2 = Math.sin(line.phase2 + time) * 400 * chaos;

        const cp1x = perfectCp1X + offX1;
        const cp1y = perfectCp1Y + offY1;
        
        const cp2x = perfectCp2X + offX2;
        const cp2y = perfectCp2Y + offY2;

        // The center node they all converge on
        const endX = w / 2 + Math.sin(time + line.phase1)*60 * chaos;
        const endY = h / 2 + Math.cos(time + line.phase2)*60 * chaos;

        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        
        // Colors brighten and solidify when untangled
        if (line.colorIndex === 0) {
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.4 + (1 - chaos)*0.6})`; 
        } else {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.4 + (1 - chaos)*0.6})`;
        }
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.8 }} 
    />
  );
};

export default ParabolicLines;
