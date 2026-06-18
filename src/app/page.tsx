import ServerSEOContent from '@/components/ServerSEOContent';
import HomeClientContent from '@/components/HomeClientContent';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col page-load-reveal">
      {/* Server-rendered SEO content — crawlable by all bots without JS */}
      <ServerSEOContent />

      {/* Client-interactive content — hydrated on the client */}
      <HomeClientContent />
    </div>
  );
}
