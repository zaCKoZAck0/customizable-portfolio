import { FC } from 'react';
import { allDocs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Mdx } from '~/components/mdx/mdx-components';
import { BlogPage } from '~/components/blog-page';
import { Metadata } from 'next';
import { env } from '~/env';
import { absoluteUrl } from '~/lib/absolute-url';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allDocs.find((it) => it.slugAsParams === slug);
  if (!doc) return notFound();
  return doc;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getDocFromParams(params.slug);

  if (!post) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/blog/og`);
  ogUrl.searchParams.set('heading', post.title);

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: 'zackozack' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allDocs.map((post) => ({
    slug: post.slugAsParams,
  }));
}

const Page: FC<PageProps> = async ({ params }) => {
  const doc = await getDocFromParams(params.slug);
  return (
    <BlogPage blog={doc}>
      <Mdx code={doc.body.code} />
    </BlogPage>
  );
};

export default Page;
