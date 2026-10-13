import { useEffect } from 'react';

export default function Advisors() {
  useEffect(() => {
    const previousTitle = document.title;
    const title = 'Advisors | From the Stairs Media';
    const description = 'Meet the advisors to From the Stairs Media, including Bob Schwartz.';
    document.title = title;
    const updates = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', 'https://fromthestairsmedia.com/advisors'],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
    ];
    const originals = updates.map(([selector, content]) => {
      const element = document.querySelector(selector);
      const original = element?.getAttribute('content') ?? '';
      element?.setAttribute('content', content);
      return { element, original };
    });
    return () => {
      document.title = previousTitle;
      originals.forEach(({ element, original }) => element?.setAttribute('content', original));
    };
  }, []);

  return (
    <section id="top" className="max-w-7xl mx-auto px-6 pt-36 pb-28 md:pt-44 md:pb-36 min-h-[75dvh]">
      <p className="mono text-primary mb-6">Advisors</p>
      <h1 className="display font-black text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] mb-16 md:mb-24">Our <span className="text-primary">advisors.</span></h1>
      <div className="border-t border-b py-10 md:py-14 flex flex-col md:flex-row md:items-baseline justify-between gap-6" data-testid="advisor-bob-schwartz">
        <h2 className="display text-5xl md:text-7xl">Bob Schwartz</h2>
        <p className="mono text-muted-foreground">Advisor</p>
      </div>
    </section>
  );
}
