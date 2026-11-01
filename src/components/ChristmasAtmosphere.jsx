import { useEffect, useState } from 'react';
import './ChristmasAtmosphere.css';

export default function ChristmasAtmosphere() {
  const [hidden, setHidden] = useState(() => document.hidden);
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return <div className={`christmas-atmosphere ${hidden ? 'is-hidden' : ''}`} aria-hidden="true">
    {Array.from({ length: 18 }, (_, i) => <span className="christmas-snow" key={i} style={{ '--snow-x': `${(i * 37 + 9) % 100}%`, '--snow-size': `${2 + i % 3}px`, '--snow-duration': `${18 + i % 7 * 3}s`, '--snow-delay': `${-i * 3.7}s`, '--snow-drift': `${i % 2 ? 34 : -28}px` }} />)}
  </div>;
}

export function ChristmasLights() {
  return <div className="christmas-lights" aria-hidden="true"><div className="christmas-lights__wire" />{Array.from({ length: 13 }, (_, i) => <i key={i} style={{ '--bulb-delay': `${-i * .45}s` }} />)}</div>;
}
