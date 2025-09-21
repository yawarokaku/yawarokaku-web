import * as React from 'react'
import { graphql, Link } from 'gatsby'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/Layout'

interface IndexPageProps extends PageProps {
  data: {
    allMdx: {
      nodes: Array<{
        id: string
        frontmatter: {
          title: string
          date: string
          author: string
          slug: string
        }
        excerpt: string
      }>
    }
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-lg font-extrabold">
          私たち“やわろかく”の目的は、
          やわらかいもの（ソフトウェア）におおわれた今の時代に、
          <br />
          あってもよいはずの「書きもの」を作り出し、そのコンテンツを運営することです。
        </h2>
      </div>

      <h2 className="mb-4 text-3xl font-extrabold">Posts</h2>
      <div className="space-y-4">
        {data.allMdx.nodes.map((post) => (
          <article key={post.id} className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold mb-2">
              <Link
                to={`/posts/${post.frontmatter.slug}`}
                className="text-blue-600 hover:text-blue-800 no-underline"
              >
                {post.frontmatter.title}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              <span>{post.frontmatter.date}</span>
              {/* <span className="mr-3">{post.frontmatter.date}</span> */}
              {/* <span>{post.frontmatter.author}</span> */}
            </p>
            <p className="text-gray-700">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/content/posts/" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "YYYY年MM月DD日")
          author
          slug
        }
        excerpt(pruneLength: 200)
      }
    }
  }
`

export const Head: HeadFC = () => (
  <React.Fragment>
    <title>やわろかく</title>
    <meta name="robots" content="noindex"></meta>
  </React.Fragment>
)
