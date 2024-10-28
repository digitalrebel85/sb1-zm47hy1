import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") ?? "Find an Advisor"
    const type = searchParams.get("type")
    const city = searchParams.get("city")

    const interSemiBold = await fetch(
      new URL("https://rsms.me/inter/font-files/Inter-SemiBold.woff", import.meta.url)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: "40px",
            fontFamily: "Inter",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 60,
                fontWeight: 700,
                textAlign: "center",
                color: "black",
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
            {type && city && (
              <div
                style={{
                  display: "flex",
                  fontSize: 30,
                  color: "#666",
                  textAlign: "center",
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Advisors in {city}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interSemiBold,
            style: "normal",
            weight: 600,
          },
        ],
      }
    )
  } catch (e: any) {
    console.error("Failed to generate OG image:", e)
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    })
  }
}