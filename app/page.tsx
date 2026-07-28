export default function Home() {
  const projects = [
    {
      title: "Student Planner",
      description:
        "A lightweight student planning app to track exams, assignments, and upcoming tasks with search, filters, localStorage persistence, and JSON export/import.",
      tech: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
      live: "https://student-planner-gules.vercel.app/",
      code: "https://github.com/bahattinbober/student-planner",
    },
    {
      title: "Visual Feature Mind-Mapper",
      description:
        "An interactive mind-mapping tool with draggable nodes, connections, auto-layout, undo/redo shortcuts, zoom/pan, localStorage persistence, and export.",
      tech: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
      live: "https://mind-mapper-app.vercel.app",
      code: "https://github.com/bahattinbober/visual-feature-mind-mapper",
    },
    {
      title: "VadeBekçisi",
      description:
        "A B2B SaaS platform for tracking legal renewal deadlines (business registry, insurance, licenses, permits) for SMEs and accounting firms in Turkey. Features multi-tenant architecture with strict data isolation, JWT authentication, automated email notifications via cron, and AI-powered data extraction from unstructured text.",
      tech: ["Node.js", "Express", "PostgreSQL", "React", "Prisma"],
      live: "https://vadebekcisi.vercel.app",
      code: "https://github.com/bahattinbober/vadebekcisi",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <main className="mx-auto max-w-5xl px-4 py-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for internship / junior roles
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Bahattin Bober
          </h1>

          <p className="max-w-2xl text-slate-600">
            Computer Engineering student focused on frontend development (React /
            Next.js) and building practical web apps.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://github.com/bahattinbober"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/bahattin-bober/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50"
            >
              LinkedIn
            </a>
            <a
              href="mailto:boberbahattin@gmail.com"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
            >
              Email me
            </a>
          </div>
        </header>

        <section className="mt-12">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-xl font-semibold">Projects</h2>
            <p className="text-sm text-slate-500">Live demos + source code</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                </div>

                <p className="mt-2 text-sm text-slate-600">{p.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
                  >
                    Live Demo
                  </a>
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-14 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} Bahattin Bober</span>
            <span>Built with Next.js + Tailwind</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
