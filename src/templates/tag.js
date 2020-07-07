import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Posts from "../containers/postsList"
import styles from "./tag.module.scss"

const TagPage = ({ data, pageContext }) => {
  console.log(pageContext.tag)
  const posts = data.allBloggerPost.nodes

  return (
    <Layout>
      <SEO title={pageContext.tag} />
      <h2 className={styles.title}>
        Post in <span>{pageContext.tag}</span>
      </h2>
      <Posts posts={posts} />
    </Layout>
  )
}

export default TagPage

export const pageQuery = graphql`
  query($tag: String!) {
    allBloggerPost(filter: { labels: { eq: $tag } }) {
      nodes {
        id
        slug
        published(formatString: "MMMM DD, YYYY")
        title
        labels
        childMarkdownRemark {
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`
