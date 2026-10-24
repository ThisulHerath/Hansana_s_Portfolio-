import { useEffect, useRef, useState } from 'react';
import './CampaignStyle.css';

const words = ['Brand thinking', 'Creative strategy', 'Campus campaigns', 'Design that connects', 'Learning by doing'];

export default function CampaignStrip() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`campaign-strip ${visible ? 'is-visible' : ''}`} role="img" aria-label="Brand thinking, creative strategy, campus campaigns, design that connects, learning by doing">
      <div className="campaign-strip__track" aria-hidden="true">
        {[0, 1].map(copy => <div className="campaign-strip__group" key={copy}>{words.map(word => <span key={word}>{word}<i>✳</i></span>)}</div>)}
      </div>
    </div>
  );
}
