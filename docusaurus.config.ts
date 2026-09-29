import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import obsidianImages from './plugins/remark-obsidian-images';
import remarkStyleStringToJsx from './plugins/remark-style-string-to-jsx';
import remarkComicStrip from './plugins/remark-comic-carousel';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'HashLearns',
  tagline: '"People call me RobinHood, I learn things and Distribute the knowledge for free, forever. You just have to be smart enough to understand it"',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://hashlearns.pages.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownImages: 'warn',
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          exclude: ['**/Excalidraw/**'],
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            const defaultItems = await defaultSidebarItemsGenerator({
              defaultSidebarItemsGenerator,
              ...args
            });

            const parseNum = (str: string): number | null => {
              const kwMatch = str.match(/(?:ch(?:apter)?|course|module|unit|part|step)[\s\-_]*(\d+(?:\.\d+)?)/i);
              if (kwMatch) return parseFloat(kwMatch[1]);
              const leadingMatch = str.match(/^\s*(\d+(?:\.\d+)?)/);
              if (leadingMatch) return parseFloat(leadingMatch[1]);
              const anyMatch = str.match(/(\d+(?:\.\d+)?)/);
              if (anyMatch) return parseFloat(anyMatch[1]);
              return null;
            };

            const compareItems = (a: any, b: any): number => {
              const posA = a.customProps?.sidebar_position ?? a.position;
              const posB = b.customProps?.sidebar_position ?? b.position;

              if (typeof posA === 'number' && typeof posB === 'number' && posA !== posB) {
                return posA - posB;
              }

              const titleA = a.label || a.title || a.id || '';
              const titleB = b.label || b.title || b.id || '';

              const numA = parseNum(titleA);
              const numB = parseNum(titleB);

              if (numA !== null && numB !== null && numA !== numB) {
                return numA - numB;
              } else if (numA !== null && numB === null) {
                return -1;
              } else if (numA === null && numB !== null) {
                return 1;
              }

              return titleA.localeCompare(titleB, undefined, { numeric: true, sensitivity: 'base' });
            };

            const sortItemsRecursively = (items: any[]): any[] => {
              const sorted = [...items].sort(compareItems);
              return sorted.map((it) => {
                if (it.type === 'category' && Array.isArray(it.items)) {
                  return {
                    ...it,
                    items: sortItemsRecursively(it.items),
                  };
                }
                return it;
              });
            };

            return sortItemsRecursively(defaultItems);
          },

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          beforeDefaultRemarkPlugins: [obsidianImages, remarkStyleStringToJsx, remarkComicStrip],
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'HashLearns',
      logo: {
        alt: 'HashLearns Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/hashcodes7',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright  ${new Date().getFullYear()} HashLearns. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    './plugins/feature-cards-plugin',
    './plugins/obsidian-webpack-plugin.js'
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      crossorigin: 'anonymous',
    },
  ],
};

export default config;
