"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { generateMonthCells } from "@/utils/calendar";

function getBodyZoom(): number {
  if (typeof document === "undefined") return 1;
  const raw = String(
    ((document.body.style as unknown as Record<string, unknown>).zoom ?? "") as string
  ).trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export type DatePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
  dateFormat?: string;
  /** 패널과 인풋 사이 세로 간격(px). 기본 8 */
  panelOffsetY?: number;
};

export default function DatePicker({
  value,
  onChange,
  placeholder = "예약날짜를 선택해주세요",
  className = "",
  disabled,
  minDate,
  maxDate,
  dateFormat = "yyyy. MM. dd",
  panelOffsetY = 8,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"month" | "year">("month");
  const initial = useMemo(
    () => (value ? new Date(value) : new Date()),
    [value]
  );
  const [view, setView] = useState<Date>(
    new Date(initial.getFullYear(), initial.getMonth(), 1)
  );
  const minYear = minDate ? minDate.getFullYear() : null;
  const maxYear = maxDate ? maxDate.getFullYear() : new Date().getFullYear() + 10;
  const defaultYearStart = minYear ? minYear : initial.getFullYear() - 20;
  const [yearStart, setYearStart] = useState<number>(defaultYearStart);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(
    null
  );

  const closeAndReset = useCallback(() => {
    setOpen(false);
    const base = value ? new Date(value) : new Date();
    setView(new Date(base.getFullYear(), base.getMonth(), 1));
    const resetMinYear = minDate ? minDate.getFullYear() : null;
    const resetYearStart = resetMinYear ? resetMinYear : base.getFullYear() - 20;
    setYearStart(resetYearStart);
    setMode("month");
  }, [value, minDate]);

  useEffect(() => {
    if (!open) return;
    function onDocMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      const inRoot = !!rootRef.current?.contains(t);
      const inPanel = !!panelRef.current?.contains(t);
      if (!inRoot && !inPanel) closeAndReset();
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") closeAndReset();
    }
    document.addEventListener("mousedown", onDocMouseDown, true);
    document.addEventListener("keydown", onEsc, true);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown, true);
      document.removeEventListener("keydown", onEsc, true);
    };
  }, [open, closeAndReset]);

  useEffect(() => {
    if (!open) return;
    function update() {
      const el = inputRef.current;
      const panel = panelRef.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const zoom = getBodyZoom();
      const panelHeight = panel?.offsetHeight ?? 400;
      const panelWidth = 256;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const gapY = panelOffsetY;
      const padding = 16;

      const spaceBelow = viewportHeight - r.bottom;
      const spaceAbove = r.top;

      let top: number;
      if (
        spaceBelow < panelHeight + gapY &&
        spaceAbove > panelHeight + gapY
      ) {
        top = (r.top - panelHeight - gapY) / zoom;
      } else {
        top = (r.bottom + gapY) / zoom;
      }

      let left = r.left / zoom + (window.scrollX || 0);
      const isMobile = viewportWidth < 768;

      if (isMobile) {
        const maxLeft = (viewportWidth - panelWidth - padding) / zoom;
        if (left > maxLeft) {
          left = Math.max(padding / zoom, maxLeft);
        }
      }

      setPanelPos({ top, left });
    }

    const timer = setTimeout(update, 0);
    update();

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, panelOffsetY]);

  const label = useMemo(() => {
    const y = view.getFullYear();
    const m = view.getMonth() + 1;
    return `${m}월 ${y}`;
  }, [view]);

  function openPicker() {
    if (disabled) return;
    setOpen(true);
    setMode("month");
    const base = value ? new Date(value) : new Date();
    setView(new Date(base.getFullYear(), base.getMonth(), 1));
    const openMinYear = minDate ? minDate.getFullYear() : null;
    const openYearStart = openMinYear ? openMinYear : base.getFullYear() - 20;
    setYearStart(openYearStart);
  }

  function goPrev() {
    if (mode === "month") {
      setView((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1));
    }
  }

  function goNext() {
    if (mode === "month") {
      setView((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1));
    }
  }

  function onSelectDay(d: Date) {
    onChange(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
    closeAndReset();
  }

  function onSelectYear(y: number) {
    setView((v) => new Date(y, v.getMonth(), 1));
    setMode("month");
  }

  const monthCells = useMemo(() => generateMonthCells(view), [view]);

  return (
    <div ref={rootRef} className="relative w-full">
      <input
        ref={inputRef}
        readOnly
        disabled={disabled}
        onClick={openPicker}
        onFocus={openPicker}
        value={value ? format(value, dateFormat, { locale: ko }) : ""}
        placeholder={placeholder}
        className={`h-[34px] w-full cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-primary disabled:opacity-50 md:min-h-[48px] md:h-[48px] ${className}`}
      />

      {open &&
        panelPos &&
        createPortal(
          <div
            ref={panelRef}
            className="z-[1000] w-[256px] rounded-xl border border-zinc-100 bg-white p-4 shadow-[0px_18px_28px_rgba(9,30,66,0.10)]"
            style={{
              position: "fixed",
              top: panelPos.top,
              left: panelPos.left,
            }}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                onClick={() => {
                  if (mode === "month") {
                    setMode("year");
                    const toggleMinYear = minDate
                      ? minDate.getFullYear()
                      : null;
                    const toggleYearStart = toggleMinYear
                      ? toggleMinYear
                      : view.getFullYear() - 20;
                    setYearStart(toggleYearStart);
                  } else {
                    setMode("month");
                  }
                }}
                aria-label="연도 선택 토글"
              >
                {label}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`text-footer-text transition-transform ${mode === "year" ? "rotate-180" : ""}`}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {mode === "month" && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border border-zinc-200 hover:bg-zinc-100"
                    onClick={goPrev}
                    aria-label="이전"
                  >
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-icon-muted"
                    >
                      <path
                        d="M7 13L1 7L7 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border border-zinc-200 hover:bg-zinc-100"
                    onClick={goNext}
                    aria-label="다음"
                  >
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-icon-muted"
                    >
                      <path
                        d="M1 13L7 7L1 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Body */}
            {mode === "month" ? (
              <div>
                <div className="mb-2 grid grid-cols-7 gap-y-2">
                  {DAYS.map((d) => (
                    <div
                      key={d}
                      className="flex h-8 w-8 items-center justify-center text-xs text-zinc-500"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-1">
                  {monthCells.map(({ date, inCurrent }) => {
                    const isSelected =
                      value &&
                      date.getFullYear() === value.getFullYear() &&
                      date.getMonth() === value.getMonth() &&
                      date.getDate() === value.getDate();

                    const dateOnly = new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate()
                    );
                    const minDateOnly = minDate
                      ? new Date(
                          minDate.getFullYear(),
                          minDate.getMonth(),
                          minDate.getDate()
                        )
                      : null;
                    const maxDateOnly = maxDate
                      ? new Date(
                          maxDate.getFullYear(),
                          maxDate.getMonth(),
                          maxDate.getDate()
                        )
                      : null;

                    const isDisabled =
                      (minDateOnly && dateOnly < minDateOnly) ||
                      (maxDateOnly && dateOnly > maxDateOnly);

                    const baseCls =
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm";
                    const textCls = inCurrent
                      ? "text-zinc-800"
                      : "text-zinc-400";
                    const selectedCls = isSelected
                      ? "bg-primary/15 text-primary font-medium"
                      : "hover:bg-zinc-100 cursor-pointer";
                    const disabledCls = isDisabled
                      ? "cursor-not-allowed opacity-30"
                      : "";

                    return (
                      <button
                        key={date.toISOString() + String(inCurrent)}
                        type="button"
                        className={`${baseCls} ${textCls} ${isDisabled ? disabledCls : selectedCls} ${disabledCls}`}
                        onClick={() => !isDisabled && onSelectDay(date)}
                        disabled={isDisabled || undefined}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="max-h-[240px] overflow-y-auto">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({
                    length: Math.min(80, maxYear - yearStart + 1),
                  }).map((_, idx) => {
                    const y = yearStart + idx;
                    if (y > maxYear) return null;
                    const isCurrentYear = view.getFullYear() === y;
                    const isDisabled =
                      (minDate ? y < minDate.getFullYear() : false) ||
                      (maxDate ? y > maxDate.getFullYear() : false);
                    return (
                      <button
                        key={y}
                        type="button"
                        onClick={() => !isDisabled && onSelectYear(y)}
                        disabled={isDisabled || undefined}
                        className={`h-8 rounded-lg text-sm ${
                          isDisabled
                            ? "cursor-not-allowed opacity-30 text-zinc-400"
                            : isCurrentYear
                              ? "bg-primary/15 font-medium text-primary cursor-pointer"
                              : "cursor-pointer text-zinc-800 hover:bg-zinc-100"
                        }`}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
