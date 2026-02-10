"use client";

import { useState } from "react";
import { format, parse } from "date-fns";
import DateTimePicker from "@/components/DateTimePicker";

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

export default function BookingForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    date: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "이름을 입력해 주세요.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "연락처를 입력해 주세요.";
    } else if (!/^[\d-]+$/.test(form.phone)) {
      newErrors.phone = "올바른 연락처를 입력해 주세요.";
    }

    if (!form.date) {
      newErrors.date = "예약일시를 선택해 주세요.";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      // TODO: 백엔드 연동 시 여기에 API 호출
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // 입력 시 해당 필드 에러 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className="relative z-10 -mt-16 md:-mt-20">
      <div className="container-main">
        <div className="rounded-xl bg-white p-6 shadow-[0px_8px_12px_0px_#091E421A] md:px-[52px] md:pt-[44px] md:pb-[48px]">
          {submitted ? (
            <div className="py-4 text-center">
              <p className="text-lg font-semibold text-primary">
                예약 상담이 접수되었습니다!
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                빠른 시일 내에 연락드리겠습니다.
              </p>
              <button
                type="button"
                className="mt-4 text-sm text-primary underline"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", phone: "", date: "" });
                }}
              >
                다시 작성하기
              </button>
            </div>
          ) : (
            <>
              <p className="mb-5 md:mb-[30px] flex items-center gap-2 text-eyebrow font-bold">
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
                      className="w-full md:min-h-[48px] rounded-lg border border-zinc-200 px-3 pl-10 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div className="min-h-5 mt-1 text-xs text-red-500" role="alert" aria-live="polite">
                    {errors.name ?? "\u00A0"}
                  </div>
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
                      placeholder="연락처를 입력해주세요"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full md:min-h-[48px] rounded-lg border border-zinc-200 px-3 pl-10 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div className="min-h-5 mt-1 text-xs text-red-500" role="alert" aria-live="polite">
                    {errors.phone ?? "\u00A0"}
                  </div>
                </div>

                {/* 예약일시 */}
                <div className="flex-1">
                  <label className="mb-1 block text-small font-medium">
                    예약일시 <span className="text-red-500">*</span>
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
                  <div className="min-h-5 mt-1 text-xs text-red-500" role="alert" aria-live="polite">
                    {errors.date ?? "\u00A0"}
                  </div>
                </div>

                {/* 제출 버튼 */}
                <div className="flex-shrink-0 pt-0 md:pt-6.5">
                  <button
                    type="submit"
                    className="md:min-w-[288px] md:min-h-[48px] w-full rounded-[50px] bg-primary px-6 text-body font-semibold text-white transition-colors hover:bg-primary-hover md:w-auto"
                  >
                    견적 및 예약상담
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
