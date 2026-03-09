import { like, eq } from 'drizzle-orm'
import { blocks } from '@/db/schema'

/**
 * Extracts asset keys from any list of objects.
 * Works for blocks (item.content.url) or simple objects (item.url)
 */
export const extractAssetKeys = (items: any[]) => {
  const keys: string[] = []
  items.forEach(item => {
    const content = item?.content || item
    const url = typeof content === 'string' ? JSON.parse(content).url : content?.url
    
    if (typeof url === 'string' && url.includes('/v1/assets/')) {
      const parts = url.split('/')
      keys.push(parts[parts.length - 1])
    }
  })
  return keys
}

/**
 * Generic cleanup that deletes files from R2 if they are no longer in use.
 */
export const cleanupOrphanedAssets = async (
  r2: R2Bucket, 
  oldKeys: string[], 
  newKeys: string[],
  isStillInUse: (key: string) => Promise<boolean>
) => {
  const potentialOrphans = oldKeys.filter(k => !newKeys.includes(k))
  
  for (const key of potentialOrphans) {
    if (!(await isStillInUse(key))) {
      try {
        await r2.delete(key)
      } catch (e) {
        console.error(`Failed to delete orphan asset: ${key}`, e)
      }
    }
  }
}