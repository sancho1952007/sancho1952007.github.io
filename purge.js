if (process.env.CF_CACHE_PURGE_API_KEY && process.env.CF_CACHE_PURGE_ZONE_ID) {
  console.log('Purging Cloudflare cache for sancho.sg-app.com...');
  fetch('https://api.cloudflare.com/client/v4/zones/' + process.env.CF_CACHE_PURGE_ZONE_ID + '/purge_cache', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + process.env.CF_CACHE_PURGE_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ hosts: ['sancho.sg-app.com'] })
  }).then(async res => {
    if (res.ok) console.log('Cache purged successfully');
    else console.error('Failed to purge cache:', await res.text());
  }).catch(err => console.error('Error purging cache:', err));
} else {
  console.log('Skipping cache purge: Missing CF_CACHE_PURGE_API_KEY or CF_CACHE_PURGE_ZONE_ID');
}
