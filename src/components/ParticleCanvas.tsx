import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  active?: boolean;
  density?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  type: 'jasmine' | 'gold' | 'marigold' | 'rice';
  opacity: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ active = true, density = 40 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create particles
    const types: Array<'jasmine' | 'gold' | 'marigold' | 'rice'> = ['jasmine', 'gold', 'marigold', 'rice'];
    const particles: Particle[] = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 3,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: Math.sin(Math.random() * Math.PI) * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      type: types[Math.floor(Math.random() * types.length)],
      opacity: Math.random() * 0.7 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y / 30) * 0.5 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'jasmine') {
          // Soft white petal with yellow tint center
          ctx.fillStyle = '#fffdfa';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 1.8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fce892';
          ctx.beginPath();
          ctx.arc(0, p.size * 0.5, p.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'marigold') {
          // Vibrant deep orange/yellow petal
          ctx.fillStyle = Math.random() > 0.5 ? '#ff9d00' : '#e65c00';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'gold') {
          // Metallic gold shimmer dust
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, '#fff6cc');
          grad.addColorStop(1, '#b38728');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'rice') {
          // Akshata rice grain (white/yellow-tinted elongated oval)
          ctx.fillStyle = '#fff8dc';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.4, p.size * 1.2, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
    />
  );
};
