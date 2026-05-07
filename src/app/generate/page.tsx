import { GenerateReport } from "./generate-report";

export default function GeneratePage() {
  return (
    <>
      <div className="border-b border-gray-100 bg-slate-50/80">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-headline md:text-4xl">
            Generate inspection report
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            Add notes and property details—ReportAI drafts structured sections so you can
            review and finalize faster.
          </p>
        </div>
      </div>
      <main className="px-6 py-14">
        <div className="mx-auto flex max-w-3xl justify-center">
          <GenerateReport />
        </div>
      </main>
    </>
  );
}
