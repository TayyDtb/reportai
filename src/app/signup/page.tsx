import { SignUpForm } from "./signup-form";

export default function SignUpPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] justify-center bg-slate-50/80 px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-headline md:text-4xl">
            Join ReportAI
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Home inspection reports, faster—with the same professionalism your
            clients expect.
          </p>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
