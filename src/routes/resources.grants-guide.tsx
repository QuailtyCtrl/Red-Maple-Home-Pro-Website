import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL = "https://redmaple-home-hero.lovable.app/resources/grants-guide";

export const Route = createFileRoute("/resources/grants-guide")({
  component: GrantsGuidePage,
  head: () => ({
    meta: [
      { title: "Simcoe County Renovation Grants & Home Improvement Rebates (2025–2026)" },
      {
        name: "description",
        content:
          "A homeowner's guide to home improvement grants and rebates in Simcoe County & Ontario for 2025–2026 — energy retrofits, accessibility, seniors, and municipal programs.",
      },
      { property: "og:title", content: "Simcoe County Home Improvement Grants & Rebates — 2025–2026 Guide" },
      {
        property: "og:description",
        content:
          "Ontario and Simcoe County grants, loans and rebates that help homeowners fund repairs, energy upgrades and accessibility renovations.",
      },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Simcoe County Renovation Grants & Home Improvement Rebates (2025–2026)",
          description:
            "A homeowner's guide to home improvement grants and rebates in Simcoe County and Ontario for 2025–2026.",
          author: { "@type": "Organization", name: "Red Maple Handyman Services" },
          publisher: {
            "@type": "Organization",
            name: "Red Maple Handyman Services",
            logo: {
              "@type": "ImageObject",
              url: "https://redmaple-home-hero.lovable.app/favicon.png",
            },
          },
          mainEntityOfPage: CANONICAL,
        }),
      },
    ],
  }),
});

type Program = {
  name: string;
  who: string;
  what: string;
  covers: string;
  link?: { label: string; href: string };
};

const PROGRAMS: { section: string; blurb: string; items: Program[] }[] = [
  {
    section: "Province-wide programs (Ontario)",
    blurb:
      "These programs are open to eligible Ontario homeowners, including everyone in Simcoe County.",
    items: [
      {
        name: "Canada Greener Homes Loan",
        who: "Homeowners planning energy-efficiency retrofits.",
        what: "Interest-free loan of up to $40,000 (10-year term) to fund eligible retrofits identified in an EnerGuide home evaluation.",
        covers:
          "Insulation, air sealing, high-efficiency windows and doors, heat pumps, and solar.",
        link: {
          label: "Natural Resources Canada — Greener Homes Loan",
          href: "https://natural-resources.canada.ca/energy-efficiency/homes/canada-greener-homes-initiative/canada-greener-homes-loan",
        },
      },
      {
        name: "Home Efficiency Rebate Plus (HER+) / Enbridge Home Efficiency Rebate",
        who: "Enbridge Gas customers in Ontario.",
        what: "Rebates of up to $10,000 for eligible home retrofits, plus a pre- and post-retrofit energy assessment.",
        covers:
          "Insulation, air sealing, windows, and high-efficiency heating equipment.",
        link: {
          label: "Enbridge Gas — Home Efficiency Rebate Plus",
          href: "https://www.enbridgegas.com/residential/rebates-energy-conservation/home-efficiency-rebate-plus",
        },
      },
      {
        name: "Ontario Renovates",
        who: "Lower-income homeowners in participating municipalities.",
        what: "Forgivable loans for essential home repairs and accessibility modifications, delivered through the local Service Manager.",
        covers:
          "Roofing, plumbing, electrical, heating, accessibility ramps and bathroom modifications.",
      },
      {
        name: "Home & Vehicle Modification Program",
        who: "Ontarians with a substantial physical disability.",
        what: "Up to $15,000 for home modifications that increase independence and mobility.",
        covers: "Ramps, lifts, accessible bathrooms, doorway widening.",
        link: {
          label: "March of Dimes Canada — HVMP",
          href: "https://www.marchofdimes.ca/en-ca/programs/haf/hvmp",
        },
      },
      {
        name: "Multigenerational Home Renovation Tax Credit",
        who: "Households building a secondary unit for a senior or adult with a disability.",
        what: "Refundable federal tax credit worth 15% of eligible expenses, up to $7,500.",
        covers: "Secondary suites and in-law suites built as part of the same home.",
      },
      {
        name: "Home Accessibility Tax Credit (HATC)",
        who: "Seniors 65+ and people eligible for the Disability Tax Credit.",
        what: "Non-refundable federal tax credit of 15% on up to $20,000 of eligible renovation costs.",
        covers: "Grab bars, walk-in tubs, ramps, widened doorways.",
      },
    ],
  },
  {
    section: "Simcoe County & municipal programs",
    blurb:
      "Simcoe County is the Service Manager for Barrie, Orillia, Innisfil, Bradford West Gwillimbury, New Tecumseth and the rest of the county. Local programs are delivered through County Housing.",
    items: [
      {
        name: "Simcoe County Homeownership Program",
        who: "Renters buying their first home in the county under income limits.",
        what: "10% down-payment assistance loan, forgivable over 20 years.",
        covers:
          "Not a renovation grant on its own, but stretches your budget to afford post-purchase repairs.",
        link: {
          label: "County of Simcoe — Housing programs",
          href: "https://www.simcoe.ca/dpt/sh",
        },
      },
      {
        name: "Ontario Renovates (delivered by County of Simcoe)",
        who: "Lower-income homeowners in Simcoe County, Barrie or Orillia.",
        what: "Forgivable loan for essential repairs and accessibility upgrades to keep homes safe and livable.",
        covers:
          "Structural repairs, heating, plumbing, electrical, roofing, and accessibility work.",
        link: {
          label: "County of Simcoe — Housing programs",
          href: "https://www.simcoe.ca/dpt/sh",
        },
      },
      {
        name: "Barrie Water Efficiency & Downspout programs",
        who: "City of Barrie residents.",
        what: "Rebates for high-efficiency toilets and support for downspout disconnection to reduce basement flooding.",
        covers: "Plumbing upgrades and exterior drainage.",
      },
      {
        name: "Local heritage grants",
        who: "Owners of designated heritage properties in Barrie, Orillia, Collingwood and other Simcoe municipalities.",
        what: "Matching grants for the restoration of heritage features.",
        covers: "Windows, siding, masonry, roofing on designated properties.",
      },
    ],
  },
  {
    section: "Seniors & accessibility",
    blurb:
      "If you or a family member is aging in place, stack these with the Ontario Renovates and provincial tax credits above.",
    items: [
      {
        name: "Ontario Seniors Care at Home Tax Credit",
        who: "Ontarians 70+.",
        what: "Refundable credit worth 25% of eligible medical expenses (up to $6,000), which can include some home accessibility costs.",
        covers: "Bathroom safety equipment, mobility aids, some renovations tied to medical needs.",
      },
      {
        name: "March of Dimes — Assistive Devices Program",
        who: "Ontarians with long-term physical disabilities.",
        what: "Cost-sharing for approved assistive devices and small home modifications.",
        covers: "Ramps, grab bars, stair lifts.",
      },
    ],
  },
];

