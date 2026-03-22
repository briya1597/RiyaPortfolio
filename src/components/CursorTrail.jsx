import React, { useEffect, useRef } from 'react';

const CursorTrail = () => {
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

    // Array to store previous mouse positions for the trail
    const pointer = { x: w / 2, y: h / 2 };
    const history = [];
    const maxHistory = 40; // Length of the trail

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const handleMouseMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Add current pointer position to history
      history.push({ x: pointer.x, y: pointer.y });
      if (history.length > maxHistory) {
        history.shift();
      }

      if (history.length > 1) {
        // Draw 4 distinct parallel lines
        const offsets = [
          { dx: -15, dy: -15, color: '#0ea5e9' }, // sky-500
          { dx: 15, dy: -15, color: '#8b5cf6' },  // violet-500
          { dx: -15, dy: 15, color: '#f59e0b' },  // amber-500
          { dx: 15, dy: 15, color: '#10b981' }    // emerald-500
        ];

        offsets.forEach((offset, lineIndex) => {
          ctx.beginPath();
          for (let i = 0; i < history.length; i++) {
            const point = history[i];
            
            // Calculate smooth trail fading and tapering thickness
            const progress = i / history.length;
            const thickness = progress * 2;
            ctx.lineWidth = thickness;
            
            // The lines follow the cursor but rotate/swirl slightly or just trail perfectly parallel
            const targetX = point.x + offset.dx;
            const targetY = point.y + offset.dy;

            if (i === 0) {
              ctx.moveTo(targetX, targetY);
            } else {
              // Smooth connecting curves
              const xc = (history[i - 1].x + offset.dx + targetX) / 2;
              const yc = (history[i - 1].y + offset.dy + targetY) / 2;
              ctx.quadraticCurveTo(history[i - 1].x + offset.dx, history[i - 1].y + offset.dy, xc, yc);
            }
          }
          
          ctx.strokeStyle = offset.color;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        });
      }

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
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'difference' }}
    />
  );
};

export default CursorTrail;
