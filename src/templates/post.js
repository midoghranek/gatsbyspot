import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styles from "./post.module.scss"
import SEO from "../components/seo"
import { toSlug } from "../utils/functions"

const PostPage = ({ data }) => {
  const post = data.bloggerPost
  const labels = post.labels
  let labelsLength = labels ? labels.length : 0

  return (
    <Layout>
      <SEO title={`${post.title}`} />
      <article className={styles.article}>
        {labelsLength ? (
          <span className={styles.label}>
            {labels.map((label, index) => {
              if (labelsLength === index + 1)
                return (
                  <Link key={index} to={`/tag/${toSlug(label)}`}>
                    <i>{label}</i>
                  </Link>
                )
              return (
                <Link key={index} to={`/tag/${toSlug(label)}`}>
                  <i>{label}, </i>
                </Link>
              )
            })}
          </span>
        ) : (
          ""
        )}
        <h1 className={styles.title}>
          {post.title.indexOf("&#39;")
            ? post.title.replace("&#39;", "'")
            : post.title}
        </h1>
        <div
          className={styles.postBody}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </article>
    </Layout>
  )
}

export default PostPage

export const pageQurey = graphql`
  query($id: String!) {
    bloggerPost(id: { eq: $id }) {
      title
      labels
      published(formatString: "MMMM, DD, YYYY")
      content
    }
  }
`
