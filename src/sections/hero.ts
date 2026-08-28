import { assumptions } from '../data/business-model';
import { formatVND } from '../lib/format';

export function renderHero(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'hero';
  section.className = 'band-dark';
  section.innerHTML = `
    <div class="container">
      <div class="hero-layout">
        <div class="hero-text">
          <p class="dim-label">[01] Giới thiệu</p>
          <h1>IN CASE C&Ocirc;NG NGHI&#7878;P</h1>
          <p class="hero-subtitle">
            V&#7871;t in b&#7843;o v&#7879; c&ocirc;ng nghi&#7879;p &mdash; FDM 3D Printing
          </p>
          <div class="capital-badge">
            ${formatVND(assumptions.startupBaseline)}
            <span class="unit">v&#7889;n kh&#7903;i &#273;&#7847;u</span>
          </div>
          <blockquote class="hero-quote">
            &ldquo;L&#7907;i nhu&#7853;n kh&ocirc;ng n&#7857;m &#7903; s&#7889; gram nh&#7921;a; l&#7907;i nhu&#7853;n n&#7857;m &#7903; gi&aacute; tr&#7883; tr&ecirc;n m&#7895;i gi&#7901; m&aacute;y.&rdquo;
          </blockquote>
        </div>
        <div class="hero-svg">
          <svg viewBox="0 0 480 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FDM printer technical drawing">
            <!-- Frame: two vertical pillars + top beam -->
            <line x1="100" y1="60" x2="100" y2="320" stroke="var(--line)" stroke-width="1.5"/>
            <line x1="380" y1="60" x2="380" y2="320" stroke="var(--line)" stroke-width="1.5"/>
            <line x1="100" y1="60" x2="380" y2="60" stroke="var(--line)" stroke-width="1.5"/>
            <!-- Base -->
            <rect x="80" y="320" width="320" height="20" fill="none" stroke="var(--line)" stroke-width="1.5" rx="2"/>
            <!-- Print bed -->
            <rect x="120" y="272" width="240" height="12" fill="none" stroke="var(--line)" stroke-width="1.25"/>
            <line x1="130" y1="278" x2="350" y2="278" stroke="var(--line)" stroke-width="0.4" stroke-dasharray="4 2"/>
            <!-- Gantry X-axis rail -->
            <line x1="100" y1="100" x2="380" y2="100" stroke="var(--line)" stroke-width="1"/>
            <!-- Carriage on gantry -->
            <rect x="220" y="90" width="40" height="20" fill="none" stroke="var(--line)" stroke-width="1" rx="1"/>
            <!-- Vertical hotend rod -->
            <line x1="240" y1="110" x2="240" y2="245" stroke="var(--line)" stroke-width="0.75"/>
            <!-- Nozzle -->
            <polygon points="236,245 244,245 242,262 238,262" fill="none" stroke="var(--line)" stroke-width="1"/>
            <!-- Filament path -->
            <line x1="240" y1="38" x2="240" y2="90" stroke="var(--line)" stroke-width="0.4" stroke-dasharray="3 3"/>
            <!-- Spool -->
            <circle cx="155" cy="42" r="14" fill="none" stroke="var(--line)" stroke-width="1"/>
            <circle cx="155" cy="42" r="3" fill="var(--line)" opacity="0.5"/>
            <!-- Z-axis rails -->
            <line x1="120" y1="100" x2="120" y2="272" stroke="var(--line)" stroke-width="0.6"/>
            <line x1="360" y1="100" x2="360" y2="272" stroke="var(--line)" stroke-width="0.6"/>
            <!-- Dimension: Width -->
            <line x1="100" y1="365" x2="380" y2="365" stroke="var(--line)" stroke-width="0.6"/>
            <line x1="100" y1="355" x2="100" y2="375" stroke="var(--line)" stroke-width="0.4"/>
            <line x1="380" y1="355" x2="380" y2="375" stroke="var(--line)" stroke-width="0.4"/>
            <text x="240" y="380" text-anchor="middle" fill="var(--line)" font-size="10" font-family="var(--font-data)">220 mm</text>
            <!-- Dimension: Height -->
            <line x1="60" y1="60" x2="60" y2="340" stroke="var(--line)" stroke-width="0.6"/>
            <line x1="50" y1="60" x2="70" y2="60" stroke="var(--line)" stroke-width="0.4"/>
            <line x1="50" y1="340" x2="70" y2="340" stroke="var(--line)" stroke-width="0.4"/>
            <text x="50" y="205" text-anchor="middle" fill="var(--line)" font-size="10" font-family="var(--font-data)" transform="rotate(-90 50 205)">250 mm</text>
            <!-- Dimension: Bed depth -->
            <line x1="120" y1="298" x2="360" y2="298" stroke="var(--line)" stroke-width="0.4"/>
            <text x="240" y="308" text-anchor="middle" fill="var(--line)" font-size="9" font-family="var(--font-data)">220 &times; 220 mm</text>
            <!-- Callout: Frame -->
            <circle cx="100" cy="180" r="2" fill="var(--line)"/>
            <line x1="100" y1="180" x2="32" y2="145" stroke="var(--line)" stroke-width="0.4"/>
            <text x="28" y="142" text-anchor="end" fill="var(--line)" font-size="9" font-family="var(--font-body)">Khung nh&ocirc;m</text>
            <!-- Callout: Bed -->
            <circle cx="350" cy="278" r="2" fill="var(--line)"/>
            <line x1="350" y1="278" x2="420" y2="255" stroke="var(--line)" stroke-width="0.4"/>
            <text x="425" y="252" fill="var(--line)" font-size="9" font-family="var(--font-body)">B&agrave;n in nhi&#7879;t</text>
            <!-- Callout: Nozzle -->
            <circle cx="244" cy="253" r="2" fill="var(--line)"/>
            <line x1="244" y1="253" x2="420" y2="215" stroke="var(--line)" stroke-width="0.4"/>
            <text x="425" y="212" fill="var(--line)" font-size="9" font-family="var(--font-body)">&#272;&#7847;u phun 0.4 mm</text>
            <!-- Callout: Spool -->
            <circle cx="169" cy="38" r="2" fill="var(--line)"/>
            <line x1="169" y1="38" x2="420" y2="55" stroke="var(--line)" stroke-width="0.4"/>
            <text x="425" y="52" fill="var(--line)" font-size="9" font-family="var(--font-body)">Cu&#7897;n filament</text>
            <!-- Print volume annotation -->
            <text x="240" y="225" text-anchor="middle" fill="var(--signal)" font-size="9" font-family="var(--font-data)" opacity="0.8">220 &times; 220 &times; 250 mm</text>
          </svg>
        </div>
      </div>
    </div>
  `;
  return section;
}
