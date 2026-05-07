"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export function SignUpForm() {
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-card sm:p-10">
        <p
          role="status"
          className="rounded-xl border border-accent/15 bg-accent/5 px-6 py-5 text-center text-base font-semibold text-headline"
        >
          Welcome to ReportAI! We&apos;ll be in touch shortly.
        </p>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm font-semibold text-accent hover:underline"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-card sm:p-10">
      <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-accent">
        Create your account
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-sm font-medium text-headline">
              First Name
            </span>
            <input
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-headline outline-none transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="Jane"
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-sm font-medium text-headline">
              Last Name
            </span>
            <input
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-headline outline-none transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="Doe"
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-headline">
            Email
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-headline outline-none transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
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
            autoComplete="new-password"
            required
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-headline outline-none transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
            placeholder="••••••••"
          />
        </label>
        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-accent py-3 text-base font-semibold text-white shadow-sm shadow-accent/25 transition hover:bg-accent/92"
        >
          Create Account
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-accent hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
