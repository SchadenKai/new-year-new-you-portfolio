import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Try to normalize URL for OEmbed - TikTok often prefers /video/ over /photo/ for oembed
    const normalizedUrl = url.replace('/photo/', '/video/');
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(normalizedUrl)}`;
    
    // Parallel fetch: OEmbed for reliable metadata + HTML scrape for stats/fallback
    const [oembedRes, htmlText] = await Promise.all([
        fetch(oembedUrl),
        fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }).then(r => r.ok ? r.text() : '').catch(() => '')
    ]);

    let data: any = {};
    let isOEmbedSuccess = false;

    if (oembedRes.ok) {
       data = await oembedRes.json();
       isOEmbedSuccess = true;
    } else {
       console.warn(`TikTok OEmbed error for ${url}: ${oembedRes.status} ${oembedRes.statusText}`);
    }
    
    // Attempt to extract stats and metadata from HTML (fallback or enrichment)
    let stats = {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        shareCount: 0
    };

    // Helper to extract meta content
    const getMeta = (prop: string) => {
        const match = htmlText.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`)) || 
                      htmlText.match(new RegExp(`<meta name="${prop}" content="([^"]*)"`));
        return match ? match[1] : null;
    };
    
    // Fallback metadata if OEmbed failed
    if (!isOEmbedSuccess) {
        const ogTitle = getMeta('og:title') || '';
        const ogImage = getMeta('og:image');
        const ogDesc = getMeta('og:description');
        
        // TikTok titles often look like "Creator (@user) on TikTok | Description"
        // Or just "Description"
        data = {
            title: ogTitle.split(' | ')[0] || 'TikTok Video',
            thumbnail_url: ogImage,
            author_name: ogDesc?.split(' on TikTok')[0] || 'TikTok User',
            provider_name: 'TikTok',
            type: 'video',
            html: '', // No embed HTML available easily without OEmbed
        };
    }

    try {
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
    
    // If we have absolutely nothing, fail
    if (!data.title && !data.thumbnail_url) {
        return NextResponse.json({ error: 'Failed to fetch TikTok data' }, { status: 400 });
    }

    return NextResponse.json({ ...data, stats });
  } catch (error) {
    console.error('Error fetching TikTok OEmbed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
