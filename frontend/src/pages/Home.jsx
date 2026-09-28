import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { TrustedBy } from "@/components/home/TrustedBy";
import { Problems } from "@/components/home/Problems";
import { FeaturesIntro } from "@/components/home/FeaturesIntro";
import { FeatureResearch } from "@/components/home/FeatureResearch";
import { FeatureVisual } from "@/components/home/FeatureVisual";
import { FeatureConnections } from "@/components/home/FeatureConnections";
import { FormatVersus } from "@/components/home/FormatVersus";
import { CompareTable } from "@/components/home/CompareTable";
import { TimeSaved } from "@/components/home/TimeSaved";
import { PlatformTeaser } from "@/components/home/PlatformTeaser";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  const { hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (!hash || !lenis) return;
    const t = setTimeout(() => lenis.scrollTo(hash, { offset: -80 }), 350);
    return () => clearTimeout(t);
  }, [hash, lenis]);

  return (
    <div data-testid="home-page">
      <Hero />
      <TrustedBy />
      <Problems />
      <Marquee />
      <FeaturesIntro />
      <FeatureResearch />
      <FeatureVisual />
      <FeatureConnections />
      <FormatVersus />
      <CompareTable />
      <TimeSaved />
      <PlatformTeaser />
      <CtaSection />
    </div>
  );
}
