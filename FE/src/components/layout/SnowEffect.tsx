"use client";

import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  density: number;
  color: string;
}

export default function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Snowflake[] = [];
    const maxParticles = 100;

    // Force snow to be white for both themes
    const snowflakeColor = "rgba(252, 240, 3, 0.7)";

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createSnowflakes = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1, // 1-4px size
          density: Math.random() * 100, // randomized fall speed factor
          color: snowflakeColor,
        });
      }
    };

    const drawSnowflakes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];

        ctx.beginPath();
        ctx.fillStyle = snowflakeColor;
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);
        ctx.fill();
      }

      updateSnowflakes();
    };

    const updateSnowflakes = () => {
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        // fall down
        p.y += Math.cos(p.density) + 1 + p.radius / 2;
        // sway a bit
        p.x += Math.sin(p.density);

        if (p.x > canvas.width + 5 || p.x < -5 || p.y > canvas.height) {
          if (i % 3 > 0) {
            particles[i] = {
              x: Math.random() * canvas.width,
              y: -10,
              radius: p.radius,
              density: p.density,
              color: snowflakeColor,
            };
          } else {
            // If the flake exits from the right
            if (Math.sin(p.density) > 0) {
              particles[i] = {
                x: -5,
                y: Math.random() * canvas.height,
                radius: p.radius,
                density: p.density,
                color: snowflakeColor,
              };
            } else {
              particles[i] = {
                x: canvas.width + 5,
                y: Math.random() * canvas.height,
                radius: p.radius,
                density: p.density,
                color: snowflakeColor,
              };
            }
          }
        }
      }
    };

    const animate = () => {
      drawSnowflakes();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createSnowflakes();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 opacity-80"
      style={{ top: 0, left: 0 }}
    />
  );
}
