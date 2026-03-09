import { notFound } from "next/navigation";
import { getPlaybook, getWaitlistPlaybook, getAvailableSlugs } from "@/data/playbooks/index";
import PlaybookTemplate from "@/components/playbook/PlaybookTemplate";

// Pre-render all available + waitlist playbooks at build time
export async function generateStaticParams() {
  return getAvailableSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const playbook = getPlaybook(slug) ?? getWaitlistPlaybook(slug);
  if (!playbook) return {};
  return {
    title: `${playbook.heroTitle} ~ Happy Voyager`,
    description: playbook.heroDescription,
  };
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const playbook = getPlaybook(slug);
  if (playbook) return <PlaybookTemplate config={playbook} />;

  const waitlistPlaybook = getWaitlistPlaybook(slug);
  if (waitlistPlaybook) return <PlaybookTemplate config={waitlistPlaybook} waitlistMode />;

  notFound();
}
