// src/app/missao/page.tsx

import Container from "@/components/molecules/Container";
import MissionHero from "@/components/organisms/MissionHero";
import MissionManifesto from "@/components/organisms/MissionManifesto";
import MissionHistory from "@/components/organisms/MissionHistory";
import MissionTeam from "@/components/organisms/MissionTeam";

/**
 * The Mission page.
 * This component structures the layout for the /missao route, assembling
 * various sections that tell the Phato story.
 */
export default function MissionPage() {
  return (
    // We use a Fragment <> to group the components without adding an extra node to the DOM.
    <>
      <MissionHero />
      <MissionManifesto />
      <MissionHistory />
      <MissionTeam />
    </>
  );
}
