import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Hammer,
  PaintRoller,
  Wrench,
  Plug,
  TreePine,
  LayoutGrid,
  Drill,
  Star,
  Phone,
  ShieldCheck,
  Sparkles,
  MapPin,
  Mail,
  Home,
  X,
  Moon,
  Sun,
  Instagram,
  Facebook,
  MessageCircle,
  Send,
} from "lucide-react";
import heroImg from "@/assets/hero-handyman.jpg";
import tileImg from "@/assets/work-tile.jpg";
import paintImg from "@/assets/work-paint.jpg";
import deckImg from "@/assets/work-deck.jpg";
import logoImg from "@/assets/logo.png";
import badgePromise from "@/assets/badge-promise.png.asset.json";
import badge5Star from "@/assets/badge-5star.png.asset.json";
import badgeValue from "@/assets/badge-value.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { icon: Wrench, title: "General Repairs", desc: "Doors, drywall, fixtures — the fixes on your list, checked off in one visit." },
  { icon: PaintRoller, title: "Interior Painting", desc: "Clean lines, no drips, and rooms that feel brand new." },
  { icon: Hammer, title: "Carpentry", desc: "Custom shelving, trim, framing and finish carpentry with a craftsman's eye." },
  { icon: TreePine, title: "Exterior Projects", desc: "Decks, fences and outdoor upgrades built for Canadian winters." },
  { icon: LayoutGrid, title: "Flooring & Tiling", desc: "Backsplashes, bathrooms and floors — laid straight and set to last." },
  { icon: Drill, title: "Plumbing & Electrical", desc: "Faucets, fixtures, outlets and switches. Small jobs done safely." },
  { icon: Sparkles, title: "Home Maintenance", desc: "Seasonal tune-ups that protect your home's value year-round." },
  { icon: Plug, title: "Assembly & Mounting", desc: "TVs, shelves, furniture — level, secure, and out of your way." },
];

const testimonials = [
  { name: "Sarah M.", place: "Barrie, ON", quote: "Booked a Saturday and they arrived on time, worked cleanly, and hauled away every scrap. Best contractor experience I've had.", rating: 5 },
  { name: "Dave K.", place: "Innisfil, ON", quote: "Free estimate was honest — no upsell. They tackled a punch-list of ten things in half a day. Already booked them for the deck.", rating: 5 },
  { name: "Priya R.", place: "Barrie, ON", quote: "Painted our whole main floor. Crisp edges, no smell after a day, furniture back in place. It looks like a completely different home.", rating: 5 },
];

const serviceAreas = [
  "Barrie", "Orillia", "Midland", "Collingwood", "Wasaga Beach", "Alliston",
  "Orangeville", "Bradford", "Newmarket", "Aurora", "Muskoka", "Bracebridge",
  "Gravenhurst", "York Region", "Simcoe County",
];

type Project = {
  img: string;
  title: string;
  tag: string;
  location: string;
  duration: string;
  description: string;
  details: string[];
};

const projects: Project[] = [
  {
    img: tileImg,
    title: "Kitchen backsplash",
    tag: "Tile",
    location: "Barrie, ON",
    duration: "2 days",
    description: "A full herringbone marble backsplash install for a modern kitchen renovation.",
    details: [
      "Removed existing tile and prepped substrate",
      "Precision-cut herringbone marble tile",
      "Sealed grout and edges for lasting finish",
      "Cleanup and haul-away of all debris",
    ],
  },
  {
    img: paintImg,
    title: "Living room refresh",
    tag: "Paint",
    location: "Innisfil, ON",
    duration: "1 day",
    description: "Complete color transformation with premium low-VOC paint and crisp trim work.",
    details: [
      "Wall repair and priming",
      "Two coats of Benjamin Moore Regal Select",
      "Trim, baseboards, and door frames re-cut",
      "Furniture protected and repositioned",
    ],
  },
  {
    img: deckImg,
    title: "Backyard deck build",
    tag: "Exterior",
    location: "Orillia, ON",
    duration: "5 days",
    description: "Custom pressure-treated deck with integrated bench seating and privacy screen.",
    details: [
      "Engineered footings below frost line",
      "Pressure-treated framing with hidden fasteners",
      "Composite decking + cedar privacy screen",
      "Sealed and stained for weather protection",
    ],
  },
];

