import { WelcomePage } from "@/modules/landing/welcome";

export const Route = createFileRoute({
  component: LandingPage,
});

function LandingPage() {
  return <WelcomePage />;
}