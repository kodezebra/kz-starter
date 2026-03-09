import { Context } from "hono";
import { getDb } from "@/db";
import { pages, blocks } from "@/db/schema";
import { eq, isNull, asc } from "drizzle-orm";
import { Layout } from "@/components/Layout";
import { BlockRenderer } from "@/components/BlockRenderer";

interface PageData {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
}

interface BlockData {
  id: string;
  type: string;
  content: any;
}

async function getPage(c: Context, slug: string): Promise<PageData | null> {
  const db = getDb(c);
  let [page] = await db.select().from(pages).where(eq(pages.slug, slug)).execute();
  if (!page) [page] = await db.select().from(pages).where(eq(pages.id, slug)).execute();
  return page || null;
}

async function getBlocks(c: Context, pageId: string): Promise<BlockData[]> {
  const db = getDb(c);

  let data;
  if (pageId === "global") {
    data = await db.select().from(blocks).where(isNull(blocks.pageId)).orderBy(asc(blocks.order)).execute();
  } else {
    data = await db.select().from(blocks).where(eq(blocks.pageId, pageId)).orderBy(asc(blocks.order)).execute();
  }

  // Parse JSON content
  return data.map((b) => {
    let content = b.content;
    if (typeof content === "string") {
      try {
        content = JSON.parse(content);
      } catch {
        console.warn(`Failed to parse block content for id: ${b.id}`);
      }
    }
    return { ...b, content };
  });
}

export async function renderPage(c: Context, slug: string) {
  const actualSlug = slug || "home";

  const page = await getPage(c, actualSlug);
  const pageBlocks = page?.id ? await getBlocks(c, page.id) : [];
  const globalBlocks = await getBlocks(c, "global");
  
  const headerBlock = globalBlocks.find(b => b.type === "header");
  const footerBlock = globalBlocks.find(b => b.type === "footer");

  const isNotFound = !page || (!page.isPublished && actualSlug !== "home");
  const isHome = actualSlug === "home";

  if (isNotFound) {
    if (isHome) {
      return c.html(
        <Layout title="Welcome to FSK CMS">
          <div class="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Welcome to FSK CMS</h1>
            <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
              Your site is ready! To get started, create a page with the slug <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">home</code> in the dashboard.
            </p>
            <div class="flex gap-4">
              <a href="http://localhost:5173" class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">Go to Dashboard</a>
            </div>
          </div>
        </Layout>
      );
    }

    return c.html(
      <Layout title="Page Not Found">
        <div class="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
          <h1 class="text-6xl font-bold text-gray-200 mb-4">404</h1>
          <h2 class="text-2xl font-bold mb-4">Page Not Found</h2>
          <p class="text-gray-600 mb-8 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
          <a href="/" class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Back to Home</a>
        </div>
      </Layout>
    );
  }

  return c.html(
    <Layout title={page?.title || "Page"} headerBlock={headerBlock} footerBlock={footerBlock}>
      <main>
        <BlockRenderer blocks={pageBlocks || []} />
      </main>
    </Layout>
  );
}
