import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styles from './Cta.module.css'
import { Button, ButtonGroup } from "@chakra-ui/react"

function cta (props) {
  const {title, route, link} = props

  if (route && route.slug && route.slug.current) {
    return (
      <Link
        href={{
          pathname: '/LandingPage',
          query: {slug: route.slug.current}
        }}
        as={`/${route.slug.current}`}
      >
        <Button colorScheme="green">Contact Us</Button>
      </Link>
    )
  }

  if (link) {
    return (
      <Button colorScheme="blue">Button</Button>
      // <a className={styles.button} href={link}>
      //   {title}
      // </a>
    )
  }

  return <Button colorScheme="blue">Button</Button>
}

cta.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string
    })
  }),
  link: PropTypes.string
}

export default cta
