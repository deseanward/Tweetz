// 'use client'
import React from "react";

// const DefaultLayout = () => {
//   return (
//     <div>DefaultLayout</div>
//   )
// }

// export default DefaultLayout

function DefaultLayout({ title, children }) {
  return (
    <main>
      <head>
        <title>{title}</title>
        <script src='https://cdn.tailwindcss.com'></script>
      </head>

      <body className='w-full p-4 flex justify-center'>
        <h1>{title}</h1>
        {children}
      </body>
    </main>
  );
}

module.exports = DefaultLayout;
