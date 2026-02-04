import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
    
    // Parallel fetch: OEmbed for reliable metadata + HTML scrape for stats
    const [oembedRes, htmlText] = await Promise.all([
        fetch(oembedUrl),
        fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }).then(r => r.ok ? r.text() : '').catch(() => '')
    ]);

    if (!oembedRes.ok) {
       console.error(`TikTok OEmbed error: ${oembedRes.status} ${oembedRes.statusText}`);
       return NextResponse.json({ error: 'Failed to fetch OEmbed data' }, { status: oembedRes.status });
    }

    const data = await oembedRes.json();

    // Attempt to extract stats from HTML
    let stats = {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        shareCount: 0
    };

    try {
        // Look for the hydration data
        // Pattern: "stats":{..."diggCount":123,"shareCount":123,"commentCount":123,"playCount":123...}
        // or separated fields. Regex is safest for simple extraction without full parsing.
        
        const diggCountMatch = htmlText.match(/"diggCount":(\d+)/);
        const shareCountMatch = htmlText.match(/"shareCount":(\d+)/);
        const commentCountMatch = htmlText.match(/"commentCount":(\d+)/);
        const playCountMatch = htmlText.match(/"playCount":(\d+)/);
        
        if (diggCountMatch) stats.likeCount = parseInt(diggCountMatch[1]);
        if (shareCountMatch) stats.shareCount = parseInt(shareCountMatch[1]);
        if (commentCountMatch) stats.commentCount = parseInt(commentCountMatch[1]);
        if (playCountMatch) stats.viewCount = parseInt(playCountMatch[1]);
        
    } catch (e) {
        console.warn('Failed to parse TikTok stats from HTML', e);
    }

    return NextResponse.json({ ...data, stats });
  } catch (error) {
    console.error('Error fetching TikTok OEmbed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
