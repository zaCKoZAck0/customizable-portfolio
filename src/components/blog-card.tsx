'use client';
import { Doc } from 'contentlayer/generated';
import { differenceInDays, format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from '~/components/ui/badge';
import { H4 } from '~/components/typography';
import React from 'react';

interface BlogCardProps {
  blog: Doc;
}

const DATE_FORMAT = 'MMMM d, yyyy';
const NEW_DAYS_THRESHOLD = 7;
const SPRING_TRANSITION = { type: 'spring', stiffness: 150, damping: 12 };
const RAINBOW_GRADIENT =
  'linear-gradient(90deg, #ff0000 0%, #ff8000 20%, #ffff00 40%, #00ff00 60%, #00ffff 80%, #8000ff 100%)';

export const BlogCard = motion(
  // eslint-disable-next-line react/display-name
  React.memo(({ blog }: BlogCardProps) => {
    const [isNew, isUpdated] = useMemo(
      () => [
        differenceInDays(new Date(), new Date(blog.publishedAt)) <= NEW_DAYS_THRESHOLD,
        differenceInDays(new Date(blog.updatedAt), new Date(blog.publishedAt)) > 0 &&
          differenceInDays(new Date(), new Date(blog.updatedAt)) <= NEW_DAYS_THRESHOLD,
      ],
      [blog.publishedAt, blog.updatedAt],
    );

    const isMinis = blog.minis;

    const DateBadge = ({ label, gradient }: { label: string; gradient: string }) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING_TRANSITION}
      >
        <Badge className={`bg-gradient-to-r ${gradient} bg-clip-text p-0.5 text-transparent`}>
          <span className="py-0.5 text-sm">{label}</span>
        </Badge>
      </motion.div>
    );

    return (
      <Link href={`/blogs/${blog.slugAsParams}`}>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 8px 24px -4px rgba(0,0,0,0.1)',
          }}
          viewport={{ margin: '-40px' }}
          whileTap={{ scale: 0.98 }}
          transition={SPRING_TRANSITION}
          className="group relative block rounded-xl border bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
        >
          {/* Rainbow Glow Effect */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity group-hover:opacity-50"
            style={{
              background: RAINBOW_GRADIENT,
              filter: 'blur(20px)',
              mask: 'linear-gradient(white, transparent 10%)',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <div className="p-6">
            <H4 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <span className="bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent group-hover:text-secondary-foreground">
                {blog.title}
              </span>
            </H4>

            <p className="line-clamp-2 text-sm text-muted-foreground group-hover:text-secondary-foreground">
              {blog.description}
            </p>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {isMinis && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={SPRING_TRANSITION}
                  >
                    <Badge
                      className={`bg-gradient-to-br from-green-200 to-green-400 bg-clip-text p-0.5 text-transparent`}
                    >
                      <span className="py-0.5 font-mono text-sm font-semibold italic">
                        {'<Minis/>'}
                      </span>
                    </Badge>
                  </motion.div>
                )}
                {isNew && <DateBadge label="New" gradient="from-green-300 to-blue-400" />}
                {isUpdated && <DateBadge label="Updated" gradient="from-purple-300 to-pink-400" />}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground/80" />
                <span>{format(new Date(blog.updatedAt), DATE_FORMAT)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }),
);
