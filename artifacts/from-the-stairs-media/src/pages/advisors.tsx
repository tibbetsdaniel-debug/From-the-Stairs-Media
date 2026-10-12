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
      <p className="mono text-primary mb-8">From the Stairs Media / Advisors</p>
      <h1 className="display text-6xl md:text-8xl font-light mb-16 md:mb-24">Our <span className="italic text-primary">advisors.</span></h1>
      <div className="border-t border-b py-10 md:py-14 flex flex-col md:flex-row md:items-baseline justify-between gap-6" data-testid="advisor-bob-schwartz">
        <h2 className="display text-4xl md:text-6xl font-light">Bob Schwartz</h2>
        <p className="mono text-muted-foreground">Advisor</p>
      </div>
    </section>
  );
}
