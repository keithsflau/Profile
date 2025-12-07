import React, { useCallback, useEffect, useRef, useState } from 'react';

const WIDTH = 960;
const HEIGHT = 540;
const GROUND_HEIGHT = 80;
const GRAVITY = 900; // px / s^2
const MAX_PULL = 170;
const SPEED_FACTOR = 7;
const ARROW_RADIUS = 10;
const BOW = { x: 140, y: HEIGHT - 150 };

const targetBaseX = WIDTH - 220;
const targetWidth = 150;
const targetHeight = 80;
const targetGap = 120;
const targetTop = 90;

const TARGETS = [
  {
    id: 'A',
    label: 'A',
    text: '步行',
    subtitle: 'Walk',
    x: targetBaseX,
    y: targetTop,
    width: targetWidth,
    height: targetHeight,
    correct: false,
  },
  {
    id: 'B',
    label: 'B',
    text: '奔跑',
    subtitle: 'Run',
    x: targetBaseX,
    y: targetTop + targetGap,
    width: targetWidth,
    height: targetHeight,
    correct: true,
  },
  {
    id: 'C',
    label: 'C',
    text: '離開',
    subtitle: 'Leave',
    x: targetBaseX,
    y: targetTop + targetGap * 2,
    width: targetWidth,
    height: targetHeight,
    correct: false,
  },
];

const randomWind = () => Math.round((Math.random() - 0.5) * 80);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const circleRectCollision = (circle, radius, rect) => {
  const closestX = clamp(circle.x, rect.x, rect.x + rect.width);
  const closestY = clamp(circle.y, rect.y, rect.y + rect.height);
  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  return dx * dx + dy * dy <= radius * radius;
};

const getPointerPosition = (event, canvas) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * WIDTH,
    y: ((event.clientY - rect.top) / rect.height) * HEIGHT,
  };
};

const roundedRectPath = (ctx, x, y, width, height, radius) => {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f7f5f0',
    padding: '24px',
    boxSizing: 'border-box',
    fontFamily: '"Noto Sans TC", "Segoe UI", sans-serif',
  },
  panel: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(15, 23, 42, 0.1)',
    padding: '24px',
    width: 'min(100%, 1000px)',
  },
  title: {
    margin: '0 0 12px',
    fontSize: '24px',
    color: '#1d3557',
  },
  subtitle: {
    margin: '0 0 18px',
    color: '#475569',
  },
  canvas: {
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
    maxWidth: '100%',
    display: 'block',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    touchAction: 'none',
  },
  status: {
    marginTop: '12px',
    fontSize: '16px',
    color: '#0b7285',
  },
};

