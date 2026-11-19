import { join, normalize, sep } from 'node:path'

const BASE_DIR = normalize(join(import.meta.dir, 'out'))
const PORT = Number(process.env.PORT) || 3000

const HTML_CACHE = 'public, max-age=0, must-revalidate'
const IMMUTABLE_CACHE = 'public, max-age=31536000, immutable'
const ASSET_CACHE = 'public, max-age=604800'

function cacheControl(pathname) {
    if (pathname.startsWith('/_next/static/')) return IMMUTABLE_CACHE
    if (pathname.endsWith('.html') || !pathname.includes('.')) return HTML_CACHE
    return ASSET_CACHE
}

function resolvePath(pathname) {
    const filePath = normalize(join(BASE_DIR, pathname))
    if (filePath !== BASE_DIR && !filePath.startsWith(BASE_DIR + sep)) return null
    return filePath
}

async function findStaticFile(pathname) {
    const candidates = pathname.endsWith('/')
        ? [`${pathname}index.html`]
        : [pathname, `${pathname}.html`]

    for (const candidate of candidates) {
        const filePath = resolvePath(candidate)
        if (!filePath) continue

        const file = Bun.file(filePath)
        if (await file.exists()) {
            return { file, pathname: candidate }
        }
    }

    return null
}

function staticResponse(file, pathname, status = 200) {
    return new Response(file, {
        status,
        headers: {
            'Content-Type': file.type || 'application/octet-stream',
            'Cache-Control': cacheControl(pathname),
            'X-Content-Type-Options': 'nosniff',
        },
    })
}

Bun.serve({
    port: PORT,
    async fetch(req) {
        const url = new URL(req.url)

        let pathname
        try {
            pathname = decodeURIComponent(url.pathname)
        } catch {
            return new Response('Bad Request', { status: 400 })
        }

        // Default root to index.html
        if (pathname === '/') pathname = '/index.html'

        const found = await findStaticFile(pathname)
        if (found) {
            return staticResponse(found.file, found.pathname)
        }

        const notFound = Bun.file(`${BASE_DIR}/404.html`)
        if (await notFound.exists()) {
            return new Response(notFound, {
                status: 404,
                headers: {
                    'Content-Type': notFound.type || 'text/html;charset=utf-8',
                    'Cache-Control': 'no-store',
                    'X-Content-Type-Options': 'nosniff',
                },
            })
        }

        return new Response('Not Found', {
            status: 404,
            headers: {
                'Cache-Control': 'no-store',
                'X-Content-Type-Options': 'nosniff',
            },
        })
    },
})
