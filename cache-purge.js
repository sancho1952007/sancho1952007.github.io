const HOST = 'sancho.sg-app.com'
const PURGE_ENDPOINT = 'https://api.cloudflare.com/client/v4/zones'

async function purgeCache() {
  const apiKey = process.env.CF_CACHE_PURGE_API_KEY
  const zoneId = process.env.CF_CACHE_PURGE_ZONE_ID

  if (!apiKey || !zoneId) {
    console.log('Skipping cache purge: Missing CF_CACHE_PURGE_API_KEY or CF_CACHE_PURGE_ZONE_ID')
    return
  }

  console.log(`Purging Cloudflare cache for ${HOST}...`)

  try {
    const res = await fetch(`${PURGE_ENDPOINT}/${zoneId}/purge_cache`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hosts: [HOST] }),
    })

    const data = await res.json().catch(() => null)

    if (res.ok && data?.success) {
      console.log('Cache purged successfully')
    } else {
      console.error('Failed to purge cache:', data ?? `HTTP ${res.status}`)
    }
  } catch (err) {
    console.error('Error purging cache:', err)
  }
}

purgeCache()
