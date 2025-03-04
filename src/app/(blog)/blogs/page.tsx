import Link from 'next/link';
import { FaUser, FaXTwitter } from 'react-icons/fa6';
import { H2, H4 } from '~/components/typography';
import { Button } from '~/components/ui/button';
import { allDocs } from 'contentlayer/generated';
import { Metadata } from 'next';
import { BlogFooter } from '~/components/navigation/blog/footer';
import { BlogCard } from '~/components/blog-card';

export const metadata: Metadata = {
  title: 'Blog | zackozack (Ayush Kumar Yadav)',
  description: 'I am Ayush. Welcome to my personal blog.',
};

export default function BlogPage() {
  const blogs = allDocs.filter((docs) => docs.published);
  const groupedBlogs = blogs.reduce(
    (acc, blog) => {
      const year = new Date(blog.publishedAt).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(blog.slugAsParams);
      return acc;
    },
    {} as Record<string, string[]>,
  );
  return (
    <main className="flex min-h-screen justify-center md:container">
      <section className="flex min-h-screen w-full max-w-3xl flex-col p-4 pb-10">
        <div className="flex min-h-screen flex-col justify-center">
          <p className="w-full rounded-md border-orange-200 p-4 text-justify">
            <span className="w-full text-justify text-secondary-foreground">
              Hi there! I am Ayush. Welcome to my personal blog. Thus far, I have written only{' '}
              {blogs.length}.
            </span>{' '}
            My blogs mostly have content around tools and technologies, tutorials, book /
            research-paper summaries, etc.
          </p>
          <p className="mb-4 w-full rounded-lg border-2 border-green-300/50 bg-gradient-to-b from-green-900/10 from-50% to-green-300/25 p-4 text-justify text-green-300 shadow-2xl shadow-green-300/25 hover:shadow-2xl hover:shadow-green-300/25">
            <span className="block text-xl font-semibold">
              Introducing <span className="font-mono italic">{'<Minis/>'}</span>
            </span>
            <span className="mt-2 block text-secondary-foreground">
              Sharing Byte-sized knowledge everyday for people on the go.
            </span>
          </p>
          <div className="flex items-center justify-end gap-2 py-2">
            <a href="https://x.com/zaCKoZAck0">
              <Button size="sm" variant="secondary" className="border border-gray-500">
                <H4 className="mr-2 text-sm font-normal">@zaCKoZAck0</H4>
                <FaXTwitter size={14} />
              </Button>
            </a>
            <Link href="/">
              <Button
                size="sm"
                variant="secondary"
                className="bg-gradient-to-br from-blue-400 to-purple-400 text-background"
              >
                <H4 className="mr-2 text-sm font-normal">Portfolio</H4>
                <FaUser size={12} />
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-32">
          <div className="flex flex-col justify-center gap-4">
            {blogs.map((blog) => {
              return <BlogCard key={blog._id} blog={blog} />;
            })}
          </div>
        </div>
        <div className="mt-32">
          <H2>All Blogs</H2>
          {Object.keys(groupedBlogs).map((year) => (
            <div key={year}>
              <H4 className="pb-4 pt-8 text-lg text-secondary-foreground">{year}</H4>
              <table className='table-fixed'>
                <tbody>
                  {groupedBlogs[year].map((slug) => {
                    const blog = blogs.find((it) => it.slugAsParams === slug);
                    if (!blog) return null;
                    const createdDate = new Date(blog.publishedAt);
                    return (
                      <Link key={slug} href={`/blogs/${slug}`}>
                        <tr key={blog.title} className="group flex items-center pt-4">
                          <td className="flex-shrink-0">
                            <H4 className="pr-3 text-left text-sm font-normal">
                              {createdDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </H4>
                          </td>
                          <td>
                            <H4 className="from-blue-400 to-purple-400 bg-clip-text pl-3 text-base font-semibold text-secondary-foreground group-hover:bg-gradient-to-br group-hover:text-transparent">
                              {blog.title}
                              {blog.minis && <span title="minis" className='text-green-300 font-normal px-2 italic font-mono'>{"<Minis/>"}</span>}
                            </H4>
                          </td>
                        </tr>
                      </Link>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <BlogFooter />
      </section>
    </main>
  );
}
