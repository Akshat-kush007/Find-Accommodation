import React from 'react'

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-darkslate-900 text-white font-inter px-4">
      <div className="w-full max-w-[600px] text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6">
          Error: 404 <span className="text-teal-400">Page Not Found</span>
        </h1>
      </div>
    </div>
  )
}