function Index() {
  const [introDone, setIntroDone] = useState(false);
  const [dark, setDark] = useState(false);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  // Dark mode — default to light unless user explicitly saved dark
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    setDark(saved === "dark");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence>{!introDone && <Intro onDone={() => setIntroDone(true)} />}</AnimatePresence>
      <Header dark={dark} toggleDark={() => setDark((d) => !d)} />
      <Hero />
      <Marquee />
      <Badges />
      <About />
      <Services />
      <Process />
      <Gallery onOpen={setOpenProject} />
      <ServiceAreas />
      <Testimonials />
      <Newsletter />
      <CTA />
      <Footer />
      <AnimatePresence>
        {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
      </AnimatePresence>
    </div>
  );
}

function Intro({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / 1000) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  const done = progress >= 100;
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
    >
      <button
        onClick={onDone}
        className="absolute right-6 top-6 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
      >
        Skip →
      </button>
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-[240px] flex-col items-center gap-4"
      >
        <img src={logoImg} alt="Red Maple Handyman Services" className="h-24 w-auto" />
        <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="absolute inset-y-0 left-0 bg-brand"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80">
          {done ? (
            <>
              <Check className="h-3.5 w-3.5 text-brand" strokeWidth={3} />
              <span>Ready</span>
            </>
          ) : (
            <span>{Math.round(progress)}%</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Header({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur"
    >
      <div className="container-page flex h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={logoImg} alt="Red Maple Handyman Services" className="h-14 w-auto md:h-16" />
        </a>
        <nav className="hidden items-center gap-8 text-sm text-foreground md:flex">
          <a href="#about" className="hover:text-brand transition-colors">About</a>
          <a href="#services" className="hover:text-brand transition-colors">Services</a>
          <a href="#work" className="hover:text-brand transition-colors">Work</a>
          <a href="#areas" className="hover:text-brand transition-colors">Service Area</a>
          <a href="#reviews" className="hover:text-brand transition-colors">Reviews</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5">
            <Phone className="h-4 w-4" /> Free estimate
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col justify-center">
          <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              Serving Barrie, Innisfil & surrounding areas
            </span>
            <OpenStatus />
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="mt-6 font-display text-5xl leading-[1.02] text-foreground md:text-6xl lg:text-7xl">
            The handyman<br />
            your home has<br />
            <span className="italic text-brand">been waiting for.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="mt-6 max-w-xl text-lg text-muted-foreground">
            Reliable repairs, careful craftsmanship, and a satisfaction guarantee — from a local team that treats your home like their own.
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticCTA href="#contact">
              Schedule your appointment
              <ArrowRight className="h-4 w-4" />
            </MagneticCTA>
            <a href="#services" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground hover:border-brand hover:text-brand transition-colors">
              Explore services
            </a>
          </motion.div>
          <motion.a
            {...fadeUp(0.35)}
            href="mailto:brian@thebesthandyman.ca"
            className="group mt-5 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            <Mail className="h-4 w-4 text-brand" />
            <span className="underline-offset-4 group-hover:underline">brian@thebesthandyman.ca</span>
          </motion.a>
          <motion.div {...fadeUp(0.45)} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-6">
            <Stat label="5-star" sub="Google reviews" />
            <Stat label="Fully" sub="insured & bonded" />
            <Stat label="Free" sub="on-site estimates" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-ink/10">
            <img src={heroImg} alt="Red Maple handyman ready for work" width={1600} height={1280} className="h-[560px] w-full object-cover" />
            {/* Quote pinned to top-right */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute right-4 top-4 max-w-[260px] rounded-2xl border border-white/15 bg-ink/70 p-4 text-primary-foreground backdrop-blur-md shadow-xl"
            >
              <div className="flex gap-0.5">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="mt-2 text-xs leading-snug text-white/90">
                "Punctual, tidy, and genuinely skilled."
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/60">— Sarah M., Barrie</p>
            </motion.div>
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 -bottom-6 hidden rounded-2xl border border-border bg-card p-4 shadow-xl md:block"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Satisfaction guaranteed</div>
                <div className="text-xs text-muted-foreground">or we make it right</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Business hours: Mon–Sat 8a–6p (Sun closed)
function computeOpenStatus(now: Date) {
  const day = now.getDay(); // 0=Sun..6=Sat
  const minutes = now.getHours() * 60 + now.getMinutes();
  const openMin = 8 * 60;
  const closeMin = 18 * 60;
  const isBusinessDay = day >= 1 && day <= 6;
  const openNow = isBusinessDay && minutes >= openMin && minutes < closeMin;
  if (openNow) {
    const mins = closeMin - minutes;
    return { openNow: true, label: `Closes in ${formatDuration(mins)}` };
  }
  // find next opening
  let addDays = 0;
  let nextOpenMinutes = 0;
  if (isBusinessDay && minutes < openMin) {
    nextOpenMinutes = openMin - minutes;
  } else {
    // find next Mon–Sat
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      if (d >= 1 && d <= 6) {
        addDays = i;
        break;
      }
    }
    nextOpenMinutes = addDays * 24 * 60 - minutes + openMin;
  }
  return { openNow: false, label: `Opens in ${formatDuration(nextOpenMinutes)}` };
}

function formatDuration(totalMinutes: number) {
  if (totalMinutes < 60) return `${totalMinutes}m`;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h < 24) return m ? `${h}h ${m}m` : `${h}h`;
  const d = Math.floor(h / 24);
  const rh = h % 24;
  return rh ? `${d}d ${rh}h` : `${d}d`;
}

function OpenStatus() {
  const [status, setStatus] = useState(() => computeOpenStatus(new Date()));
  useEffect(() => {
    const id = setInterval(() => setStatus(computeOpenStatus(new Date())), 30000);
    return () => clearInterval(id);
  }, []);
  const color = status.openNow ? "bg-emerald-500" : "bg-red-500";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground">
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${color}`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
      </span>
      <span className="font-medium">{status.openNow ? "Open now" : "Closed"}</span>
      <span className="text-muted-foreground">· {status.label}</span>
    </span>
  );
}

function MagneticCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLAnchorElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    setPos({ x: relX * 0.35, y: relY * 0.5 });
  };
  const reset = () => setPos({ x: 0, y: 0 });
  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className="group relative inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-brand/25"
    >
      <motion.span
        animate={{ x: pos.x * 0.3, y: pos.y * 0.3 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

function Stat({ label, sub }: { label: string; sub: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-foreground">{label}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{sub}</div>
    </div>
  );
}

function Marquee() {
  const items = ["General Repairs", "Painting", "Carpentry", "Plumbing", "Electrical", "Flooring & Tile", "Decks & Fences", "Assembly & Mounting"];
  return (
    <section className="border-y border-border bg-ink text-primary-foreground overflow-hidden">
      <div className="py-4">
        <motion.div
          className="flex gap-10 whitespace-nowrap text-sm"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items, ...items, ...items].map((it, i) => (
            <span key={i} className="flex items-center gap-10 opacity-90">
              {it}
              <span className="h-1 w-1 rounded-full bg-brand" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Badges() {
  const badges = [
    { img: badgePromise.url, title: "Our Promise", desc: "It is our commitment and promise to you that we will only deliver our best customer service and care." },
    { img: badge5Star.url, title: "5-Star Rated", desc: "We have tons of 5-star ratings across the web. A great product with outstanding service — what's not to love?" },
    { img: badgeValue.url, title: "100% Best Value", desc: "Our company provides the most value well beyond the cost and we guarantee the highest level of customer service." },
  ];
  return (
    <section className="py-20 bg-muted">
      <div className="container-page grid gap-6 md:grid-cols-3">
        {badges.map(({ img, title, desc }, i) => (
          <motion.div
            key={title}
            {...fadeUp(i * 0.1)}
            whileHover={{ y: -6 }}
            className="group flex flex-col items-center gap-5 rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-xl"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              className="relative flex h-32 w-32 items-center justify-center"
            >
              <div className="absolute inset-0 -z-10 rounded-full bg-brand/15 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <img src={img} alt={title} className="max-h-32 w-auto object-contain drop-shadow-md" />
            </motion.div>
            <h3 className="font-display text-2xl text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const highlights = [
    "Local, family-run team based in Simcoe County",
    "Over a decade of finish-quality craftsmanship",
    "Fully insured, bonded and background-checked",
    "Transparent quotes — no surprises, ever",
  ];
  return (
    <section id="about" className="py-24">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <motion.div {...fadeUp(0)} className="relative">
          <div className="overflow-hidden rounded-3xl border border-border">
            <img src={paintImg} alt="About Red Maple" className="h-[520px] w-full object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute -right-4 bottom-8 rounded-2xl border border-border bg-card p-5 shadow-xl md:-right-8"
          >
            <div className="font-display text-4xl text-brand">10+</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">years of craft</div>
          </motion.div>
        </motion.div>
        <div>
          <motion.p {...fadeUp(0)} className="text-xs uppercase tracking-[0.2em] text-brand">About us</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="mt-3 font-display text-4xl text-foreground md:text-5xl">
            A trusted crew that treats your home like their own.
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="mt-6 text-lg text-muted-foreground">
            Red Maple Handyman Services was built on a simple belief: homeowners deserve a contractor they can trust with a key. We're the neighbours you can call for the small fixes and the bigger upgrades — reliable, respectful, and always finished on time.
          </motion.p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <motion.li key={h} {...fadeUp(0.3 + i * 0.05)} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {h}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 bg-muted">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div {...fadeUp(0)} className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">What we do</p>
            <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">One trusted crew, every job on your list.</h2>
          </motion.div>
          <motion.p {...fadeUp(0.1)} className="max-w-md text-muted-foreground">
            From a leaky faucet to a full room refresh — bundle it all into one appointment and skip juggling five different trades.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col gap-4 bg-card p-8 transition-colors hover:bg-background"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand transition-all group-hover:bg-brand group-hover:text-primary-foreground group-hover:rotate-6">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Tell us the job", d: "Send a quick message with photos or a short description of what you need done." },
    { n: "02", t: "Get a free estimate", d: "We reply with a fair, transparent quote — usually the same day, no pressure." },
    { n: "03", t: "We show up & finish it", d: "On time, in uniform, with drop cloths down. You approve the work before we leave." },
  ];
  return (
    <section id="process" className="bg-ink py-24 text-primary-foreground">
      <div className="container-page">
        <motion.div {...fadeUp(0)} className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-brand">How it works</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Simple, honest, done.</h2>
          <p className="mt-4 text-white/70">
            No sales pitches, no runaround. Just three straightforward steps between you and a home that finally feels finished.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-colors hover:border-brand/60"
            >
              <div className="font-display text-5xl text-brand">{s.n}</div>
              <h3 className="mt-4 font-display text-xl">{s.t}</h3>
              <p className="mt-2 text-sm text-white/70">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section id="work" className="py-24">
      <div className="container-page">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <motion.div {...fadeUp(0)}>
            <p className="text-xs uppercase tracking-[0.2em] text-brand">Recent work</p>
            <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">A small look at what a good weekend brings.</h2>
            <p className="mt-3 text-sm text-muted-foreground">Click any project to see the details.</p>
          </motion.div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p, i) => (
            <motion.button
              key={p.title}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -6 }}
              onClick={() => onOpen(p)}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card text-left"
            >
              <img src={p.img} alt={p.title} width={900} height={1100} loading="lazy" className="h-[440px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/85 to-transparent p-5 text-primary-foreground">
                <div>
                  <div className="font-display text-lg">{p.title}</div>
                  <div className="text-xs text-white/70">{p.location}</div>
                </div>
                <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs backdrop-blur">{p.tag}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-brand/0 opacity-0 transition-all group-hover:bg-brand/20 group-hover:opacity-100">
                <span className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-primary-foreground shadow-lg">View details →</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-foreground shadow-md transition-transform hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>
        <img src={project.img} alt={project.title} className="h-72 w-full object-cover" />
        <div className="p-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">{project.tag}</span>
            <span className="text-xs text-muted-foreground">{project.location} · {project.duration}</span>
          </div>
          <h3 className="mt-3 font-display text-3xl text-foreground">{project.title}</h3>
          <p className="mt-3 text-muted-foreground">{project.description}</p>
          <ul className="mt-6 grid gap-2">
            {project.details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {d}
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={onClose} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
            Start a similar project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServiceAreas() {
  return (
    <section id="areas" className="py-24 bg-muted">
      <div className="container-page">
        <motion.div {...fadeUp(0)} className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-brand">Where we work</p>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Proudly serving Simcoe County & beyond.</h2>
          <p className="mt-4 text-muted-foreground">If you're nearby, we're on our way. Here are the communities we call home.</p>
        </motion.div>
        <div className="mt-12 flex flex-wrap gap-3">
          {serviceAreas.map((area, i) => (
            <motion.span
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ y: -3, backgroundColor: "var(--brand)", color: "var(--primary-foreground)" }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-sm cursor-default"
            >
              <MapPin className="h-3.5 w-3.5 text-brand" /> {area}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="reviews" className="py-24">
      <div className="container-page">
        <motion.div {...fadeUp(0)} className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-brand">Homeowners in your neighbourhood</p>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Five stars, earned one visit at a time.</h2>
        </motion.div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -6 }}
              className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-xl"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>
              <p className="font-display text-xl leading-snug text-foreground">"{t.quote}"</p>
              <footer className="mt-auto text-sm">
                <div className="font-medium text-foreground">{t.name}</div>
                <div className="text-muted-foreground">{t.place}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="py-20">
      <div className="container-page">
        <motion.div
          {...fadeUp(0)}
          className="relative overflow-hidden rounded-3xl border border-border bg-muted p-10 md:p-14"
        >
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand">Stay in the loop</p>
              <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">Seasonal home tips, straight to your inbox.</h2>
              <p className="mt-3 text-muted-foreground">Occasional emails on maintenance checklists, seasonal specials, and homeowner tips. No spam, ever.</p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                {sent ? "Subscribed ✓" : (<>Subscribe <Send className="h-4 w-4" /></>)}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  const perks = ["Free on-site estimate", "Fully insured & bonded", "Clean, uniformed technicians", "Satisfaction guaranteed"];
  return (
    <section id="contact" className="py-24">
      <div className="container-page">
        <motion.div {...fadeUp(0)} className="overflow-hidden rounded-[2rem] bg-brand text-primary-foreground">
          <div className="grid gap-10 p-10 md:grid-cols-[1.2fr_1fr] md:p-16">
            <div>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">
                Ready for a home<br />that finally feels finished?
              </h2>
              <p className="mt-6 max-w-lg text-white/85">
                Tell us what needs doing. We'll send back an honest, fixed-price estimate — usually the same day.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <form className="flex flex-col gap-4 rounded-2xl bg-white/10 p-6 backdrop-blur" onSubmit={(e) => e.preventDefault()}>
              <Field icon={<Home className="h-4 w-4" />} label="Your name" placeholder="Jane Homeowner" />
              <Field icon={<Mail className="h-4 w-4" />} type="email" label="Email" placeholder="jane@email.com" />
              <Field icon={<Phone className="h-4 w-4" />} type="tel" label="Phone" placeholder="705-555-0134" />
              <Field icon={<MapPin className="h-4 w-4" />} label="Service address" placeholder="123 Main St, Barrie ON" />
              <label className="grid gap-1.5 text-sm">
                <span className="text-white/80">What do you need done?</span>
                <textarea rows={3} className="resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-primary-foreground placeholder-white/50 outline-none focus:border-white" placeholder="Mount a TV, fix a leaky faucet, paint the hallway…" />
              </label>
              <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
                Request my free estimate <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ icon, label, placeholder, type = "text" }: { icon: React.ReactNode; label: string; placeholder: string; type?: string }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="text-white/80">{label}</span>
      <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 focus-within:border-white">
        <span className="text-white/60">{icon}</span>
        <input type={type} placeholder={placeholder} className="w-full bg-transparent py-3 text-primary-foreground placeholder-white/50 outline-none" />
      </div>
    </label>
  );
}

function Footer() {
  const socials = [
    { icon: MessageCircle, href: "https://api.whatsapp.com/send/?phone=7057960559&text&type=phone_number&app_absent=0", label: "WhatsApp" },
    { icon: Mail, href: "mailto:brian@thebesthandyman.ca", label: "Email" },
    { icon: Instagram, href: "https://www.instagram.com/thebesthandyman.ca", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/thebesthandyman.ca", label: "Facebook" },
  ];
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page grid gap-8 py-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <img src={logoImg} alt="Red Maple Handyman Services" className="h-12 w-auto" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Trusted, local handyman service for homeowners across Barrie, Innisfil and surrounding areas.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-all hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Services" items={["Repairs", "Painting", "Carpentry", "Plumbing"]} />
        <FooterCol title="Company" items={["About", "Reviews", "Service area", "Contact"]} />
        <FooterCol title="Get in touch" items={["Barrie, ON", "Innisfil, ON", "Mon–Sat · 8a–6p", "brian@thebesthandyman.ca"]} />
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <span>© Copyright 2025 | All Rights Reserved | Red Maple Handyman Services is a division of XP Group Inc.</span>
          <a
            href="https://samstudios.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="tracking-wider transition-colors hover:text-brand"
          >
            SAM Studios® MMXXIV | PROJECT AA-01
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-foreground">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}
