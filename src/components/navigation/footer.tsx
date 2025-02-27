import { ExternalLinkIcon, PenLine } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <div className="w-full pb-2 pt-5 text-xs">
      <div className="mt-6 flex flex-col border-t p-6 text-center text-xs text-muted-foreground md:flex-row md:justify-between">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} zackozack</p>
        <div className="flex items-center justify-center gap-2">
          <Link
            className="flex items-center gap-1 underline-offset-2 hover:underline"
            href="/blogs"
          >
            Blogs
            <PenLine size={12} />
          </Link>{' '}
          |
          <Link
            className="flex items-center gap-1 underline-offset-2 hover:underline"
            href="/projects"
          >
            Projects
          </Link>{' '}
          |
          <a
            className="flex items-center gap-1 underline-offset-2 hover:underline"
            href="https://github.com/zaCKoZAck0/portfolio-next14"
          >
            Github repo <ExternalLinkIcon size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
