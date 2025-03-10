import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer2/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
};

const Link = defineNestedType(() => ({
  name: 'Link',
  fields: {
    platform: {
      type: 'string',
      required: true,
    },
    url: {
      type: 'string',
      required: true,
    },
    alias: {
      type: 'string',
      required: true,
    },
  },
}));

export const Profile = defineDocumentType(() => ({
  name: 'Profile',
  filePathPattern: `profile/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    username: {
      type: 'string',
      required: true,
    },
    formalImage: {
      type: 'string',
      required: true,
    },
    profileImage: {
      type: 'string',
      required: true,
    },
    fullName: {
      type: 'string',
      required: true,
    },
    headline: {
      type: 'string',
      required: true,
    },
    blogHeadline: {
      type: 'string',
      required: true,
    },
    links: {
      type: 'list',
      of: Link,
    },
    role: {
      type: 'string',
      required: true,
    },
    company: {
      type: 'string',
      required: true,
    },
  },
}));

const Content = defineNestedType(() => ({
  name: 'Content',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    url: {
      type: 'string',
      required: true,
    },
  },
}));

const Modules = defineNestedType(() => ({
  name: 'Module',
  fields: {
    name: {
      type: 'string',
      required: true,
    },
    contents: {
      type: 'list',
      of: Content,
    },
  },
}));

export const Course = defineDocumentType(() => ({
  name: 'Course',
  filePathPattern: `courses/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: true,
    },
    modules: {
      type: 'list',
      of: Modules,
    },
  },
}));

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `blogs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    published: {
      type: 'boolean',
      default: false,
    },
    author: {
      type: 'string',
      required: true,
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    tldr: {
      type: 'string',
    },
    podcastUrl: {
      type: 'string',
    },
    minis: {
      type: 'boolean',
      default: false,
    },
    publishedAt: {
      type: 'date',
      required: true,
    },
    updatedAt: {
      type: 'date',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
  },
  computedFields,
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    github: {
      type: 'string',
      required: true,
    },
    liveUrl: {
      type: 'string',
      required: true,
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    technologies: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'src/content',
  disableImportAliasWarning: true,
  documentTypes: [Doc, Project, Profile, Link],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'catppuccin-mocha',
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            console.log(node);
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
});
