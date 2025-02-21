/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const [semiBold, soraSemiBold, thin] = await Promise.all([
      fetch(new URL('public/fonts/JetBrainsMono-SemiBold.ttf', import.meta.url)).then((res) =>
        res.arrayBuffer(),
      ),
      fetch(new URL('public/fonts/Sora-SemiBold.ttf', import.meta.url)).then((res) =>
        res.arrayBuffer(),
      ),
      fetch(new URL('public/fonts/Sora-Thin.ttf', import.meta.url)).then((res) =>
        res.arrayBuffer(),
      ),
    ]);

    const { searchParams } = new URL(req.url);
    const heading = searchParams.get('heading');

    if (!heading) {
      return new Response('Missing heading parameter', { status: 400 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 46,
            backgroundColor: 'hsl(226 19% 8%)',
            color: 'hsl(231 28% 78%)',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div style={{ fontSize: 84, fontWeight: 700, fontFamily: 'Sora SemiBold' }}>
            {heading}
          </div>
          <div
            style={{
              display: 'flex',
              gap: 48,
              justifyItems: 'between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <img
              src="https://utfs.io/f/7b6ae0f8-148e-4e57-bd36-14ae0c90887b-e4obn3.gif"
              alt={'zackozack'}
              style={{
                borderRadius: '50%',
                width: 102,
                height: 102,
                border: '4px solid rgb(254, 215, 170)',
              }}
            />
            <h2
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 30,
              }}
            >
              <p
                style={{
                  fontFamily: 'Sora SemiBold',
                  fontSize: 42,
                }}
              >
                Ayush Kumar Yadav
              </p>
              <p
                style={{
                  fontFamily: 'Sora SemiBold',
                  fontSize: 42,
                  color: 'rgb(254, 215, 170)',
                }}
              >
                /
              </p>
              <p
                style={{
                  fontFamily: 'Sora Thin',
                  fontSize: 42,
                }}
              >
                zackozack
              </p>
            </h2>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'JetBrains Mono SemiBold',
            data: semiBold,
            style: 'normal',
            weight: 600,
          },
          {
            name: 'Sora SemiBold',
            data: soraSemiBold,
            style: 'normal',
            weight: 600,
          },
          {
            name: 'Sora Thin',
            data: thin,
            style: 'normal',
            weight: 100,
          },
        ],
      },
    );
  } catch (error) {
    console.error(error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
