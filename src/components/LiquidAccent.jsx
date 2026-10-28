import { useId } from 'react';
import './LiquidAccent.css';

export default function LiquidAccent({ className = '', tone = 'lime' }) {
  const id = useId().replace(/:/g, '');
  return (
    <div className={`liquid-accent liquid-accent--${tone} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none">
        <defs>
          <linearGradient id={`${id}-body`} x1="45" y1="30" x2="190" y2="210" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity=".95" /><stop offset=".18" stopColor="var(--liquid-light)" /><stop offset=".48" stopColor="var(--liquid-dark)" /><stop offset=".72" stopColor="var(--liquid-light)" /><stop offset="1" stopColor="var(--liquid-dark)" /></linearGradient>
          <radialGradient id={`${id}-bead`} cx=".3" cy=".25" r=".8"><stop stopColor="white" /><stop offset=".3" stopColor="var(--liquid-light)" /><stop offset="1" stopColor="var(--liquid-dark)" /></radialGradient>
        </defs>
        <g className="liquid-accent__body">
          <path d="M109 42C127 20 144 37 143 61C142 85 158 84 177 73C204 58 213 81 191 101C173 118 185 128 204 139C229 154 208 177 186 164C165 151 158 160 158 183C157 214 128 217 121 190C115 168 102 167 83 187C63 209 42 186 60 164C77 144 66 134 43 137C14 141 11 113 40 105C65 99 68 85 53 65C36 42 61 26 81 47C95 62 100 55 109 42Z" fill={`url(#${id}-body)`} stroke="var(--liquid-light)" strokeOpacity=".7" />
          <path d="M68 88C83 71 90 88 109 66M58 113C79 105 86 110 93 97" stroke="white" strokeOpacity=".75" strokeWidth="5" strokeLinecap="round" />
          <path d="M138 166C144 151 153 145 170 146" stroke="white" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle className="liquid-accent__drop" cx="202" cy="44" r="10" fill={`url(#${id}-bead)`} />
        <ellipse className="liquid-accent__drop liquid-accent__drop--small" cx="31" cy="181" rx="7" ry="10" transform="rotate(28 31 181)" fill={`url(#${id}-bead)`} />
      </svg>
    </div>
  );
}
