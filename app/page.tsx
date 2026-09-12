import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import ProofWidget from "@/components/proof/ProofWidget";
import ProjectGallery from "@/components/projects/ProjectGallery";
import Telemetry from "@/components/telemetry/Telemetry";
import AlgoStats from "@/components/AlgoStats";
import CurrentlyBuilding from "@/components/currently/CurrentlyBuilding";
import Landing from "@/components/landing/Landing";
import { getGithubData, relativeTimeFromNow } from "@/lib/github";

export default async function Home() {
  const github = await getGithubData();
  const lastPushRelative =
    github.repos.length > 0 ? relativeTimeFromNow(github.repos[0].pushed_at) : null;
  const publicRepos = github.user?.public_repos ?? null;

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofWidget
          publicRepos={publicRepos}
          lastPushRelative={lastPushRelative}
          live={github.fetchedLive}
        />
        <ProjectGallery />
        <Telemetry
          publicRepos={publicRepos}
          lastPushRelative={lastPushRelative}
          live={github.fetchedLive}
        />
        <AlgoStats stats={[]} />
        <CurrentlyBuilding repos={github.repos} />
        <Landing />
      </main>
    </>
  );
}
