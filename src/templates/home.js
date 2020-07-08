import React from "react"
import { graphql } from "gatsby"

import Pager from "../components/pager"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Posts from "../containers/postsList"

const HomePage = ({ data, pageContext }) => {
  const posts = data.allBloggerPost.nodes

  return (
    <Layout>
      <SEO title="Home" />
      <Posts posts={posts} />
      <Pager page={1} pages={pageContext.pages} />
    </Layout>
  )
}

export default HomePage

export const pageQurey = graphql`
  query($limit: Int!) {
    allBloggerPost(
      limit: $limit
      skip: 0
      sort: { order: DESC, fields: published }
    ) {
      totalCount
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
