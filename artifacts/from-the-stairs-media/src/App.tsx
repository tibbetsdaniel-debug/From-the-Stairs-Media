import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Advisors from '@/pages/advisors';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();
const EMAIL = 'ftsm@fromthestairsmedia.com';
const HOME_URL = import.meta.env.BASE_URL;
const INK = '#0F0E0C';

/* ---------- Brand ---------- */

export function Mark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="0" y="0" width="40" height="40" fill="hsl(var(--primary))" />
      <rect x="7" y="26" width="7" height="14" fill={INK} />
      <rect x="16.5" y="18" width="7" height="22" fill={INK} />
      <rect x="26" y="9" width="7" height="31" fill={INK} />
    </svg>
  );
}

function Wordmark() {
  return (
    <a href={`${HOME_URL}#top`} data-testid="link-home" className="flex items-center gap-3" aria-label="From the Stairs Media, home">
      <Mark />
      <span className="display text-[22px] sm:text-[26px] leading-none tracking-[0.04em] whitespace-nowrap">
        From the Stairs<span className="text-primary"> Media</span>
      </span>
    </a>
  );
}

function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`mono text-primary mb-4 ${className}`}>{children}</p>;
}

/* ---------- Navigation ---------- */

const links: [string, string][] = [
  ['Work', '#work'],
  ['Daniel', '#daniel'],
  ['First movers', '#early'],
  ['Services', '#services'],
  ['Approach', '#approach'],
  ['Advisors', 'advisors'],
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/85 border-b">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between gap-6">
        <Wordmark />
        <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
          {links.map(([l, h]) => (
            <a key={h} href={`${HOME_URL}${h}`} data-testid={`link-nav-${l.toLowerCase().replace(' ', '-')}`} className="text-[15px] font-semibold hover:text-primary transition-colors">{l}</a>
          ))}
          <a href={`${HOME_URL}#contact`} data-testid="button-nav-contact" className="inline-flex items-center min-h-11 px-5 rounded-full bg-primary text-primary-foreground text-[15px] font-bold hover:brightness-110 transition">Start a conversation</a>
        </nav>
        <button className="lg:hidden p-2 -mr-2" onClick={() => setOpen(!open)} data-testid="button-menu" aria-label="Menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="lg:hidden border-t bg-background px-6 py-6 flex flex-col gap-4">
          {[...links, ['Contact', '#contact'] as [string, string]].map(([l, h]) => (
            <a key={h} href={`${HOME_URL}${h}`} onClick={() => setOpen(false)} className="display text-4xl" data-testid={`link-mobile-${l.toLowerCase().replace(' ', '-')}`}>{l}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section id="top" className="max-w-7xl mx-auto px-6 pt-36 md:pt-44 pb-24">
      <h1 className="display font-black text-[clamp(4rem,12vw,11.5rem)] leading-[0.88]">
        The next step<br /><span className="text-primary">for your brand.</span>
      </h1>
      <div className="flex flex-wrap items-center gap-8 mt-14">
        <p className="lede flex-[1_1_420px] max-w-[600px] text-[21px] leading-relaxed">
          We help media brands unlock new revenue through partnerships, distribution, licensing, audience growth, and brand revitalization.
        </p>
        <a href="#contact" data-testid="button-hero-contact" className="inline-flex items-center gap-2 min-h-14 px-8 rounded-full bg-primary text-primary-foreground font-bold hover:brightness-110 transition">
          Start a conversation <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

type Company = { name: string; role: string; href?: string };

const current: Company[] = [
  { name: 'Lucha Underground', role: 'Brand revival & distribution', href: 'https://luchaunderground.com/' },
  { name: 'El Rey Rebel', role: 'General Manager · formerly El Rey Network', href: 'https://www.elreynetwork.com/' },
  { name: 'Gate 52', role: 'Project management', href: 'https://gate52.com/' },
  { name: 'PropQwiz', role: 'Chief Operating Officer', href: 'https://www.propqwiz.com/' },
  { name: 'DMG', role: 'Dooya Media Group · Brand revival & distribution', href: 'https://dooya.tv/' },
  { name: 'Pen Ultimate', role: 'Film fund · Brand revival & distribution' },
];

const previous: Company[] = [
  { name: 'Smosh', role: 'CEO', href: 'https://www.youtube.com/@smosh' },
  { name: 'Subnation', role: 'Chief Content Officer', href: 'https://www.youtube.com/c/Subnation' },
  { name: 'Odyssey Impact', role: 'COO', href: 'https://odyssey-impact.org/' },
  { name: 'Machinima', role: 'Chief Content Officer' },
  { name: 'Bunim-Murray Productions', role: 'Head of Digital Media', href: 'https://www.bmp51.com/' },
];

function Work() {
  return (
    <section id="work" className="border-y">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <SectionLabel className="mb-2">Operating now</SectionLabel>
        <p className="text-muted-foreground mb-8">Companies FTSM is currently operating or working with.</p>
        <ul className="grid md:grid-cols-2 gap-x-12">
          {current.map((c, i) => (
            <li key={c.name} className="py-5 border-t" data-testid={`company-current-${i}`}>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noreferrer" className="client-link display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.05]">{c.name}</a>
              ) : (
                <span className="display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.05]">{c.name}</span>
              )}
              <p className="mt-2 text-[15px] text-muted-foreground">{c.role}</p>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 mt-12 pt-7 border-t">
          <p className="mono text-muted-foreground">Previously</p>
          {previous.map((c) =>
            c.href ? (
              <a key={c.name} href={c.href} target="_blank" rel="noreferrer" className="client-link client-link-sm text-xl font-semibold">
                {c.name} <span className="font-normal text-muted-foreground">· {c.role}</span>
              </a>
            ) : (
              <span key={c.name} className="text-xl font-semibold">
                {c.name} <span className="font-normal text-muted-foreground">· {c.role}</span>
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section id="thesis" className="max-w-7xl mx-auto px-6 py-24 md:py-28 flex flex-wrap gap-14">
      <h2 className="display flex-[1_1_420px] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.96]">
        Most media brands are worth more than their business model admits.
      </h2>
      <div className="lede flex-[1_1_420px] flex flex-col gap-5 text-[19px]">
        <p>A name audiences trust. A catalog nobody has re-examined. A format other platforms would pay to carry. Value hides in plain sight, usually because the team inside is busy running the thing.</p>
        <p>We are media operators. We read a brand the way a buyer, a distributor, or a licensee would, find what is underused, and build the deals and audience paths that move it up a step.</p>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="daniel" className="bg-card">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-28 flex flex-wrap items-center gap-14">
        <img
          src={`${HOME_URL}daniel-tibbets.jpg`}
          alt="Portrait of Daniel Tibbets"
          width={1000}
          height={1000}
          loading="lazy"
          className="flex-[1_1_340px] w-full max-w-[520px] aspect-square object-cover rounded"
        />
        <div className="flex-[999_1_460px] min-w-0">
          <SectionLabel>Founder</SectionLabel>
          <h2 className="display font-black text-[clamp(3rem,6vw,5.6rem)] mb-6">Daniel Tibbets</h2>
          <p className="text-2xl font-bold leading-snug mb-6">An operator, not a consultant. Daniel builds the strategy, then runs it.</p>
          <div className="lede flex flex-col gap-4 max-w-[640px]">
            <p>Daniel founded From the Stairs Media to give media brands what most advisors can’t: someone who has actually run the business. FTSM doesn’t hand over a deck and walk away. Daniel plans the strategy and executes it, often stepping into the operating role himself. Today, through FTSM, he is GM of El Rey Rebel and COO of PropQwiz, and is building projects with Lucha Underground, Gate 52, DMG, and the film fund Pen Ultimate.</p>
            <p>Over 30 years he has been early at every major shift in how audiences watch: vertical mobile drama, YouTube, FAST, and convergence TV. He has started up and turned around networks, studios, and digital brands, taking several to acquisition, including GoTV and Machinima, and has overseen more than 4,000 episodes of television.</p>
          </div>
          <a
            href="https://en.wikipedia.org/wiki/Daniel_Tibbets"
            target="_blank"
            rel="noreferrer"
            data-testid="link-principal-bio"
            className="inline-flex items-center gap-2 mt-8 font-bold text-primary border-b-2 border-primary pb-1 hover:gap-3 transition-all"
          >
            Read Daniel’s full background <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

const firsts: { title: string; body: ReactNode; now: string; cta?: boolean }[] = [
  {
    title: 'Vertical drama',
    body: <>At Fox, Daniel created the mobisode and executive produced the first originals, <em>Love and Hate</em> and <em>Sunset Hotel</em>: serialized vertical drama in short episodes, shot for a phone held upright. He then built GoTV into the largest mobile video network, with 20+ original channels.</>,
    now: 'Now: short-form vertical drama is one of the biggest trends in entertainment. FTSM brings the playbook.',
    cta: true,
  },
  {
    title: 'YouTube',
    body: <>At GoTV, three of YouTube’s first ten ad-revenue-share deals went to Daniel’s music channels: Hip Hop Official, Altitude, and Es Musica. He went on to launch and run BRKDWN, lead content at Machinima, the leading gaming network on the platform, and serve as the first CEO of Smosh.</>,
    now: 'Now: creator-led brands are media companies, and they need operators.',
  },
  {
    title: 'FAST',
    body: <>As President &amp; GM, Daniel made El Rey Network the first cable network to leave cable entirely for FAST, growing viewership and revenue fourfold in a year.</>,
    now: 'Now: rebranded as El Rey Rebel, it’s one of the most-viewed FAST channels, and every legacy network is weighing the same move.',
  },
  {
    title: 'Convergence TV',
    body: <>At Foxlab and 20th Television, Daniel developed and oversaw <em>Classmates</em> with Classmates.com, the first convergence program to air on broadcast television.</>,
    now: 'Now: every brand is a platform play. Daniel was connecting TV and the web before most networks had a website strategy.',
  },
];

function FirstMovers() {
  return (
    <section id="early" className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <p className="mono mb-4 font-extrabold">First movers</p>
        <h2 className="display font-black text-[clamp(3rem,6.4vw,6rem)] leading-[0.9] mb-5">Early, every time.</h2>
        <p className="max-w-[680px] text-xl leading-relaxed mb-14">Four of today’s biggest shifts in how audiences watch, and Daniel was building in each one before it had a name.</p>
        {firsts.map((f, i) => (
          <div key={f.title} className={`flex flex-wrap gap-x-16 gap-y-6 py-9 border-t-2 border-primary-foreground ${i === firsts.length - 1 ? 'pb-0' : ''}`} data-testid={`row-first-${i}`}>
            <h3 className="display font-black flex-[1_1_380px] text-[clamp(2.4rem,4.4vw,4rem)]">{f.title}</h3>
            <div className="flex-[1_1_460px] flex flex-col gap-4 text-lg leading-relaxed">
              <p>{f.body}</p>
              <p className="font-bold">{f.now}</p>
              {f.cta && (
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent('Short-form drama')}`}
                  className="self-start inline-flex items-center min-h-12 px-6 rounded-full bg-primary-foreground text-foreground font-bold hover:opacity-90 transition"
                  data-testid="button-shortform-contact"
                >
                  Talk short-form with Daniel
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const services: [string, string][] = [
  ['Brand revival', 'We take a name with history, put it back in front of an audience, and build the business that makes it pay.'],
  ['Distribution', 'We get your content onto the platforms where the audience is, and negotiate the carriage and revenue-share deals ourselves.'],
  ['FAST strategy & launch', 'Channel concept, carriage, programming, and ad sales, from the team that moved a whole network to FAST and grew it 4x.'],
  ['Short-form & vertical drama', 'Development, production, and monetization of vertical series, from the people who made the first ones.'],
  ['Licensing & partnerships', 'We find the partners who would pay to carry, license, or co-own what you’ve built, and we close the deal.'],
  ['Operating leadership & project management', 'When a brand needs someone in the chair, Daniel steps in as GM, COO, or CEO. When it needs a project delivered, we run it from kickoff to launch.'],
];

function Services() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 pt-24 md:pt-28 pb-10">
      <h2 className="display text-[clamp(2.4rem,4.4vw,4rem)] leading-none mb-4">What we do</h2>
      <p className="lede text-xl max-w-[640px] mb-10">We don’t hand over a deck. We do the work, and we stay until it pays off.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(([t, d], i) => (
          <div key={t} className="bg-card rounded p-8" data-testid={`card-service-${i}`}>
            <h3 className="text-[22px] font-bold leading-snug mb-2.5">{t}</h3>
            <p className="text-[hsl(36_14%_77%)]">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const approach: [string, string][] = [
  ['Read', 'We look at the brand the way a buyer would: audience, rights, catalog, and the money being left on the table.'],
  ['Map', 'We pick the partners, platforms, and deals worth chasing, ranked by effort against upside.'],
  ['Open doors', 'We make the calls, run the negotiations, and shape the terms ourselves.'],
  ['Build', 'We launch it and run it until the deal shows up in the numbers.'],
];

function Approach() {
  return (
    <section id="approach" className="max-w-7xl mx-auto px-6 pt-16 pb-24 md:pb-28">
      <h2 className="display text-[clamp(2.4rem,4.4vw,4rem)] leading-none mb-10">One step, then the next</h2>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {approach.map(([t, d], i) => (
          <li
            key={t}
            className="bg-card p-7 border-t-4 border-primary lg:min-h-[var(--h)]"
            style={{ ['--h' as string]: `${240 + i * 40}px` }}
            data-testid={`card-step-${i}`}
          >
            <p className="display text-[40px] leading-none text-primary mb-2">0{i + 1} {t}</p>
            <p className="text-[hsl(36_14%_77%)]">{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [msg, setMsg] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${name || 'a media brand'}${brand ? ` / ${brand}` : ''}`);
    const body = encodeURIComponent(`Name: ${name}\nBrand: ${brand}\n\n${msg}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };
  const field = 'w-full bg-transparent border-b-2 border-input focus:border-primary outline-none py-3 text-lg placeholder:text-muted-foreground';
  return (
    <section id="contact" className="border-t">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-28 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="display font-black text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.9]">Ready for the <span className="text-primary">next step?</span></h2>
          <p className="lede text-xl mt-6 max-w-md">Tell us about the brand. We’ll tell you what we see.</p>
          <a href={`mailto:${EMAIL}`} data-testid="link-email" className="inline-block mt-6 text-xl md:text-2xl font-bold text-primary underline underline-offset-8 break-all">{EMAIL}</a>
        </div>
        <form onSubmit={submit} className="space-y-8" data-testid="form-contact">
          <label className="block">
            <span className="sr-only">Your name</span>
            <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required data-testid="input-name" />
          </label>
          <label className="block">
            <span className="sr-only">Brand or company</span>
            <input className={field} placeholder="Brand or company" value={brand} onChange={(e) => setBrand(e.target.value)} data-testid="input-brand" />
          </label>
          <label className="block">
            <span className="sr-only">Message</span>
            <textarea className={`${field} resize-none`} rows={4} placeholder="What should we know?" value={msg} onChange={(e) => setMsg(e.target.value)} required data-testid="input-message" />
          </label>
          <button type="submit" data-testid="button-send" className="inline-flex items-center gap-2 min-h-14 px-8 rounded-full bg-primary text-primary-foreground font-bold hover:brightness-110 transition">
            Open in email <ArrowUpRight size={18} aria-hidden="true" />
          </button>
          <p className="text-sm text-muted-foreground">This opens your email app with the message prepared.</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <Wordmark />
          <p className="text-muted-foreground mt-4 text-sm">© From the Stairs Media, LLC</p>
        </div>
        <div className="flex flex-col gap-2 md:items-end text-sm">
          <a href={`${HOME_URL}advisors`} className="hover:text-primary transition-colors">Advisors</a>
          <a href={`mailto:${EMAIL}`} data-testid="link-footer-email" className="hover:text-primary transition-colors">{EMAIL}</a>
          <a href={`${HOME_URL}#top`} data-testid="link-back-top" className="text-muted-foreground hover:text-primary transition-colors">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Thesis />
        <Founder />
        <FirstMovers />
        <Services />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ---------- Routing ---------- */

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/advisors">
          <Nav />
          <main>
            <Advisors />
          </main>
          <Footer />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
