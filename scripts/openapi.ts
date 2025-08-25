import fs from 'fs/promises'
import path from 'path'
import { pathToFileURL } from 'url'
import { createDocument } from 'zod-openapi'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PathsObject = Record<string, any>

let memoizedMergedPaths: PathsObject | null = null

const EXCLUDE_DIRS = new Set(['node_modules', '.next', '.git'])

async function findOpenApiFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const results: string[] = []

  for (const ent of entries) {
    if (ent.isDirectory()) {
      if (EXCLUDE_DIRS.has(ent.name)) continue
      results.push(...(await findOpenApiFiles(path.join(dir, ent.name))))
    } else if (ent.isFile()) {
      if (ent.name === 'openapi.ts') {
        results.push(path.join(dir, ent.name))
      }
    }
  }
  return results
}

async function importModule(absPath: string) {
  const href = pathToFileURL(absPath).href
  return import(href)
}

export async function loadAndMergeAllPaths(): Promise<PathsObject> {
  if (memoizedMergedPaths) return memoizedMergedPaths

  const apiDir = path.join(process.cwd(), 'src', 'app', 'api')
  const files = await findOpenApiFiles(apiDir)

  const pathObjects: PathsObject[] = []
  for (const abs of files) {
    try {
      const mod = await importModule(abs)
      const paths: unknown = mod?.default ?? mod?.paths ?? mod
      if (paths && typeof paths === 'object') {
        pathObjects.push(paths as PathsObject)
      } else {
        console.warn(`[openapi] ${abs} 에서 paths 객체를 찾지 못했습니다.`)
      }
    } catch (err) {
      console.warn(`[openapi] ${abs} import 실패:`, err)
    }
  }

  memoizedMergedPaths = Object.assign({}, ...pathObjects)
  return memoizedMergedPaths as PathsObject
}

export async function buildOpenApiDocument() {
  const mergedPaths = await loadAndMergeAllPaths()
  return createDocument({
    openapi: '3.1.0',
    info: {
      title: 'Exitmate API',
      version: '1.0.0',
      description: 'Exitmate API 명세',
    },
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [{ url: 'http://localhost:3000/api', description: 'Local 서버' }],
    paths: mergedPaths,
  })
}

export async function createSwaggerJson() {
  const outputDir = path.join(process.cwd(), 'public')
  const jsonPath = path.join(outputDir, 'openapi.json')

  const doc = await buildOpenApiDocument()
  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(jsonPath, JSON.stringify(doc, null, 2), 'utf-8')
}

createSwaggerJson()
