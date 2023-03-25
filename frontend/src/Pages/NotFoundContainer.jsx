import React from 'react'
import "./Css-for-Pages/NotFoundContainer.css"

export default function NotFoundContainer() {
  return (
    <>
     <div class="container">
      <h1>404 Page Not Found</h1>
      <p>The page you are looking for could not be found. Please check the URL or try again later.</p>
      <a href="/" class="button">Return to Home</a>
    </div>
    </>
  )
}
