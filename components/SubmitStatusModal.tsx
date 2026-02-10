"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type SubmitStatusType = "success" | "error";

interface SubmitStatusModalProps {
  open: boolean;
  type: SubmitStatusType;
  onClose: () => void;
}

const CONTENT: Record<
  SubmitStatusType,
  { title: string; description: string; buttonText: string }
> = {
  success: {
    title: "예약 신청이 접수되었습니다!",
    description:
      "보내주신 예약 내용을 확인하였습니다.\n담당자가 내용을 검토한 후, 빠른 시일 내에\n안내 연락을 드릴 예정입니다. 조금만 기다려 주세요!",
    buttonText: "확인",
  },
  error: {
    title: "전송에 실패했습니다",
    description:
      "네트워크 또는 서버 상태로 인해 요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    buttonText: "다시 시도",
  },
};

export default function SubmitStatusModal({
  open,
  type,
  onClose,
}: SubmitStatusModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof window === "undefined") return null;

  const content = CONTENT[type];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-status-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[380px] rounded-[24px] bg-white shadow-[0px_4px_8px_rgba(16,24,64,0.08)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-t-[24px] bg-white px-5 py-4">
          <div className="flex min-h-[222px] flex-col items-center justify-center gap-3">
            {type === "success" ? (
              <Image
                src="/form-submit-success.png"
                alt="전송 성공"
                width={144}
                height={105}
                priority
              />
            ) : (
              <div className="flex h-[105px] w-[144px] items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="#E03137"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}

            <h3
              id="submit-status-title"
              className="text-center text-[18px] font-bold leading-[152%] tracking-[-0.04em] text-[#282A2F]"
            >
              {content.title}
            </h3>
            <p className="max-w-[344px] whitespace-pre-line text-center text-sm leading-[160%] tracking-[-0.04em] text-[rgba(34,34,38,0.82)]">
              {content.description}
            </p>
          </div>
        </div>

        <div className="rounded-b-[24px] bg-white px-5 py-4 shadow-[0px_4px_4px_rgba(16,24,64,0.08)]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-[50px] bg-primary text-base font-bold leading-6 text-white transition-colors hover:bg-primary-hover"
          >
            {content.buttonText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
