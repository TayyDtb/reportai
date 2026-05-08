import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-16 lg:pb-32 lg:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,white),radial-gradient(900px_circle_at_50%_-10%,rgba(37,99,235,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-6 inline-flex items-center rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            Inspection reports powered by AI
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-headline sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Generate Your Inspection Report in 5 Minutes
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl">
            Turn field notes into professional, structured reports inspectors can ship
            to clients—with less typing and fewer formatting headaches.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/signup"
              className="inline-flex min-w-[160px] items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/92"
            >
              Sign Up
            </Link>
            <Link
              href="/generate"
              className="inline-flex min-w-[160px] items-center justify-center rounded-lg border border-gray-200 bg-white px-7 py-3.5 text-base font-semibold text-headline shadow-sm transition hover:bg-slate-50"
            >
              Generate Report
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="scroll-mt-24 border-y border-gray-100 bg-slate-50/80 px-6 py-24 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headline sm:text-4xl">
              Everything inspectors need to move faster
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Structured workflows, readable output, and a product that respects how
              you already work onsite.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon="⚡"
              title="Draft in minutes"
              description="Paste your observations and receive a coherent, sectioned report tailored to inspection types—minus the repetitive formatting."
            />
            <FeatureCard
              icon="✓"
              title="Professional deliverables"
              description="Executive summary and trades sections laid out cleanly so homeowners and agents can scan findings without confusion."
            />
            <FeatureCard
              icon="◇"
              title="Built for the field"
              description="Residential, commercial, or new construction—standardize narratives while preserving your voice and specificity."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 px-6 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headline sm:text-4xl">
              Simple pricing
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Choose the plan that fits your inspection volume and team.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <PricingCard
              name="Starter"
              price="$29"
              features={[
                "20 reports per month",
                "AI generated reports",
                "Email support"
              ]}
            />
            <PricingCard
              name="Professional"
              price="$59"
              isPopular
              features={[
                "Unlimited reports",
                "AI generated reports",
                "PDF export",
                "Priority support"
              ]}
            />
            <PricingCard
              name="Business"
              price="$99"
              features={[
                "Everything in Professional",
                "Team members",
                "Custom branding",
                "Dedicated support"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer band */}
      <footer className="border-t border-gray-100 bg-slate-50/80 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ReportAI
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <Link href="/signup" className="hover:text-headline">
              Sign up
            </Link>
            <Link href="/login" className="hover:text-headline">
              Log in
            </Link>
            <Link href="/generate" className="hover:text-headline">
              Generate
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: Readonly<{ icon: string; title: string; description: string }>) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:shadow-card">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/15 bg-accent/5 text-xl">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-headline">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  features,
  isPopular = false
}: Readonly<{
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}>) {
  return (
    <div
      className={`rounded-2xl bg-white p-8 shadow-card transition hover:-translate-y-0.5 ${
        isPopular
          ? "border-2 border-accent ring-2 ring-accent/15"
          : "border border-gray-200 ring-1 ring-slate-950/5"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">{name}</p>
        {isPopular ? (
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
            Most Popular
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-headline">{price}</span>
        <span className="text-slate-500">/month</span>
      </div>
      <ul className="mt-6 space-y-3 text-sm text-slate-700">
        {features.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className="mt-8 flex w-full items-center justify-center rounded-lg bg-accent py-3.5 text-base font-semibold text-white shadow-md shadow-accent/20 transition hover:bg-accent/92"
      >
        Get Started
      </Link>
    </div>
  );
}
