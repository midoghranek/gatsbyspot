import React from "react"
import { graphql } from "gatsby"

import Pager from "../components/pager"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Posts from "../containers/postsList"

const Pagination = ({ data, pageContext }) => {
  const posts = data.allBloggerPost.nodes

  return (
    <Layout>
      <SEO title={`Page ${pageContext.page}`} />
      <Posts posts={posts} />
      <Pager page={pageContext.page} pages={pageContext.pages} />
    </Layout>
  )
}

export default Pagination

export const pageQurey = graphql`
  query($skip: Int!, $limit: Int!) {
    allBloggerPost(
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: published }
    ) {
      nodes {
        id
        slug
        published(formatString: "MMMM DD, YYYY")
        title
        labels
        childMarkdownRemark {
          excerpt(pruneLength: 200)
          featuredImg {
            childImageSharp {
              fluid(maxWidth: 920, maxHeight: 560, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
