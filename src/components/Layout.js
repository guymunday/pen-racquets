import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import styled from "styled-components"

const StyledMain = styled.main`
  min-height: 650px;
  position: relative;
`

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </>
  )
}
