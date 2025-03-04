import { ArrowLeft } from 'lucide-react';
import { H1 } from '~/components/typography';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { DashboardTableOfContents } from '~/components/navigation/blog/heading-navigation';
import { Doc } from 'contentlayer/generated';
import { getTableOfContents } from '~/lib/toc';
import { BlogFooter } from './navigation/blog/footer';

interface BlogPageProps {
  blog: Doc;
  children: React.ReactNode;
}

export async function BlogPage({ blog, children }: BlogPageProps) {
  const createdDate = new Date(blog.publishedAt);
  const updatedDate = new Date(blog.updatedAt);
  const toc = await getTableOfContents(blog.body.raw);

  return (
    <main className="relative flex min-h-screen items-start justify-center">
      <div className="flex w-full max-w-6xl translate-y-[calc(100vh/5)] flex-col p-4 pb-10 md:translate-y-[calc(100vh/4)]">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <aside className="mt-8 w-full md:mt-0 md:w-1/4">
            <div className="sticky top-4 hidden md:block">
              <DashboardTableOfContents toc={toc} />
            </div>
          </aside>
          <section className="w-full md:w-3/4">
            <div className="py-2">
              <Link href="/blogs">
                <Button
                  size="sm"
                  variant="link"
                  className="group h-auto items-center rounded-full px-0"
                >
                  <ArrowLeft
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                  <span className="ml-1 text-xs font-light">Home</span>
                </Button>
              </Link>
            </div>
            <H1 className="text-3xl font-semibold text-secondary-foreground lg:text-3xl">
              {blog.title}
            </H1>
            <div className="my-4">
              <p className="text-xs text-muted-foreground">
                <span className="mr-4 text-green-300 font-mono italic hidden rounded-md bg-primary/15 px-2 py-0.5 md:inline">
                  {"<Minis/>"}
                </span>
                <span className="mr-2">By</span>
                <span className="text-secondary-foreground">{blog.author}</span>
                <span className="mx-2">|</span>
                <span className="text-secondary-foreground">
                  {createdDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="mx-4 hidden rounded-md bg-primary/15 px-2 py-0.5 md:inline">
                  Last Updated on{' '}
                  {updatedDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                </span>
              </p>
            </div>
            <article id="blog" className="prose prose-gray dark:prose-invert max-w-none">
              {children}
            </article>
            <BlogFooter />
          </section>
        </div>
      </div>
    </main>
  );
}
