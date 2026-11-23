/**
 * First-load preloader: comets of glowing dots racing around a small ∞, wrapped
 * in an orbiting gradient ring. Server-rendered + pure SVG/CSS so it paints
 * immediately (before any JS bundle); a tiny inline script dismisses it once
 * the page has loaded (min 0.9s so it never just flickers, max 2.6s so it never
 * blocks). It lives in the root layout, so client-side navigations never show it again.
 */

const INFINITY = "M50 50 C 58 38, 78 36, 80 50 C 82 64, 60 64, 50 50 C 40 36, 18 36, 20 50 C 22 64, 42 62, 50 50 Z";
const DUR = 1.8;
const TRAIL = 14;

function Comet({ offset, from, to, id }: { offset: number; from: string; to: string; id: string }) {
  return (
    <g filter={`url(#${id})`}>
      {Array.from({ length: TRAIL }).map((_, i) => {
        const t = i / (TRAIL - 1);
        const r = 2.6 * (1 - t) + 0.5;
        return (
          <circle key={i} r={r} fill={i < TRAIL / 2 ? from : to} opacity={1 - t * 0.85}>
            <animateMotion
              dur={`${DUR}s`}
              begin={`${-(offset + i * 0.028)}s`}
              repeatCount="indefinite"
              path={INFINITY}
              calcMode="spline"
              keyTimes="0;1"
              keyPoints="0;1"
              keySplines="0.42 0 0.58 1"
            />
          </circle>
        );
      })}
    </g>
  );
}

const DISMISS = `(function(){var s=Date.now(),d=false,el=document.getElementById('lx-preloader');if(!el)return;
function hide(){if(d)return;d=true;var w=Math.max(0,900-(Date.now()-s));setTimeout(function(){el.classList.add('lx-preloader-done');document.documentElement.classList.remove('lx-loading');},w);}
document.documentElement.classList.add('lx-loading');
if(document.readyState==='complete'){hide();}else{window.addEventListener('load',hide);}
setTimeout(hide,2600);})();`;

export default function Preloader() {
  return (
    <>
      <div id="lx-preloader" className="lx-preloader" aria-hidden suppressHydrationWarning>
        <div className="lx-preloader-mark">
          <svg viewBox="0 0 100 100" width="96" height="96">
            <defs>
              <linearGradient id="lxp-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#050DEB" />
                <stop offset="55%" stopColor="#8B3FFF" />
                <stop offset="100%" stopColor="#FB00DF" />
              </linearGradient>
              <filter id="lxp-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Orbit ring */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#8B3FFF" strokeOpacity="0.1" strokeWidth="2" />
            <g className="lx-preloader-orbit">
              <circle cx="50" cy="50" r="44" fill="none" stroke="url(#lxp-ring)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="70 207" />
              <circle cx="94" cy="50" r="2.6" fill="#FB00DF" filter="url(#lxp-glow)" />
            </g>
            <g className="lx-preloader-orbit-rev">
              <circle cx="50" cy="50" r="38" fill="none" stroke="url(#lxp-ring)" strokeOpacity="0.45" strokeWidth="1" strokeLinecap="round" strokeDasharray="22 217" />
            </g>

            {/* Faint ∞ track */}
            <path d={INFINITY} fill="none" stroke="url(#lxp-ring)" strokeOpacity="0.16" strokeWidth="1.6" />

            {/* Two comets, half a lap apart */}
            <Comet offset={0} from="#050DEB" to="#8B3FFF" id="lxp-glow" />
            <Comet offset={DUR / 2} from="#FB00DF" to="#8B3FFF" id="lxp-glow" />
          </svg>
        </div>
        <span className="lx-preloader-word">LUMINAXPERT</span>
      </div>
      <script dangerouslySetInnerHTML={{ __html: DISMISS }} />
    </>
  );
}
