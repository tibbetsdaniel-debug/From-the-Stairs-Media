import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';
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

function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M2 30V22H10V14H18V6H30V30Z" fill="hsl(var(--primary))" />
    </svg>
  );
}

function Wordmark() {
  return (
    <a href={`${HOME_URL}#top`} data-testid="link-home" className="flex items-center gap-3">
      <Mark />
      <span className="display text-xl leading-none">
        From the Stairs<span className="italic text-primary"> Media</span>
      </span>
    </a>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

const links = [
  ['Thesis', '#thesis'],
  ['Capabilities', '#capabilities'],
  ['Approach', '#approach'],
  ['Principal', '#principal'],
  ['Partners', '#partners'],
  ['Companies', '#companies'],
  ['Advisors', 'advisors'],
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/75 border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Wordmark />
        <nav className="hidden xl:flex items-center gap-5">
          {links.map(([l, h]) => (
            <a key={h} href={`${HOME_URL}${h}`} data-testid={`link-nav-${l.toLowerCase()}`} className="mono text-muted-foreground hover:text-primary transition-colors">{l}</a>
          ))}
          <a href={`${HOME_URL}#contact`} data-testid="button-nav-contact" className="mono bg-primary text-primary-foreground px-4 py-2 hover:-translate-y-0.5 transition-transform">Start a conversation</a>
        </nav>
        <button className="xl:hidden" onClick={() => setOpen(!open)} data-testid="button-menu" aria-label="Menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="xl:hidden border-t bg-background px-6 py-6 flex flex-col gap-5">
          {[...links, ['Contact', '#contact']].map(([l, h]) => (
            <a key={h} href={`${HOME_URL}${h}`} onClick={() => setOpen(false)} className="display text-3xl" data-testid={`link-mobile-${l.toLowerCase()}`}>{l}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const steps = [0, 1, 2, 3, 4];
  return (
    <section id="top" className="relative min-h-[100dvh] pt-32 pb-0 overflow-hidden flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <p className="mono text-primary mb-8">
          Strategic growth partner / Media brands
        </p>
        <h1 className="display text-[clamp(3.2rem,10.5vw,10rem)] font-light max-w-6xl">
          <span className="block">Taking Media</span>
          <span className="block">Brands to Their</span>
          <span className="block italic text-primary">Next Step.</span>
        </h1>
        <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-8 items-end max-w-6xl">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            We help media brands unlock new revenue opportunities through strategic partnerships, distribution, licensing, audience growth, and brand revitalization.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#contact" data-testid="button-hero-contact" className="mono bg-primary text-primary-foreground px-6 py-4 flex items-center gap-2 hover:-translate-y-0.5 transition-transform">Talk to us <ArrowUpRight size={14} /></a>
            <a href="#capabilities" data-testid="button-hero-capabilities" className="mono border px-6 py-4 hover:border-primary hover:text-primary transition-colors">What we do</a>
          </div>
        </div>
      </div>
      <div className="flex items-end h-40 md:h-56 mt-14 w-full">
        {steps.map((s) => (
          <div
            key={s}
            className="flex-1 border-t border-r origin-bottom transition-[height] duration-700 ease-out"
            style={{
              height: `${28 + s * 18}%`,
              background: s === 4 ? 'hsl(var(--primary))' : `hsl(216 26% ${13 + s * 2}%)`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

const caps = [
  'Brand revitalization',
  'Revenue strategy',
  'Distribution & audience growth',
  'Licensing & partnerships',
];

function Strip() {
  const row = [...caps, ...caps, ...caps, ...caps];
  return (
    <div className="bg-card text-primary overflow-hidden py-4 border-y">
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((c, i) => (
          <span key={i} className="display text-2xl italic flex items-center gap-10">{c}<Mark size={14} /></span>
        ))}
      </div>
    </div>
  );
}

function Thesis() {
  return (
    <section id="thesis" className="max-w-7xl mx-auto px-6 py-28 md:py-40 grid md:grid-cols-12 gap-10">
      <Reveal className="md:col-span-3"><p className="mono text-primary">01 / Thesis</p></Reveal>
      <div className="md:col-span-9">
        <Reveal>
          <p className="display text-4xl md:text-6xl font-light">
            Most media brands are worth more than their <span className="italic text-primary">current business model</span> admits.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 mt-14 text-lg text-muted-foreground leading-relaxed">
          <Reveal delay={0.1}><p>A name audiences trust. A catalog nobody has re-examined. A format other platforms would pay to carry. Value hides in plain sight, usually because the team inside is busy running the thing.</p></Reveal>
          <Reveal delay={0.2}><p>We are media operators. We read a brand the way a buyer, a distributor, or a licensee would, find what is underused, and build the deals and audience paths that move it up a step.</p></Reveal>
        </div>
      </div>
    </section>
  );
}

const capDetail = [
  ['Brand Revitalization', 'Helping established media brands find new life and new audiences.'],
  ['Revenue Strategy', 'Identifying untapped opportunities hidden within existing assets.'],
  ['Distribution & Audience Growth', 'Expanding reach through modern platforms and partnerships.'],
  ['Licensing & Partnerships', 'Building new revenue streams through strategic business development.'],
];

function Capabilities() {
  const [active, setActive] = useState(0);
  return (
    <section id="capabilities" className="bg-card border-y py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><p className="mono text-primary mb-6">02 / Capabilities</p></Reveal>
        <Reveal><h2 className="display text-5xl md:text-7xl font-light max-w-4xl mb-16">What we do.</h2></Reveal>
        <div className="border-t">
          {capDetail.map(([t, d], i) => {
            const on = active === i;
            return (
              <button key={t} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} data-testid={`button-capability-${i}`}
                className="w-full text-left border-b group block" style={{ paddingLeft: `${i * 2}%` }}>
                <div className="flex items-baseline gap-6 py-6 md:py-8">
                  <span className={`mono transition-colors ${on ? 'text-primary' : 'text-muted-foreground'}`}>0{i + 1}</span>
                  <span className={`display text-3xl md:text-6xl font-light transition-all duration-500 ${on ? 'text-primary italic translate-x-3' : ''}`}>{t}</span>
                </div>
                <motion.div initial={false} animate={{ height: on ? 'auto' : 0, opacity: on ? 1 : 0 }} className="overflow-hidden">
                  <p className="pb-8 pl-14 md:pl-20 max-w-2xl text-muted-foreground text-lg leading-relaxed">{d}</p>
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const approach = [
  ['Read', 'We assess the brand as an outsider-buyer would: audience, assets, rights, positioning, and where revenue is not being captured.'],
  ['Map', 'We identify the specific partners, platforms, and licensing paths that fit, and rank them by effort against upside.'],
  ['Open doors', 'We make the introductions and shape the terms, working alongside your team rather than around it.'],
  ['Build', 'We help turn agreements into operating momentum: launches, audience plans, and the follow-through that makes a deal real.'],
];

function Approach() {
  return (
    <section id="approach" className="max-w-7xl mx-auto px-6 py-28 md:py-40">
      <Reveal><p className="mono text-primary mb-6">03 / Approach</p></Reveal>
      <Reveal><h2 className="display text-5xl md:text-7xl font-light max-w-3xl mb-20">One step, then <span className="italic">the next.</span></h2></Reveal>
      <div className="grid md:grid-cols-4 gap-4 items-end">
        {approach.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className="border p-6 bg-card hover:border-primary transition-colors" style={{ minHeight: `${15 + i * 3.5}rem` }} data-testid={`card-step-${i}`}>
              <p className="display text-7xl text-primary/90 mb-6">{i + 1}</p>
              <h3 className="display text-3xl mb-3">{t}</h3>
              <p className="text-muted-foreground leading-relaxed">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Principal() {
  return (
    <section id="principal" className="bg-card border-y py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-10 items-end">
        <Reveal className="md:col-span-3">
          <p className="mono text-primary">04 / Principal</p>
        </Reveal>
        <div className="md:col-span-9">
          <Reveal>
            <h2 className="display text-5xl md:text-7xl font-light">Daniel Tibbets</h2>
            <p className="text-muted-foreground text-lg mt-5">Media executive</p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="https://en.wikipedia.org/wiki/Daniel_Tibbets"
              target="_blank"
              rel="noreferrer"
              data-testid="link-principal-bio"
              className="mono text-primary inline-flex mt-8 border-b border-primary pb-2 hover:gap-3 gap-2 transition-all"
            >
              Read Daniel’s background <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const partners = [
  ['Publishers and magazines', 'Established titles with equity to extend.'],
  ['Podcasts and audio', 'Shows and networks ready for wider carriage.'],
  ['Video, film, and television', 'Libraries and formats that deserve a second window.'],
  ['Newsletters and digital', 'Independent voices ready to scale beyond one channel.'],
  ['Events and live', 'Gatherings that can become year-round brands.'],
  ['Legacy brands', 'Names with history and a dormant audience.'],
];

function Partners() {
  return (
    <section id="partners" className="bg-foreground text-background py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Reveal><p className="mono mb-6" style={{ color: 'hsl(200 40% 30%)' }}>05 / Who we work with</p></Reveal>
          <Reveal><h2 className="display text-5xl md:text-7xl font-light">Built for brands that <span className="italic">already mean something.</span></h2></Reveal>
        </div>
        <div className="md:col-span-7 border-t border-background/20">
          {partners.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.05}>
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 py-6 border-b border-background/20 hover:pl-4 transition-all duration-500" data-testid={`row-partner-${i}`}>
                <h3 className="display text-2xl md:text-3xl">{t}</h3>
                <p className="md:max-w-xs md:text-right" style={{ color: 'hsl(200 20% 28%)' }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const companies = [
  'Subnation',
  'Odyssey Impact',
  'Gray Matters Digital / PropQwiz',
  'El Rey Rebel',
  'Lucha Underground',
  'Gate 52',
  'Dooya Media Group',
  'Pen Ultimate',
];

function Companies() {
  return (
    <section id="companies" className="max-w-7xl mx-auto px-6 py-28 md:py-36">
      <Reveal><p className="mono text-primary mb-6">06 / Companies</p></Reveal>
      <Reveal>
        <h2 className="display text-5xl md:text-7xl font-light max-w-4xl mb-16">
          Companies we’ve worked with.
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l">
        {companies.map((company, i) => (
          <Reveal key={company} delay={i * 0.04}>
            <div
              className="min-h-28 md:min-h-36 border-r border-b p-5 md:p-8 flex items-center display text-xl md:text-2xl break-words hover:text-primary transition-colors"
              data-testid={`company-${i}`}
            >
              {company}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Principles() {
  const p = [
    ['Operators, not observers', 'We think in rights, margins, and relationships, not decks.'],
    ['Brand first', 'Revenue that costs a brand its identity is borrowed money.'],
    ['Plain terms', 'Clear scope, clear incentives, no mystery in how we work.'],
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-28 md:py-36">
      <Reveal><p className="mono text-primary mb-12">07 / How we think</p></Reveal>
      <div className="grid md:grid-cols-3 gap-12">
        {p.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className="border-t-2 border-primary pt-6">
              <h3 className="display text-3xl mb-4 italic">{t}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
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
  const field = 'w-full bg-transparent border-b-2 border-foreground/30 focus:border-primary outline-none py-3 text-lg placeholder:text-muted-foreground';
  return (
    <section id="contact" className="bg-card text-foreground border-y py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <Reveal><p className="mono text-primary mb-6">08 / Contact</p></Reveal>
          <Reveal><h2 className="display text-6xl md:text-8xl font-light">Ready for the <span className="italic">next step?</span></h2></Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl mt-8 max-w-md">Tell us about the brand. We will tell you what we see.</p>
            <a href={`mailto:${EMAIL}`} data-testid="link-email" className="display text-primary text-2xl md:text-3xl mt-6 inline-block underline underline-offset-8 break-all">{EMAIL}</a>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <form onSubmit={submit} className="space-y-8" data-testid="form-contact">
            <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required data-testid="input-name" />
            <input className={field} placeholder="Brand or company" value={brand} onChange={(e) => setBrand(e.target.value)} data-testid="input-brand" />
            <textarea className={field + ' resize-none'} rows={4} placeholder="What should we know?" value={msg} onChange={(e) => setMsg(e.target.value)} required data-testid="input-message" />
            <button type="submit" data-testid="button-send" className="mono bg-primary text-primary-foreground px-8 py-5 flex items-center gap-2 hover:-translate-y-0.5 transition-transform">
              Open in email <ArrowUpRight size={14} />
            </button>
            <p className="text-sm text-muted-foreground">This opens your email app with the message prepared.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row justify-between gap-8">
      <div>
        <Wordmark />
        <p className="text-muted-foreground mt-4 text-sm">From the Stairs Media, LLC. FTSM.</p>
      </div>
      <div className="flex flex-col gap-2 md:items-end text-sm">
        <a href={`${HOME_URL}advisors`} className="hover:text-primary transition-colors">Advisors</a>
        <a href={`mailto:${EMAIL}`} data-testid="link-footer-email" className="hover:text-primary transition-colors">{EMAIL}</a>
        <a href="#top" data-testid="link-back-top" className="mono text-muted-foreground hover:text-primary">Back to top</a>
        <p className="text-muted-foreground">fromthestairsmedia.com</p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Strip />
      <Thesis />
      <Capabilities />
      <Approach />
      <Principal />
      <Partners />
      <Companies />
      <Principles />
      <Contact />
      <Footer />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/advisors">
          <main>
            <Nav />
            <Advisors />
            <Footer />
          </main>
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
