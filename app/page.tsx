"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpDown,
  Dumbbell,
  Search,
  LoaderCircle,
} from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "@/lib/workouts";
import { Workout } from "@/context/PlanContext";
export default function Home() {
  const [items, setItems] = useState<Workout[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [sort, setSort] = useState("duration"),
    [query, setQuery] = useState("");
  useEffect(() => {
    getWorkouts()
      .then(setItems)
      .catch(() =>
        setError(
          "We couldn't fetch the workout library. Check your connection and try again.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  const filtered = useMemo(
    () =>
      items
        .filter((w) =>
          `${w.name} ${w.category} ${w.equipment}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .sort((a, b) => Number(a[sort] || 0) - Number(b[sort] || 0)),
    [items, sort, query],
  );
  return (
    <>
      <section className="relative overflow-hidden border-b border-[#242925]">
        <div className="wrap grid min-h-[590px] items-center gap-10 py-16 md:grid-cols-2 md:py-20">
          <div className="relative z-10">
            <p className="eyebrow mb-6">WORKOUT LIBRARY / EST. 2026</p>
            <h1 className="display max-w-[650px] text-5xl font-bold leading-[1.04] sm:text-6xl lg:text-7xl">
              TRAIN WITH INTENT.
              <br />
              <span className="text-acid">LOG EVERY SET.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-gray-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>
            <a href="#library" className="btn btn-primary mt-8">
              <Dumbbell size={16} /> BROWSE WORKOUTS <ArrowDown size={15} />
            </a>
            <div className="mt-12 flex gap-8 border-t border-[#303530] pt-5">
              <div>
                <p className="display text-3xl">
                  12<span className="text-acid">+</span>
                </p>
                <p className="eyebrow mt-1 text-gray-500">MOVEMENTS</p>
              </div>
              <div>
                <p className="display text-3xl">05</p>
                <p className="eyebrow mt-1 text-gray-500">DAILY PLAN CAP</p>
              </div>
              <div>
                <p className="display text-3xl">01</p>
                <p className="eyebrow mt-1 text-gray-500">GOAL: PROGRESS</p>
              </div>
            </div>
          </div>
          <div className="relative min-h-[330px] md:min-h-[450px]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#ccff0022,transparent_60%)]" />
            <img
              className="absolute inset-0 h-full w-full object-cover opacity-80"
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85"
              alt="Dark gym interior"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090b0a] via-transparent to-transparent md:bg-gradient-to-r" />
            <div className="absolute bottom-5 left-5 border-l-2 border-acid bg-black/60 px-4 py-3">
              <p className="eyebrow">NO SHORTCUTS</p>
              <p className="display text-xl">SHOW UP. PUT IN WORK.</p>
            </div>
            <div className="absolute right-4 top-4 border border-white/20 bg-black/60 p-4">
              <Dumbbell className="text-acid" size={26} />
            </div>
          </div>
        </div>
      </section>
      <section id="library" className="wrap scroll-mt-24 py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-3">PICK YOUR MOVEMENT</p>
            <h2 className="display text-4xl font-bold sm:text-5xl">
              THE <span className="text-acid">LIBRARY</span>
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-500"
                size={16}
              />
              <input
                className="input pl-10"
                placeholder="Search workouts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <label className="flex items-center gap-2 rounded border border-[#303630] px-3">
              <ArrowUpDown size={15} className="text-acid" />
              <span className="text-xs text-gray-400">Sort</span>
              <select
                className="bg-transparent py-3 text-xs outline-none"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option className="bg-ink" value="duration">
                  Duration
                </option>
                <option className="bg-ink" value="calories">
                  Calories
                </option>
                <option className="bg-ink" value="rating">
                  Rating
                </option>
              </select>
            </label>
          </div>
        </div>
        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-acid">
            <LoaderCircle className="animate-spin" size={22} />{" "}
            <span className="eyebrow">LOADING WORKOUTS...</span>
          </div>
        ) : error ? (
          <div className="panel mt-8 rounded p-8 text-center">
            <p>{error}</p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => location.reload()}
            >
              Try again
            </button>
          </div>
        ) : filtered.length ? (
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-gray-500">
            No workouts match your search.
          </p>
        )}
      </section>
    </>
  );
}
