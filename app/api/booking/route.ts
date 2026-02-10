import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, date } = body as { name?: string; phone?: string; date?: string };

    if (!name?.trim() || !phone?.trim() || !date?.trim()) {
      return NextResponse.json(
        { error: "이름, 연락처, 예약일시는 필수입니다." },
        { status: 400 }
      );
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
      return NextResponse.json(
        { error: "텔레그램 연동이 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const message = [
      "🆕 <b>견적 및 예약상담 신청</b>",
      "",
      `👤 이름: ${escapeHtml(name.trim())}`,
      `📞 연락처: ${escapeHtml(phone.trim())}`,
      `📅 예약일시: ${escapeHtml(date.trim())}`,
    ].join("\n");

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const data = (await res.json()) as { ok?: boolean; description?: string };
    if (!res.ok || !data.ok) {
      console.error("Telegram API error:", data);
      return NextResponse.json(
        { error: "텔레그램 알림 전송에 실패했습니다." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Booking API error:", e);
    return NextResponse.json(
      { error: "처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
