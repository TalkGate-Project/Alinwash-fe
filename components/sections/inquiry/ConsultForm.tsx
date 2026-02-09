"use client";

import { useState } from "react";

interface FormData {
  name: string;
  phone: string;
  time: string;
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

export default function ConsultForm() {
  const [form, setForm] = useState<FormData>(initialForm);
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

    if (!form.time.trim()) {
      newErrors.time = "예약시간을 입력해 주세요.";
    }

    if (!form.agree) {
      newErrors.agree = "개인정보 수집 및 이용에 동의해 주세요.";
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

  const handleChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass =
    "pl-4 w-full border-b border-zinc-200 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-primary";

  return (
    <section className="border-t border-zinc-100 py-16 md:py-24">
      <div className="container-main">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center text-2xl font-bold md:text-[48px] tracking-[-0.04em] text-heading">
            상세 상담 및 예약 신청
          </h2>
          <p className="mt-3 text-center text-[18px] text-muted">
            연락처를 남겨주시면, 확인 후 빠르고 상세한 안내를 도와드리겠습니다.
          </p>

          {submitted ? (
            <div className="mt-12 py-8 text-center">
              <p className="text-lg font-semibold text-primary">
                상담 신청이 접수되었습니다!
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                빠른 시일 내에 연락드리겠습니다.
              </p>
              <button
                type="button"
                className="mt-4 text-sm text-primary underline"
                onClick={() => {
                  setSubmitted(false);
                  setForm(initialForm);
                }}
              >
                다시 작성하기
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-12 space-y-6"
            >
              {/* 이름 */}
              <div>
                <label className="mb-1 block text-sm font-medium">
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
                <label className="mb-1 block text-sm font-medium">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="연락처를 입력하세요"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={inputClass}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* 예약시간 */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  예약시간 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예약시간을 입력하세요"
                  value={form.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className={inputClass}
                />
                {errors.time && (
                  <p className="mt-1 text-xs text-red-500">{errors.time}</p>
                )}
              </div>

              {/* 차량번호 */}
              <div>
                <label className="mb-1 block text-sm font-medium">
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
                <label className="mb-1 block text-sm font-medium">
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
                <label className="mb-1 block text-sm font-medium">
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
                <label className="mb-1 block text-sm font-medium">
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
                  <label className="flex items-start gap-2 text-sm">
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
                className="w-full rounded-[50px] bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                신청하기
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
