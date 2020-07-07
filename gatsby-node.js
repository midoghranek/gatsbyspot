const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const config = require("./data/config.js")

const toSlug = text => {
  return text.toLowerCase().replace(" ", "-")
}

// Create dynamic pages
module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Templates
  const homeTemplate = path.resolve("./src/templates/home.js")
  const postTemplate = path.resolve("./src/templates/post.js")
  const tagTemplate = path.resolve("./src/templates/tag.js")
  const navigationTemplate = path.resolve("./src/templates/pagination.js")

  // Fetch Data
  const res = await graphql(`
    query {
      allBloggerPost {
        distinct(field: labels)
        totalCount
        nodes {
          id
          slug
        }
      }
    }
  `)

  // Pager process
  const getPagesNumber = (total, posts) => {
    const div = total / posts
    return Number(div.toFixed(0))
  }
  const totalCount = res.data.allBloggerPost.totalCount
  const postsPerPage = config.postsPerPage
  const getSkip = page => {
    let get = page - 1
    return postsPerPage * get
  }
  let numberOfPages = getPagesNumber(totalCount, postsPerPage)
  const getCurrentTotal = numberOfPages * postsPerPage
  if (totalCount > getCurrentTotal) {
    numberOfPages = numberOfPages + 1
  }

  // Create home page
  createPage({
    component: homeTemplate,
    path: `/`,
    context: {
      limit: postsPerPage,
      pages: numberOfPages,
    },
  })

  // Create navigation pages
  for (let i = 1; i <= numberOfPages; i++) {
    createPage({
      component: navigationTemplate,
      path: `/page/${i}`,
      context: {
        limit: postsPerPage,
        skip: getSkip(i),
        page: i,
        pages: numberOfPages,
      },
    })
  }

  // Create posts page
  res.data.allBloggerPost.nodes.forEach(post => {
    createPage({
      component: postTemplate,
      path: `/${post.slug}`,
      context: {
        slug: post.slug,
        id: post.id,
      },
    })
  })

  // Create tags page
  res.data.allBloggerPost.distinct.forEach(tag => {
    createPage({
      component: tagTemplate,
      path: `/tag/${toSlug(tag)}`,
      context: {
        tag,
      },
    })
  })
}

// Create local featured images
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      image: File @link(from: "featuredImg___NODE")
    }

    type Frontmatter {
      title: String!
      image: String!
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (
    node.internal.type === "MarkdownRemark" &&
    node.frontmatter.image !== null
  ) {
    let fileNode = await createRemoteFileNode({
      url: node.frontmatter.image.includes("hqdefault")
        ? node.frontmatter.image.replace("hqdefault", "maxresdefault")
        : node.frontmatter.image,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    })

    if (fileNode) {
      node.featuredImg___NODE = fileNode.id
    }
  }
}
