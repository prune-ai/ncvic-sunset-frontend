/**
 * Cloudflare Worker for serving the NCVIC Sunset Frontend
 * This worker serves static files and handles SPA routing
 */

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    // Try to get the asset from the assets binding
    let asset = await env.ASSETS.fetch(request);

    // If the asset exists, return it
    if (asset.status !== 404) {
      return asset;
    }

    // For SPA routing, if the request is not for a file (no extension),
    // serve index.html
    const pathname = url.pathname;
    const hasFileExtension = /\.\w+$/.test(pathname);

    if (!hasFileExtension) {
      // Serve index.html for all non-file routes (SPA routing)
      const indexRequest = new Request(
        new URL("/index.html", request.url),
        request
      );
      const indexAsset = await env.ASSETS.fetch(indexRequest);

      if (indexAsset.status !== 404) {
        return indexAsset;
      }
    }

    // If we still don't have a response, return 404
    return new Response("Not Found", { status: 404 });
  },
};

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}
