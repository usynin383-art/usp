import { SiteAnalyticsContainer } from "@/app/components/SiteAnalyticsContainer";

interface PageProps {
  params: Promise<{ siteId: string }>;
}

export default async function SiteAnalyticsPage({ params }: PageProps) {
  const { siteId } = await params;

  return <SiteAnalyticsContainer siteId={siteId} />;
}