const ArcheryOfLogic = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const resetTimerRef = useRef(null);

  const arrowRef = useRef({
    x: BOW.x,
    y: BOW.y,
    vx: 0,
    vy: 0,
    flying: false,
  });

  const dragPointRef = useRef(null);
  const draggingRef = useRef(false);

  const [wind, setWind] = useState(() => randomWind());
  const [status, setStatus] = useState('拉動弓弦，射中代表「奔跑」的靶。');
  const [lastHit, setLastHit] = useState(null);

  const windRef = useRef(wind);
  const statusRef = useRef(status);
  const lastHitRef = useRef(lastHit);

  useEffect(() => {
    windRef.current = wind;
  }, [wind]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    lastHitRef.current = lastHit;
  }, [lastHit]);

  const resetArrow = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = setTimeout(() => {
      arrowRef.current = { x: BOW.x, y: BOW.y, vx: 0, vy: 0, flying: false };
      dragPointRef.current = null;
      setWind(randomWind());
      resetTimerRef.current = null;
    }, 800);
  }, [setWind]);

  const handleTargetHit = useCallback(
    (target) => {
      arrowRef.current.flying = false;
      setLastHit({ id: target.id, correct: target.correct });
      if (target.correct) {
        setStatus('🎯 命中！「奔跑」就是「走」的古義。');
      } else {
        setStatus(`💥 擊中「${target.text}」，這不是古義，再試一次！`);
      }
      resetArrow();
    },
    [resetArrow],
  );

  const handleMiss = useCallback(
    (message) => {
      arrowRef.current.flying = false;
      setLastHit(null);
      setStatus(message);
      resetArrow();
    },
    [resetArrow],
  );

  const handlePointerDown = useCallback(
    (event) => {
      if (!canvasRef.current || arrowRef.current.flying) {
        return;
      }
      const pos = getPointerPosition(event, canvasRef.current);
      const distance = Math.hypot(pos.x - BOW.x, pos.y - BOW.y);
      if (distance > 150) {
        return;
      }
      event.preventDefault();
      draggingRef.current = true;
      dragPointRef.current = pos;
      setStatus('拉弓瞄準，鬆開即可發射。');
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    [setStatus],
  );

  const handlePointerMove = useCallback((event) => {
    if (!draggingRef.current || !canvasRef.current) {
      return;
    }
    event.preventDefault();
    dragPointRef.current = getPointerPosition(event, canvasRef.current);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!draggingRef.current || !canvasRef.current || arrowRef.current.flying) {
      draggingRef.current = false;
      dragPointRef.current = null;
      return;
    }
    draggingRef.current = false;
    const point = dragPointRef.current;
    dragPointRef.current = null;
    if (!point) {
      return;
    }
    const dx = BOW.x - point.x;
    const dy = BOW.y - point.y;
    const vectorMagnitude = Math.hypot(dx, dy);
    if (vectorMagnitude < 8) {
      return;
    }
    const clampedMagnitude = Math.min(vectorMagnitude, MAX_PULL);
    const speed = clampedMagnitude * SPEED_FACTOR;
    const vx = (dx / vectorMagnitude) * speed;
    const vy = (dy / vectorMagnitude) * speed;
    arrowRef.current = {
      x: BOW.x,
      y: BOW.y,
      vx,
      vy,
      flying: true,
    };
    setStatus('箭矢飛行中，留意風向修正。');
  }, [setStatus]);

  useEffect(() => {
    const release = () => handlePointerUp();
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    return () => {
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    canvas.style.width = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;
    ctx.scale(dpr, dpr);

    let lastTime = performance.now();

    const advanceArrow = (dt) => {
      const arrow = arrowRef.current;
      if (!arrow.flying) {
        return;
      }
      arrow.vx += windRef.current * dt;
      arrow.vy += GRAVITY * dt;
      arrow.x += arrow.vx * dt;
      arrow.y += arrow.vy * dt;

      for (const target of TARGETS) {
        if (circleRectCollision(arrow, ARROW_RADIUS, target)) {
          handleTargetHit(target);
          return;
        }
      }

      if (arrow.y >= HEIGHT - GROUND_HEIGHT - ARROW_RADIUS) {
        handleMiss('箭矢落地，未命中靶。');
      } else if (arrow.x > WIDTH + 60 || arrow.x < -60 || arrow.y < -60) {
        handleMiss('箭矢飛出場外。');
      }
    };

    const drawTrajectory = () => {
      if (!dragPointRef.current || arrowRef.current.flying) {
        return;
      }
      const pointer = dragPointRef.current;
      const dx = BOW.x - pointer.x;
      const dy = BOW.y - pointer.y;
      const magnitude = Math.hypot(dx, dy);
      if (magnitude < 6) {
        return;
      }
      const clampedMagnitude = Math.min(magnitude, MAX_PULL);
      const speed = clampedMagnitude * SPEED_FACTOR;
      let vx = (dx / magnitude) * speed;
      let vy = (dy / magnitude) * speed;
      let x = BOW.x;
      let y = BOW.y;
      ctx.save();
      ctx.setLineDash([4, 8]);
      ctx.strokeStyle = 'rgba(17, 24, 39, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 30; i += 1) {
        vx += windRef.current * 0.08;
        vy += GRAVITY * 0.08;
        x += vx * 0.08;
        y += vy * 0.08;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        if (y > HEIGHT - GROUND_HEIGHT) {
          break;
        }
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawScene = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      sky.addColorStop(0, '#e6f0ff');
      sky.addColorStop(1, '#fff4df');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.fillStyle = '#e7d9c2';
      ctx.fillRect(0, HEIGHT - GROUND_HEIGHT, WIDTH, GROUND_HEIGHT);

      ctx.fillStyle = '#14213d';
      ctx.font = '26px "Noto Serif TC", serif';
      ctx.fillText('題目：走（古義：奔跑）', 32, 42);
      ctx.font = '18px "Noto Sans TC", sans-serif';
      ctx.fillText('請射擊正確義項：選擇「奔跑」的靶。', 32, 68);

      const windLabelX = WIDTH - 260;
      const windLabelY = 48;
      const indicatorLength = clamp(windRef.current * 2, -100, 100);
      ctx.strokeStyle = '#0b7285';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(windLabelX, windLabelY);
      ctx.lineTo(windLabelX + indicatorLength, windLabelY);
      const direction = Math.sign(indicatorLength) || 1;
      ctx.moveTo(windLabelX + indicatorLength, windLabelY);
      ctx.lineTo(windLabelX + indicatorLength - 12 * direction, windLabelY - 6);
      ctx.moveTo(windLabelX + indicatorLength, windLabelY);
      ctx.lineTo(windLabelX + indicatorLength - 12 * direction, windLabelY + 6);
      ctx.stroke();
      ctx.fillStyle = '#0b7285';
      ctx.font = '16px "Noto Sans TC", sans-serif';
      const windDirection =
        windRef.current === 0 ? '靜風' : windRef.current > 0 ? '向東' : '向西';
      ctx.fillText(`風力：${windDirection} (${windRef.current})`, windLabelX - 40, windLabelY - 12);

      TARGETS.forEach((target) => {
        const hitInfo =
          lastHitRef.current && lastHitRef.current.id === target.id ? lastHitRef.current : null;
        let fillColor = target.correct ? '#fff3c4' : '#fffaf5';
        if (hitInfo) {
          fillColor = hitInfo.correct ? '#c6f6c8' : '#fed7d7';
        }
        ctx.beginPath();
        roundedRectPath(ctx, target.x, target.y, target.width, target.height, 16);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.lineWidth = target.correct ? 4 : 2;
        ctx.strokeStyle = target.correct ? '#f08c00' : '#94a3b8';
        ctx.stroke();

        ctx.fillStyle = '#1f2937';
        ctx.font = '20px "Noto Sans TC", sans-serif';
        ctx.fillText(`${target.label}．${target.text}`, target.x + 16, target.y + 36);
        ctx.fillStyle = '#475569';
        ctx.font = '14px "Noto Sans TC", sans-serif';
        ctx.fillText(target.subtitle, target.x + 16, target.y + 60);
      });

      drawTrajectory();

      ctx.strokeStyle = '#8d5524';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(BOW.x, BOW.y - 95);
      ctx.quadraticCurveTo(BOW.x - 80, BOW.y, BOW.x, BOW.y + 95);
      ctx.stroke();

      const stringPoint =
        dragPointRef.current && !arrowRef.current.flying
          ? dragPointRef.current
          : { x: BOW.x, y: BOW.y };
      ctx.strokeStyle = '#fefae0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(BOW.x, BOW.y - 95);
      ctx.lineTo(stringPoint.x, stringPoint.y);
      ctx.lineTo(BOW.x, BOW.y + 95);
      ctx.stroke();

      const arrowState = arrowRef.current;
      const idleAngle = dragPointRef.current
        ? Math.atan2(BOW.y - dragPointRef.current.y, BOW.x - dragPointRef.current.x)
        : 0;
      const arrowAngle = arrowState.flying ? Math.atan2(arrowState.vy, arrowState.vx) : idleAngle;
      const arrowPosition = arrowState.flying ? arrowState : { x: BOW.x, y: BOW.y };

      ctx.save();
      ctx.translate(arrowPosition.x, arrowPosition.y);
      ctx.rotate(arrowAngle);
      ctx.fillStyle = '#5a5a5a';
      ctx.fillRect(-15, -2, 36, 4);
      ctx.fillStyle = '#b91c1c';
      ctx.beginPath();
      ctx.moveTo(21, 0);
      ctx.lineTo(32, 5);
      ctx.lineTo(32, -5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fefae0';
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.lineTo(-26, 7);
      ctx.lineTo(-24, 0);
      ctx.lineTo(-26, -7);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = '#1f2937';
      ctx.font = '18px "Noto Sans TC", sans-serif';
      ctx.fillText(statusRef.current, 32, HEIGHT - GROUND_HEIGHT + 32);
    };

    const loop = (time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      advanceArrow(delta);
      drawScene();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMiss, handleTargetHit]);

  useEffect(
    () => () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    },
    [],
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.panel}>
        <h2 style={styles.title}>Archery of Logic · 文言文射箭場</h2>
        <p style={styles.subtitle}>
          題目：<strong>走</strong>（古義：奔跑）。拖曳滑鼠拉弓，鬆手發射，並觀察風力修正！目標 B
          「奔跑」為正解。
        </p>
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          style={styles.canvas}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
        <div style={styles.status}>
          目前風力：{wind > 0 ? '向東' : wind < 0 ? '向西' : '靜風'}（{wind}） · {status}
        </div>
      </div>
    </div>
  );
};

export default ArcheryOfLogic;


