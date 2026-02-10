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
type Period = "오전" | "오후";

function dateToTimeParts(d: Date): { period: Period; hour12: number; minute: number } {
  const h = d.getHours();
  const m = d.getMinutes();
  const period: Period = h < 12 ? "오전" : "오후";
  const base = h % 12;
  const hour12 = base === 0 ? 12 : base;
  return { period, hour12, minute: m };
}

function timePartsToHoursMinutes(period: Period, hour12: number, minute: number): { h: number; m: number } {
  const normalized = ((hour12 % 12) + 12) % 12;
  const h = period === "오전" ? normalized : normalized + 12;
  return { h, m: minute };
}

export type DateTimePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
  /** 분 선택 컬럼 표시 여부. false면 시 단위만 선택 (기본: true) */
  showMinute?: boolean;
  /** 분 단위 스텝. showMinute가 true일 때만 사용 (기본: 10) */
  minuteStep?: number;
  dateFormat?: string;
  /** 패널과 인풋 사이 세로 간격(px). 기본 8 */
  panelOffsetY?: number;
};

export default function DateTimePicker({
  value,
  onChange,
  placeholder = "날짜와 시간을 선택해주세요",
  className = "",
  disabled,
  minDate,
  maxDate,
  showMinute = true,
  minuteStep = 10,
  dateFormat = "yyyy. MM. dd HH:mm",
  panelOffsetY = 8,
}: DateTimePickerProps) {
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

  const baseDate = value
    ? new Date(value)
    : (() => {
        const d = new Date();
        d.setHours(9, 0, 0, 0);
        return d;
      })();
  const { period, hour12, minute } = dateToTimeParts(baseDate);
  const effectiveMinute = showMinute ? minute : 0;
  const [timePeriod, setTimePeriod] = useState<Period>(period);
  const [timeHour12, setTimeHour12] = useState<number>(hour12);
  const [timeMinute, setTimeMinute] = useState<number>(effectiveMinute);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);

  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const minutes = useMemo(
    () =>
      showMinute
        ? Array.from(
            { length: Math.floor(60 / minuteStep) },
            (_, i) => i * minuteStep
          )
        : [],
    [showMinute, minuteStep]
  );

  const closeAndReset = useCallback(() => {
    setOpen(false);
    const base = value ? new Date(value) : new Date();
    setView(new Date(base.getFullYear(), base.getMonth(), 1));
    const resetMinYear = minDate ? minDate.getFullYear() : null;
    const resetYearStart = resetMinYear ? resetMinYear : base.getFullYear() - 20;
    setYearStart(resetYearStart);
    setMode("month");
    const t = dateToTimeParts(base);
    setTimePeriod(t.period);
    setTimeHour12(t.hour12);
    setTimeMinute(showMinute ? t.minute : 0);
  }, [value, minDate, showMinute]);

  useEffect(() => {
    if (!open) return;
    function onDocMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!rootRef.current?.contains(t) && !panelRef.current?.contains(t))
        closeAndReset();
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
      const panelWidth = showMinute ? 520 : 440;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const gapY = panelOffsetY;
      const padding = 16;
      const spaceBelow = viewportHeight - r.bottom;
      const spaceAbove = r.top;
      let top: number;
      if (spaceBelow < panelHeight + gapY && spaceAbove > panelHeight + gapY) {
        top = (r.top - panelHeight - gapY) / zoom;
      } else {
        top = (r.bottom + gapY) / zoom;
      }
      let left = r.left / zoom + (window.scrollX || 0);
      if (viewportWidth < 768) {
        const maxLeft = (viewportWidth - panelWidth - padding) / zoom;
        if (left > maxLeft) left = Math.max(padding / zoom, maxLeft);
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

  useEffect(() => {
    if (!open) {
      const base = value ? new Date(value) : new Date();
      setView(new Date(base.getFullYear(), base.getMonth(), 1));
      const syncMinYear = minDate ? minDate.getFullYear() : null;
      setYearStart(syncMinYear ?? base.getFullYear() - 20);
      setMode("month");
      const t = dateToTimeParts(base);
      setTimePeriod(t.period);
      setTimeHour12(t.hour12);
      setTimeMinute(showMinute ? t.minute : 0);
    }
  }, [value, open, minDate, showMinute]);

  const label = useMemo(
    () => `${view.getMonth() + 1}월 ${view.getFullYear()}`,
    [view]
  );

  const effectiveMinuteVal = showMinute ? timeMinute : 0;
  const applyDate = useCallback(
    (y: number, m: number, d: number) => {
      const { h, m: min } = timePartsToHoursMinutes(
        timePeriod,
        timeHour12,
        effectiveMinuteVal
      );
      onChange(new Date(y, m, d, h, min));
    },
    [timePeriod, timeHour12, effectiveMinuteVal, onChange]
  );

  const applyTime = useCallback(
    (p: Period, h12: number, min: number) => {
      const base = value ? new Date(value) : new Date();
      const m = showMinute ? min : 0;
      const { h, m: minFinal } = timePartsToHoursMinutes(p, h12, m);
      onChange(
        new Date(
          base.getFullYear(),
          base.getMonth(),
          base.getDate(),
          h,
          minFinal
        )
      );
    },
    [value, showMinute, onChange]
  );

  function openPicker() {
    if (disabled) return;
    setOpen(true);
    setMode("month");
    const base = value ? new Date(value) : new Date();
    setView(new Date(base.getFullYear(), base.getMonth(), 1));
    setYearStart(minDate ? minDate.getFullYear() : base.getFullYear() - 20);
    const t = dateToTimeParts(base);
    setTimePeriod(t.period);
    setTimeHour12(t.hour12);
    setTimeMinute(showMinute ? t.minute : 0);
  }

  function goPrev() {
    if (mode === "month")
      setView((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1));
  }
  function goNext() {
    if (mode === "month")
      setView((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1));
  }

  function onSelectDay(d: Date) {
    applyDate(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function onSelectYear(y: number) {
    setView((v) => new Date(y, v.getMonth(), 1));
    setMode("month");
  }

  const monthCells = useMemo(() => generateMonthCells(view), [view]);

  const displayValue = value
    ? format(value, dateFormat, { locale: ko })
    : "";

  return (
    <div ref={rootRef} className="relative w-full">
      <input
        ref={inputRef}
        readOnly
        disabled={disabled}
        onClick={openPicker}
        onFocus={openPicker}
        value={displayValue}
        placeholder={placeholder}
        className={`min-h-[48px] h-[48px] w-full cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-primary disabled:opacity-50 ${className}`}
      />

      {open &&
        panelPos &&
        createPortal(
          <div
            ref={panelRef}
            className={`z-[1000] flex w-max max-w-[95vw] rounded-xl border border-zinc-100 bg-white p-4 shadow-[0px_18px_28px_rgba(9,30,66,0.10)] ${showMinute ? "min-w-[520px]" : "min-w-[440px]"}`}
            style={{
              position: "fixed",
              top: panelPos.top,
              left: panelPos.left,
            }}
          >
            {/* 왼쪽: 날짜 (고정 너비로 시간 영역 공간 확보) */}
            <div className="w-[256px] shrink-0 pr-4">
            {/* 날짜 헤더 */}
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                onClick={() => {
                  if (mode === "month") {
                    setMode("year");
                    setYearStart(
                      minDate ? minDate.getFullYear() : view.getFullYear() - 20
                    );
                  } else setMode("month");
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
                  className={`text-footer-text ${mode === "year" ? "rotate-180" : ""}`}
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
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="text-icon-muted">
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
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="text-icon-muted">
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

            {/* 캘린더 */}
            {mode === "month" ? (
              <div className="mb-4">
                <div className="mb-1 grid grid-cols-7 gap-y-1">
                  {DAYS.map((d) => (
                    <div
                      key={d}
                      className="flex h-7 w-8 items-center justify-center text-xs text-zinc-500"
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
                    return (
                      <button
                        key={date.toISOString() + String(inCurrent)}
                        type="button"
                        className={`flex h-7 w-8 items-center justify-center rounded-full text-sm ${
                          inCurrent ? "text-zinc-800" : "text-zinc-400"
                        } ${
                          isDisabled
                            ? "cursor-not-allowed opacity-30"
                            : isSelected
                              ? "bg-primary/15 font-medium text-primary"
                              : "hover:bg-zinc-100 cursor-pointer"
                        }`}
                        onClick={() =>
                          !isDisabled && onSelectDay(date)
                        }
                        disabled={isDisabled || undefined}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mb-4 max-h-[200px] overflow-y-auto">
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
            </div>

            {/* 오른쪽: 시간 선택 (컬럼별 최소 너비로 잘림 방지) */}
            <div className="flex min-w-[168px] shrink-0 flex-col border-l border-zinc-100 pl-4">
              <div className="mb-2 flex justify-between gap-3 px-0 text-xs text-zinc-500">
                <span className="w-12 text-center">오전/오후</span>
                <span className="w-8 text-center">시</span>
                {showMinute && <span className="w-8 text-center">분</span>}
              </div>
              <div className={`grid gap-3 ${showMinute ? "grid-cols-3" : "grid-cols-2"}`}>
                <div className="min-w-[48px] max-h-[200px] overflow-y-auto overflow-x-visible">
                  {(["오전", "오후"] as Period[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`h-8 w-full min-w-[48px] rounded-lg text-sm cursor-pointer ${
                        p === timePeriod
                          ? "bg-primary text-white"
                          : "text-zinc-800 hover:bg-zinc-100"
                      }`}
                      onClick={() => {
                        setTimePeriod(p);
                        applyTime(p, timeHour12, showMinute ? timeMinute : 0);
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="min-w-[48px] max-h-[200px] overflow-y-auto overflow-x-visible">
                  {hours.map((h) => (
                    <button
                      key={h}
                      type="button"
                      className={`flex h-8 w-full min-w-[48px] items-center justify-center rounded-lg text-sm cursor-pointer ${
                        h === timeHour12
                          ? "bg-primary text-white"
                          : "text-zinc-800 hover:bg-zinc-100"
                      }`}
                      onClick={() => {
                        setTimeHour12(h);
                        applyTime(timePeriod, h, showMinute ? timeMinute : 0);
                      }}
                    >
                      {String(h).padStart(2, "0")}
                    </button>
                  ))}
                </div>
                {showMinute && (
                  <div className="min-w-[48px] max-h-[200px] overflow-y-auto overflow-x-visible">
                    {minutes.map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`flex h-8 w-full min-w-[48px] items-center justify-center rounded-lg text-sm cursor-pointer ${
                          m === timeMinute
                            ? "bg-primary text-white"
                            : "text-zinc-800 hover:bg-zinc-100"
                        }`}
                        onClick={() => {
                          setTimeMinute(m);
                          applyTime(timePeriod, timeHour12, m);
                        }}
                      >
                        {String(m).padStart(2, "0")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
