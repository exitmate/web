'use client'

import dynamic from 'next/dynamic'

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SwaggerUI
        url="/openapi.json"
        docExpansion="none"
        defaultModelsExpandDepth={0}
        deepLinking
      />
    </main>
  )
}
