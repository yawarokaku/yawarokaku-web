import * as React from 'react'
import { graphql, Link } from 'gatsby'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import { StaticImage } from 'gatsby-plugin-image'

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
          私たち“やわろ書く”の目的は、
          やわらかいもの（ソフトウェア）におおわれた今の時代に、
          <br />
          あってもよいはずの「書きもの」を作り出し、そのコンテンツを運営することです。
        </h2>
      </div>

      <h2 className="text-2xl font-extrabold mb-4">手元から解放された文字</h2>
      <div className="mb-6 [&>p]:indent-3">
        <p>
          「書くもの」とは文房具のことですが、ソフトウェアを利用した「文房具」は人の手を使う、
          いわゆるえんぴつや紙を意味していません。
          “やわろ書く”のいう文房具はコンピューターを使った文房具のことです。
        </p>
        <p>
          文房具は文字を書き取るための道具ですが、
          スマホを手にした私たちが文字を読み書きする多くの場面でペンと紙の出番はとても少なくなりました。
          ながいあいだ文字は、私たちの手元のペンと紙の間の軌跡として存在してきました。
        </p>
        <p>
          けれどスマホを手にした私たちの文字は、指とスクリーンの軌跡に加え、
          スマホの内部の処理と、スクリーン上に出力されたピクセルによって表示されています。
        </p>
        <p>
          例えば、ペンと紙の上での「え」を書く際の書き順を思う浮かべてください。
          そのあと、スマホの仮想キーボード上でフリック入力する際に「あ」という文字の上に
          指を乗せ下向きに指を動かすというこ「え」を表示するとその違いが実感できると思います。
        </p>
        <p>つまり、私たちの書いてる文字は手元から離れて生み出されています。</p>
        <StaticImage src="../images/write-flick.png" alt="write/type" />
        {/* <img src="../images/write-type.svg" alt="My Happy SVG" /> */}
        {/* <StaticImage src="../images/write-type.svg" alt="write/type" /> */}
        <p>
          いまや、音声入力を使えば完全に手を使わず文字を表示することも可能です。
          言い換えると、文字の生産が、書くもの（ぺん）と書かれるもの（紙）の上の間の軌跡ではなく、
          スマホ（コンピュータ）による入力、処理、出力に変わったのです。
          文字を書くことが、手元から離れるということが何を意味するのか？
          ずばり、歩きながら文字を書くことができるようになった、ということです。
        </p>
        <p>
          文字が手元から離れるということは、
          椅子に座り机に向き合わなくても生み出すことができるようになったということです。
          少し脱線すると、だからこそSNSのサービスがこんなにも普及したのではないでしょうか。
          SNSを更新する時に必ず机と椅子がないと書きづらい状況を想像するととても不便でしょう？
        </p>
        <p>
          スマホ上で文字を書くということが、入力・処理・出力であるのであれば、
          スマホで行えるあらゆることがこのプロセスを行なっていることに気づくと思います。
          写真を撮ること、映像をとること、音をとることなどなど。
        </p>
        <p>
          スマホ上ではプロセスは今や文字に話を戻すと、
          文字はいまや社会やコミュニケーションのインフラとなっているので
          文字の読み書き能力（リテラシー）は教育ととても強く紐づいています。
        </p>
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
    <title>やわろ書く</title>
    <meta name="robots" content="noindex"></meta>
  </React.Fragment>
)