const CHECKLIST = [
  "Get an EnerGuide evaluation before you start energy retrofits — most rebates require pre- and post-audits.",
  "Keep every invoice and permit; grants and tax credits both require documentation.",
  "Ask your contractor for a written scope that matches the grant's eligible-work list.",
  "Combine programs where allowed — Greener Homes Loan often stacks with HER+ rebates.",
  "Apply before work starts. Almost every grant requires approval before you break ground.",
];

function GrantsGuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border">
        <div className="container-page py-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Red Maple Handyman
          </Link>
        </div>
      </div>

      <article className="container-page max-w-3xl py-16">
        <header className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wide text-brand">Homeowner Resources</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
            Simcoe County Renovation Grants & Home Improvement Rebates (2025–2026)
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A practical guide to home improvement grants, rebates and tax credits available to
            homeowners in Barrie, Innisfil, Orillia, Bradford and the rest of Simcoe County — plus
            province-wide Ontario programs you can stack on top.
          </p>
        </header>

        <section className="prose prose-neutral max-w-none dark:prose-invert">
          <p>
            Home repairs and upgrades are easier to justify when a chunk of the cost is covered.
            Between federal, provincial and County of Simcoe programs there are still meaningful
            dollars available to Ontario homeowners in 2025 and 2026 — from interest-free energy
            loans to forgivable repair loans for lower-income households and accessibility grants
            for seniors. This guide summarizes the programs Red Maple Handyman customers ask about
            most, in plain language.
          </p>
          <p className="text-sm italic text-muted-foreground">
            Program details change. Confirm eligibility, current funding and deadlines with each
            program before you spend money. Red Maple Handyman Services is not affiliated with any
            of the programs below.
          </p>
        </section>

        {PROGRAMS.map((group) => (
          <section key={group.section} className="mt-14">
            <h2 className="font-display text-2xl">{group.section}</h2>
            <p className="mt-2 text-muted-foreground">{group.blurb}</p>
            <div className="mt-6 space-y-6">
              {group.items.map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <h3 className="font-display text-xl text-foreground">{p.name}</h3>
                  <dl className="mt-3 grid gap-3 text-sm">
                    <div>
                      <dt className="font-medium text-foreground">Who it's for</dt>
                      <dd className="text-muted-foreground">{p.who}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">What you get</dt>
                      <dd className="text-muted-foreground">{p.what}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Typical work covered</dt>
                      <dd className="text-muted-foreground">{p.covers}</dd>
                    </div>
                  </dl>
                  {p.link && (
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-sm font-medium text-brand hover:underline"
                    >
                      {p.link.label} ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-14">
          <h2 className="font-display text-2xl">Before you apply — a quick checklist</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            {CHECKLIST.map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 rounded-3xl border border-border bg-muted p-8">
          <h2 className="font-display text-2xl">Need help scoping the work?</h2>
          <p className="mt-2 text-muted-foreground">
            Most grants ask for a written scope of work and a licensed contractor's quote. Red Maple
            Handyman Services helps homeowners in Barrie, Innisfil and across Simcoe County line up
            paperwork-ready quotes for repairs, energy upgrades and accessibility renovations.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Request a free estimate
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              See our services
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
