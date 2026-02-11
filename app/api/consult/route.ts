import { NextRequest, NextResponse } from "next/server";
import { format, parse } from "date-fns";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface ConsultPayload {
  name?: string;
  phone?: string;
  time?: string;
  carNumber?: string;
  carModel?: string;
  address?: string;
  placeDetail?: string;
  content?: string;
  agree?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ConsultPayload;

    const name = body.name?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const time = body.time?.trim() ?? "";
    const phoneDigits = phone.replace(/\D/g, "");

    if (!name || !phone || !time || body.agree !== true) {
      return NextResponse.json(
        { error: "이름, 연락처, 예약시간, 개인정보 동의는 필수입니다." },
        { status: 400 }
      );
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      return NextResponse.json(
        { error: "연락처는 10~11자리 숫자로 입력해 주세요." },
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

    const formattedTime = formatConsultTime(time);

    const message = [
      "🆕 <b>온라인 문의 신청</b>",
      "",
      `👤 이름: ${escapeHtml(name)}`,
      `📞 연락처: ${escapeHtml(phone)}`,
      `⏰ 예약시간: ${escapeHtml(formattedTime)}`,
      `🚗 차량번호: ${escapeHtml(body.carNumber?.trim() || "-")}`,
      `🚘 차종/색상: ${escapeHtml(body.carModel?.trim() || "-")}`,
      `📍 주소: ${escapeHtml(body.address?.trim() || "-")}`,
      `📌 장소 설명: ${escapeHtml(body.placeDetail?.trim() || "-")}`,
      `📝 상담내용: ${escapeHtml(body.content?.trim() || "-")}`,
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
    console.error("Consult API error:", e);
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

function formatConsultTime(time: string): string {
  try {
    // DateTimePicker 전송 포맷: yyyy-MM-dd'T'HH:mm
    const parsed = parse(time, "yyyy-MM-dd'T'HH:mm", new Date());
    if (Number.isNaN(parsed.getTime())) return time;
    return format(parsed, "yyyy년 MM월 dd일 HH시");
  } catch {
    return time;
  }
}
