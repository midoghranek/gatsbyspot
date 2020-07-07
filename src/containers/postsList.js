import React from "react"
import { Link } from "gatsby"
import styles from "./postsList.module.scss"
import Image from "gatsby-image"

const Posts = ({ posts }) => {
  return (
    <ul className={styles.posts}>
      {posts.map(post => {
        const labels = post.labels
        let labelsLength = labels ? labels.length : 0
        return (
          <li className={styles.post} key={post.id} id={post.id}>
            <Link to={`/${post.slug}`}>
              {post.childMarkdownRemark.featuredImg ? (
                <Image
                  className={styles.img}
                  fluid={
                    post.childMarkdownRemark.featuredImg.childImageSharp.fluid
                  }
                  alt={post.title}
                  imgStyle={{ objectFit: "contain" }}
                />
              ) : (
                ""
              )}
              <div className={styles.content}>
                {labelsLength ? (
                  <span className={styles.label}>
                    {labels.map((label, index) => {
                      if (labelsLength === index + 1)
                        return <i key={index}>{label}</i>
                      return <i key={index}>{label}, </i>
                    })}
                  </span>
                ) : (
                  ""
                )}
                <h2>
                  {post.title.indexOf("&#39;")
                    ? post.title.replace("&#39;", "'")
                    : post.title}
                </h2>
                <div className={styles.meta}>
                  <time>{post.published}</time>
                </div>
                <p>{post.childMarkdownRemark.excerpt}</p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Posts
