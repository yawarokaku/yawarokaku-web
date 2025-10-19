import type { GatsbyConfig } from 'gatsby'
import path from 'path'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `yawarokaku`,
    siteUrl: `https://yawarokaku.jp`,
  },
  // pathPrefix: `/yawarokaku-web`,
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [
          {
            userAgent: 'ChatGPT-User',
            allow: ['/'],
            disallow: ['/posts'],
            crawlDelay: 2,
          },
          {
            userAgent: 'GPTBot',
            allow: ['/'],
            disallow: ['/posts'],
            crawlDelay: 2,
          },
          {
            userAgent: 'Google-Extended',
            allow: ['/'],
            disallow: ['/posts'],
            crawlDelay: 2,
          },
          {
            userAgent: 'Bingbot',
            allow: ['/'],
            disallow: ['/posts'],
            crawlDelay: 2,
          },
          {
            userAgent: 'BingPreview',
            allow: ['/'],
            disallow: ['/posts'],
            crawlDelay: 2,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(__dirname, 'src/images'),
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: path.resolve(__dirname, 'src/pages'),
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.resolve(__dirname, 'content/posts'),
        ignore: [`**/.*`], // ignore hidden files
      },
      __key: 'posts',
    },
  ],
}

export default config
