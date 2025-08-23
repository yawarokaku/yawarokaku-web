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
      <div className="max-w-4xl mx-auto p-10">
        <div className="mb-6">
          私たち“やわろ書く”の目的は、
          <span className="font-bold">
            やわらかいもの（ソフトウェア）におおわれた今の時代に、あってもよいはずの「書きもの」を作り出し、そのコンテンツを運営すること
          </span>
          です。
          <br />
        </div>

        <h2 className="text-2xl font-extrabold mb-4">手元から解放された文字</h2>
        <div className="mb-6">
          <p className="indent-3">
            「書くもの」とは文房具のことですが、ソフトウェアを利用した「文房具」は人の手を使う、いわゆるえんぴつや紙を意味していません。
            “やわろ書く”のいう文房具はコンピューターを使った文房具のことです。
          </p>
          <p className="indent-3">
            文房具は文字を書き取るための道具ですが、スマホを手にした私たちが文字を読み書きする多くの場面でペンと紙の出番はとても少なくなりました。
            ながいあいだ文字は、私たちの手元のペンと紙の間の軌跡として存在してきました。
          </p>
          <p className="indent-3">
            けれどスマホを手にした私たちの文字は、指とスクリーンの軌跡に加え、スマホの内部の処理と、スクリーン上に出力されたピクセルによって表示されています。
          </p>
          <p className="indent-3">
            例えば、ペンと紙の上での「う」を書く際の書き順を思う浮かべてください。
            そのあと、スマホの仮想キーボード上でフリック入力する際に「あ」という文字の上に指を乗せ下向きに指を動かすというこ「う」を表示するとその違いが実感できると思います。
          </p>
          <p className="indent-3">
            つまり、私たちの書いてる文字は手元から離れて生み出されています。
          </p>
          <p className="indent-3">
            いまや、音声入力を使えば完全に手を使わず文字を表示することも可能です。
            言い換えると、文字の生産が、書くもの（ぺん）と書かれるもの（紙）の上の間の軌跡ではなく、
            スマホ（コンピュータ）による入力、処理、出力に変わったのです。
            文字を書くことが、手元から離れるということが何を意味するのか？
            ずばり、歩きながら文字を書くことができるようになった、ということです。
          </p>
          <p className="indent-3">
            文字が手元から離れるということは、椅子に座り机に向き合わなくても生み出すことができるようになったということです。
            少し脱線すると、だからこそSNSのサービスがこんなにも普及したのではないでしょうか。
            SNSを更新する時に必ず机と椅子がないと書きづらい状況を想像するととても不便でしょう？
          </p>
          <p className="indent-3">
            スマホ上で文字を書くということが、入力・処理・出力であるのであれば、スマホで行えるあらゆることがこのプロセスを行なっていることに気づくと思います。
            写真を撮ること、映像をとること、音をとることなどなど。
          </p>
          <p className="indent-3">
            スマホ上ではプロセスは今や文字に話を戻すと、文字はいまや社会やコミュニケーションのインフラとなっているので文字の読み書き能力（リテラシー）は教育ととても強く紐づいています。
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
                  {post.frontmatter.slug}: {post.frontmatter.title}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {post.frontmatter.date}
              </p>
              <p className="text-gray-700">{post.excerpt}</p>
            </article>
          ))}
        </div>
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
          slug
        }
        excerpt(pruneLength: 200)
      }
    }
  }
`

export const Head: HeadFC = () => <title>やわろ書く</title>
