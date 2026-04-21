import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let huds: HUDElement[] = [];
    const mouse = { x: -1000, y: -1000 };

    class HUDElement {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      type: 'crosshair' | 'circle' | 'square';
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 40 + 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        const types: ('crosshair' | 'circle' | 'square')[] = ['crosshair', 'circle', 'square'];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.opacity = Math.random() * 0.2 + 0.05;
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.y -= 0.2; // Slow upward float
        if (this.y < -this.size) this.y = canvas!.height + this.size;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 1;

        if (this.type === 'crosshair') {
          ctx.beginPath();
          ctx.moveTo(-this.size/2, 0); ctx.lineTo(this.size/2, 0);
          ctx.moveTo(0, -this.size/2); ctx.lineTo(0, this.size/2);
          ctx.stroke();
          ctx.strokeRect(-this.size/4, -this.size/4, this.size/2, this.size/2);
        } else if (this.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
          ctx.setLineDash([5, 5]);
          ctx.stroke();
        } else {
          ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size);
          ctx.beginPath();
          ctx.moveTo(-this.size/2, -this.size/2); ctx.lineTo(-this.size/4, -this.size/4);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const force = (150 - distance) / 150;
          this.x -= dx * force * 0.03;
          this.y -= dy * force * 0.03;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      huds = [];
      
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }

      for (let i = 0; i < 8; i++) {
        huds.push(new HUDElement());
      }
    };

    let gridOffset = 0;
    const drawGrid = () => {
      if (!ctx) return;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 0.5;
      const step = 60;
      
      gridOffset = (gridOffset + 0.3) % step;

      for (let x = -step + gridOffset; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = -step + gridOffset; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    let scanLineY = 0;
    const drawScanLine = () => {
      if (!ctx) return;
      scanLineY = (scanLineY + 2) % canvas.height;
      const gradient = ctx.createLinearGradient(0, scanLineY - 50, 0, scanLineY);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanLineY - 50, canvas.width, 50);
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(canvas.width, scanLineY);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawScanLine();

      for (let i = 0; i < huds.length; i++) {
        huds[i].update();
        huds[i].draw();
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Draw lines between nearby particles
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
