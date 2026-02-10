"use client";

import { useState } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { format, parse } from "date-fns";
import DateTimePicker from "@/components/DateTimePicker";
import SubmitStatusModal from "@/components/SubmitStatusModal";

interface FormData {
  name: string;
  phone: string;
  time: string; // "yyyy-MM-dd'T'HH:mm"
  carNumber: string;
  carModel: string;
  address: string;
  content: string;
  agree: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  time?: string;
  agree?: string;
}

const initialForm: FormData = {
  name: "",
  phone: "",
  time: "",
  carNumber: "",
  carModel: "",
  address: "",
  content: "",
  agree: false,
};

function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const len = digits.length;
  if (len <= 3) return digits;
  if (len <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (len <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export default function ConsultForm() {
  const { ref: sectionRef, inView } = useInViewOnce<HTMLDivElement>();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitModalType, setSubmitModalType] = useState<"success" | "error" | null>(null);

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

    if (!form.time.trim()) {
      newErrors.time = "예약시간을 입력해 주세요.";
    }

    if (!form.agree) {
      newErrors.agree = "개인정보 수집 및 이용에 동의해 주세요.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      try {
        const res = await fetch("/api/consult", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            phone: form.phone.trim(),
            time: form.time.trim(),
            carNumber: form.carNumber.trim(),
            carModel: form.carModel.trim(),
            address: form.address.trim(),
            content: form.content.trim(),
            agree: form.agree,
          }),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) {
          setSubmitModalType("error");
          return;
        }
        setSubmitModalType("success");
        setForm(initialForm);
        setErrors({});
      } catch {
        setSubmitModalType("error");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    const nextValue =
      field === "phone" && typeof value === "string"
        ? formatPhoneInput(value)
        : value;

    setForm((prev) => ({ ...prev, [field]: nextValue }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const phoneDigits = form.phone.replace(/\D/g, "");
  const isSubmittable =
    form.name.trim().length > 0 &&
    phoneDigits.length >= 10 &&
    phoneDigits.length <= 11 &&
    form.time.trim().length > 0 &&
    form.agree;

  const inputClass =
    "pl-4 w-full border-b border-zinc-200 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-primary";
  const dateTimeInputClass =
    "!min-h-0 !h-auto !rounded-none !border-0 !border-b !border-zinc-200 !bg-transparent !px-4 !py-3 !text-sm !outline-none !transition-colors placeholder:!text-zinc-400 focus:!border-primary";

  return (
    <section className="border-t border-zinc-100 py-12 md:py-24">
      <div className="!px-7 container-main">
        <div
          ref={sectionRef}
          className={`mx-auto max-w-xl reveal-up ${inView ? "reveal-visible" : ""}`}
        >
          <h2 className="text-center text-[20px] font-bold tracking-[-0.04em] text-heading md:text-section-title">
            상세 상담 및 예약 신청
          </h2>
          <p className="mt-2 md:mt-3 text-center text-small text-muted md:text-body">
            연락처를 남겨주시면,<br className="md:hidden" /> 확인 후 빠르고 정확한 안내를 도와드리겠습니다.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-12 space-y-6"
          >
              {/* 이름 */}
              <div>
                <label className="mb-1 block text-[16px] font-medium md:text-[18px]">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={inputClass}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* 연락처 */}
              <div>
                <label className="mb-1 block text-[16px] font-medium md:text-[18px]">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="연락처를 입력하세요"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  maxLength={13}
                  className={inputClass}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* 예약시간 */}
              <div>
                <label className="mb-1 block text-[16px] font-medium md:text-[18px]">
                  예약시간 <span className="text-red-500">*</span>
                </label>
                <DateTimePicker
                  value={
                    form.time
                      ? parse(form.time, "yyyy-MM-dd'T'HH:mm", new Date())
                      : null
                  }
                  onChange={(date) =>
                    handleChange(
                      "time",
                      date ? format(date, "yyyy-MM-dd'T'HH:mm") : ""
                    )
                  }
                  placeholder="날짜와 시간을 선택해 주세요"
                  dateFormat="yyyy. MM. dd HH시"
                  minDate={new Date()}
                  showMinute={false}
                  className={dateTimeInputClass}
                />
                {errors.time && (
                  <p className="mt-1 text-xs text-red-500">{errors.time}</p>
                )}
              </div>

              {/* 차량번호 */}
              <div>
                <label className="mb-1 block text-[16px] font-medium md:text-[18px]">
                  차량번호
                </label>
                <input
                  type="text"
                  placeholder="차량번호를 입력하세요"
                  value={form.carNumber}
                  onChange={(e) => handleChange("carNumber", e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* 차종/색상 */}
              <div>
                <label className="mb-1 block text-[16px] font-medium md:text-[18px]">
                  차종/색상{" "}
                  <span className="text-zinc-400">
                    (ex. 현대 제네시스 검정)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="차종과 색상을 입력하세요"
                  value={form.carModel}
                  onChange={(e) => handleChange("carModel", e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* 주소 */}
              <div>
                <label className="mb-1 block text-[16px] font-medium md:text-[18px]">
                  주소{" "}
                  <span className="text-zinc-400">
                    (ex. 아파트명 000동 000호)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="주소를 입력하세요"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* 상담내용 */}
              <div>
                <label className="mb-1 block text-[16px] font-medium md:text-[18px]">
                  상담내용
                </label>
                <textarea
                  rows={4}
                  placeholder=""
                  value={form.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  className="w-full resize-none rounded-lg border border-zinc-200 bg-transparent p-3 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-primary"
                />
              </div>

              {/* 개인정보 동의 */}
              <div>
                <div className="flex justify-between items-start gap-2">
                  <label className="flex items-center gap-2 text-[16px] md:text-[18px]">
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={(e) => handleChange("agree", e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-zinc-300 accent-primary"
                    />
                    <span>
                      개인정보 수집 및 이용 동의{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <button type="button" className="text-sm text-heading underline">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.0001 7.2002L12.0001 13.2002L18.0001 7.2002L20.4001 8.4002L12.0001 16.8002L3.6001 8.4002L6.0001 7.2002Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
                {errors.agree && (
                  <p className="mt-1 text-xs text-red-500">{errors.agree}</p>
                )}
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={submitting || !isSubmittable}
                className="w-full rounded-[50px] bg-primary py-4 md:py-3.5 text-body font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "전송 중..." : "신청하기"}
              </button>
            </form>
        </div>
      </div>
      <SubmitStatusModal
        open={submitModalType !== null}
        type={submitModalType ?? "success"}
        onClose={() => setSubmitModalType(null)}
      />
    </section>
  );
}
