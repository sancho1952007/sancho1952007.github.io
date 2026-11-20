import { join, normalize, sep } from 'node:path'

const BASE_DIR = normalize(join(import.meta.dir, 'out'))
const PORT = Number(process.env.PORT) || 3000
const SITE_URL = process.env.SITE_URL || 'https://sancho.sg-app.com'

const HTML_CACHE = 'public, max-age=0, must-revalidate'
const IMMUTABLE_CACHE = 'public, max-age=31536000, immutable'
const ASSET_CACHE = 'public, max-age=604800'

function cacheControl(pathname) {
    if (pathname.startsWith('/_next/static/')) return IMMUTABLE_CACHE
    if (
        pathname.endsWith('.html') ||
        pathname.endsWith('.md') ||
        pathname.endsWith('.txt') ||
        pathname.endsWith('.xml') ||
        !pathname.includes('.')
    ) return HTML_CACHE
    return ASSET_CACHE
}

function contentType(file, pathname) {
    if (pathname.endsWith('.md')) return 'text/markdown; charset=utf-8'
    if (pathname.endsWith('.txt')) return 'text/plain; charset=utf-8'
    return file.type || 'application/octet-stream'
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

// Markdown files are duplicate representations of HTML pages. A canonical
// Link header keeps search engines on the HTML URL while AI agents can still
// read the Markdown source.
function markdownCanonical(pathname) {
    if (pathname === '/markdown/index.md') return `${SITE_URL}/`

    const project = pathname.match(/^\/markdown\/project\/(.+)\.md$/)
    if (!project) return null

    return `${SITE_URL}/project/${encodeURIComponent(project[1])}`
}

function staticResponse(file, pathname, status = 200) {
    const headers = {
        'Content-Type': contentType(file, pathname),
        'Cache-Control': cacheControl(pathname),
        'Content-Language': 'en',
        'X-Content-Type-Options': 'nosniff',
    }

    if (pathname.endsWith('.md')) {
        const canonical = markdownCanonical(pathname)
        if (canonical) headers.Link = `<${canonical}>; rel="canonical"`
    }

    return new Response(file, { status, headers })
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
        if (pathname === '/') {
            pathname = '/index.html'
        } else if (pathname.endsWith('.html')) {
            // Static export emits /page.html files. Redirect the explicit
            // .html URL to its clean equivalent so only one URL is indexable.
            const clean = pathname.slice(0, -'.html'.length) || '/'
            return Response.redirect(
                `${url.origin}${encodeURI(clean)}${url.search}`,
                301
            )
        }

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
                    'Content-Language': 'en',
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
