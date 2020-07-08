import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./post.module.scss"

const Page = ({ data }) => {
  const page = data.bloggerPage
  return (
    <Layout>
      <SEO title={page.title} />
      <article className={styles.article}>
        <h1 className={styles.title}>{page.title}</h1>
        <div
          className={styles.postBody}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>
    </Layout>
  )
}

export default Page

export const pageQurey = graphql`
  query($id: String!) {
    bloggerPage(id: { eq: $id }) {
      title
      content
    }
  }
`
