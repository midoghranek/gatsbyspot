import React from "react"
import { Link } from "gatsby"
import styles from "./pager.module.scss"

const Pager = ({ page, pages }) => {
  let pageNum = Number(page)
  let pagesNum = Number(pages)

  return (
    <div className={styles.pager}>
      {pageNum === 1 || (
        <Link className={styles.prev} to={`/page/${page - 1}`}>
          Previous
        </Link>
      )}
      <span>{`${page} of ${pages}`}</span>
      {pageNum === pagesNum || (
        <Link className={styles.next} to={`/page/${page + 1}`}>
          Next
        </Link>
      )}
    </div>
  )
}

export default Pager
