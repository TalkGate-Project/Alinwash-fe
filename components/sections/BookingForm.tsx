"use client";

import { useState } from "react";
import { format, parse } from "date-fns";
import DateTimePicker from "@/components/DateTimePicker";
import { useInViewOnce } from "@/hooks/useInViewOnce";

interface FormData {
  name: string;
  phone: string;
  date: string; // "yyyy-MM-dd'T'HH:mm" (예약일시)
}

interface FormErrors {
  name?: string;
  phone?: string;
  date?: string;
}

/**
 * 숫자만 추출 후 최대 11자리로 제한, 하이픈 자동 추가
 * - 10자리: 010-XXX-XXXX (3-3-4)
 * - 11자리: 010-XXXX-XXXX (3-4-4)
 */
function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const len = digits.length;
  if (len <= 3) return digits;
  if (len <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (len <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export default function BookingForm() {
  const { ref: sectionRef, inView } = useInViewOnce<HTMLDivElement>();
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    date: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "이름을 입력해 주세요.";
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) {
      newErrors.phone = "연락처를 입력해 주세요.";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      newErrors.phone = "연락처는 10~11자리 숫자로 입력해 주세요.";
    }

    if (!form.date) {
      newErrors.date = "예약일시를 선택해 주세요.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitError(null);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      try {
        const dateForServer = form.date
          ? format(parse(form.date, "yyyy-MM-dd'T'HH:mm", new Date()), "yyyy년 MM월 dd일 HH시")
          : "";
        const res = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            phone: form.phone.trim(),
            date: dateForServer,
          }),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) {
          setSubmitError(data.error ?? "제출에 실패했습니다. 다시 시도해 주세요.");
          return;
        }
        setSubmitted(true);
        setForm({ name: "", phone: "", date: "" });
        setErrors({});
        setSubmitError(null);
      } catch {
        setSubmitError("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    const next = field === "phone" ? formatPhoneInput(value) : value;
    setForm((prev) => ({ ...prev, [field]: next }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid = Object.keys(validate()).length === 0;
  const isButtonDisabled = submitting || (submitted && !isFormValid);
  const buttonLabel = submitting
    ? "제출 중..."
    : submitted && !isFormValid
      ? "전송완료"
      : "견적 및 예약상담";

  return (
    <section className="relative z-10 -mt-64 md:-mt-20">
      <div className="container-main">
        <div
          ref={sectionRef}
          className={`rounded-[24px] bg-white p-6 shadow-[0px_8px_12px_0px_#091E421A] md:px-[52px] md:pt-[44px] md:pb-[48px] reveal-up ${inView ? "reveal-visible" : ""}`}
        >
          <p className="mb-5 md:mb-[30px] flex items-center gap-2 text-body font-bold md:text-eyebrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-primary">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>지금 바로 예약을 완료하세요!</span>
              </p>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4 md:flex-row md:items-start md:gap-3"
              >
                {/* 이름 */}
                <div className="flex-1">
                  <label className="mb-1 block text-small font-medium">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <svg className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-icon-muted" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                      type="text"
                      placeholder="이름을 입력해주세요"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full min-h-[48px] rounded-lg border border-zinc-200 px-3 pl-10 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  {errors.name && (
                    <div className="mt-1 text-xs text-red-500" role="alert" aria-live="polite">
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* 연락처 */}
                <div className="flex-1">
                  <label className="mb-1 block text-small font-medium">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <svg className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-icon-muted" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M12 18H12.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="010-1234-5678"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      maxLength={13}
                      className="w-full min-h-[48px] rounded-lg border border-zinc-200 px-3 pl-10 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  {errors.phone && (
                    <div className="mt-1 text-xs text-red-500" role="alert" aria-live="polite">
                      {errors.phone}
                    </div>
                  )}
                </div>

                {/* 예약일시 */}
                <div className="flex-1">
                  <label className="mb-1 block text-small font-medium">
                    예약시간 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <svg
                      className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-icon-muted"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="[&_input]:pl-10">
                      <DateTimePicker
                        value={
                          form.date
                            ? parse(form.date, "yyyy-MM-dd'T'HH:mm", new Date())
                            : null
                        }
                        onChange={(date) =>
                          handleChange(
                            "date",
                            date ? format(date, "yyyy-MM-dd'T'HH:mm") : ""
                          )
                        }
                        placeholder="날짜와 시간을 선택해주세요"
                        dateFormat="yyyy. MM. dd HH시"
                        minDate={new Date()}
                        showMinute={false}
                        className="border-zinc-200"
                      />
                    </div>
                  </div>
                  {errors.date && (
                    <div className="mt-1 text-xs text-red-500" role="alert" aria-live="polite">
                      {errors.date}
                    </div>
                  )}
                </div>

                {/* 제출 버튼 */}
                <div className="flex flex-col gap-2 flex-shrink-0 pt-0 md:pt-6.5">
                  {submitError && (
                    <p className="text-sm text-red-500" role="alert">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className="min-h-[48px] w-full rounded-[50px] bg-primary px-6 text-body font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed md:min-w-[288px] md:w-auto"
                  >
                    {buttonLabel}
                  </button>
                </div>
              </form>
        </div>
      </div>
    </section>
  );
}
