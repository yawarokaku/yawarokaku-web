import * as React from 'react'
import { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/Layout'

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl">404</h1>
        <div className="text-2xl">Not Found</div>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
