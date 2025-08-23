import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Layout from "../../components/Layout"
import MDXComponents from "../../components/MDXComponents"

interface PostPageProps extends PageProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
        date: string
        id: string
        slug: string
      }
    }
  }
}

const PostPage: React.FC<PostPageProps> = ({ data, children }) => {
  const { frontmatter } = data.mdx

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
          <p className="text-gray-600">
            投稿日: {frontmatter.date}
          </p>
        </header>
        <main className="max-w-none">
          <MDXProvider components={MDXComponents}>
            {children}
          </MDXProvider>
        </main>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PostPage($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY年MM月DD日")
        id
        slug
      }
    }
  }
`

export default PostPage
