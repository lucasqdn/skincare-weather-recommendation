import { useEffect, useRef } from "react";

// Animated fullscreen background particles based on weather category
// Categories: clear, clouds, rain, snow, fog, thunder
export default function WeatherBackground({ category }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const overlayRef = useRef({ flash: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let running = true;

    // Size & DPR
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    window.addEventListener("resize", resize);

    // Init scene
    particlesRef.current = [];
    const max = Math.min(800, Math.floor((window.innerWidth * window.innerHeight) / 4000));
    const rnd = (a, b) => a + Math.random() * (b - a);

    function spawnRain(n = max * 0.6) {
      for (let i = 0; i < n; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: rnd( -0.7, -0.2),
          vy: rnd(6, 12),
          len: rnd(8, 16),
          type: "rain",
          alpha: rnd(0.4, 0.9),
        });
      }
    }

    function spawnSnow(n = max * 0.35) {
      for (let i = 0; i < n; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vy: rnd(0.5, 1.5),
          sway: rnd(0.5, 1.5),
          angle: Math.random() * Math.PI * 2,
          size: rnd(1.5, 3.5),
          type: "snow",
          alpha: rnd(0.6, 0.95),
        });
      }
    }

    function spawnFog(n = 10) {
      for (let i = 0; i < n; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: rnd(0.05, 0.2),
          vy: rnd(-0.05, 0.05),
          r: rnd(120, 260),
          type: "fog",
          alpha: rnd(0.03, 0.06),
        });
      }
    }

    function spawnClouds(n = 8) {
      for (let i = 0; i < n; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: rnd(20, window.innerHeight * 0.6),
          vx: rnd(0.1, 0.4),
          w: rnd(160, 360),
          h: rnd(60, 140),
          type: "cloud",
          alpha: rnd(0.05, 0.12),
        });
      }
    }

    function spawnClear(n = 40) {
      // Subtle dust motes
      for (let i = 0; i < n; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: rnd(-0.05, 0.05),
          vy: rnd(-0.05, 0.08),
          r: rnd(0.6, 1.5),
          type: "dust",
          alpha: rnd(0.06, 0.16),
        });
      }
    }

    // Configure by category
    switch (category) {
      case "rain":
        spawnRain();
        break;
      case "snow":
        spawnSnow();
        break;
      case "fog":
        spawnFog();
        break;
      case "clouds":
        spawnClouds();
        break;
      case "thunder":
        spawnRain(Math.floor(max * 0.5));
        overlayRef.current.flash = 0; // lightning flash overlay
        break;
      case "clear":
      default:
        spawnClear();
        break;
    }

    // Draw helpers
    function clear() {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }

    function draw() {
      clear();
      const W = window.innerWidth;
      const H = window.innerHeight;

      // Optional sunny glow
      if (category === "clear") {
        const grad = ctx.createRadialGradient(W * 0.5, -100, 50, W * 0.5, -100, 500);
        grad.addColorStop(0, "rgba(255,255,200,0.10)");
        grad.addColorStop(1, "rgba(255,255,200,0.0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      // Particles
      for (const p of particlesRef.current) {
        switch (p.type) {
          case "rain": {
            p.x += p.vx; p.y += p.vy;
            if (p.y > H + 20) { p.y = -10; p.x = Math.random() * W; }
            if (p.x < -20) { p.x = W + 10; }
            ctx.strokeStyle = `rgba(200,220,255,${p.alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.vx * p.len, p.y - p.len);
            ctx.stroke();
            break;
          }
          case "snow": {
            p.angle += 0.01 * p.sway;
            p.y += p.vy;
            p.x += Math.sin(p.angle) * 0.6;
            if (p.y > H + 6) { p.y = -6; p.x = Math.random() * W; }
            ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          }
          case "fog": {
            p.x += p.vx; p.y += p.vy;
            if (p.x - p.r > W) { p.x = -p.r; p.y = rnd(0, H); }
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
            grad.addColorStop(0, `rgba(200,210,220,${p.alpha})`);
            grad.addColorStop(1, "rgba(200,210,220,0)");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            break;
          }
          case "cloud": {
            p.x += p.vx;
            if (p.x - p.w > W) { p.x = -p.w; p.y = rnd(10, H * 0.6); }
            ctx.fillStyle = `rgba(220,230,240,${p.alpha})`;
            ctx.beginPath();
            roundedRect(ctx, p.x, p.y, p.w, p.h, 30);
            ctx.fill();
            break;
          }
          case "dust": {
            p.x += p.vx; p.y += p.vy;
            wrap(p, W, H);
            ctx.fillStyle = `rgba(255,255,240,${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            break;
          }
          default:
            break;
        }
      }

      // Thunder lightning flash
      if (category === "thunder") {
        // Randomly trigger flash
        if (Math.random() < 0.006 && overlayRef.current.flash <= 0) {
          overlayRef.current.flash = 1.0;
        }
        if (overlayRef.current.flash > 0) {
          const a = overlayRef.current.flash;
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          ctx.fillRect(0, 0, W, H);
          overlayRef.current.flash = Math.max(0, a - 0.06);
        }
      }

      if (running) rafRef.current = requestAnimationFrame(draw);
    }

    function wrap(p, W, H) {
      if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
    }

    function roundedRect(ctx, x, y, w, h, r) {
      const rr = Math.min(r, w * 0.5, h * 0.5);
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [category]);

  return <canvas ref={canvasRef} className="bg-layer" aria-hidden />;
}
