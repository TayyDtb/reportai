"use client";

import Link from "next/link";
import { FormEvent } from "react";

export default function LoginPage() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col bg-slate-50/80 px-6 py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-headline">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-600">
            Log in to continue to ReportAI.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-card sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-headline">
                Email
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-headline outline-none ring-offset-2 transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="you@company.com"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-headline">
                Password
              </span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-headline outline-none ring-offset-2 transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="••••••••"
              />
            </label>
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-accent py-3 text-base font-semibold text-white shadow-sm shadow-accent/25 transition hover:bg-accent/92"
            >
              Log In
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-accent hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
