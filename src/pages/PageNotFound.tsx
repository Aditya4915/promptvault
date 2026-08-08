const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
      <h1 className="text-8xl font-extrabold">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-2 text-sm font-semibold bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Go Back Home
      </a>
    </div>
  )
}

export default PageNotFound
