import { nanoid } from "nanoid";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import gsSubjects from "../constants/gsSubjects";

import optionalSubjects from "../constants/optionalSubjects";

import useOnboardingStore from "../stores/onboardingStore";

import useAuthStore from "../stores/authStore";

import GSSequenceList from "../modules/onboarding/components/GSSequenceList";

import { arrayMove } from "../modules/onboarding/utils/arrayMove";

import optionalSyllabus from "../modules/syllabus/data/optionalSyllabus";

import { initializeSyllabus } from "../services/syllabus/initializeSyllabus";

import { initializeSchedule } from "../services/scheduler/initializeSchedule";

import {
  saveOnboarding,
} from "../db/repositories/onboardingRepository";

function OnboardingPage() {

    useEffect(() => {
  if (!gsSequence.length) {
    setGsSequence([
      ...gsSubjects,
    ]);
  }
}, []);

  const navigate = useNavigate();

  const user =
    useAuthStore((state) => state.user);

  const {
    targetYear,
    optionalSubject,
    gsSequence,
    setTargetYear,
    setOptionalSubject,
    optionalSequence,
setOptionalSequence,
    setGsSequence,
    setCompleted,
  } = useOnboardingStore();

  function moveUp(index) {
  const movableSubjects =
    gsSequence.filter(
      (subject) =>
        !subject.lockedAfterPrelims
    );

  if (index === 0)
    return;

  const updatedMovable =
    arrayMove(
      movableSubjects,
      index,
      index - 1
    );

  const lockedSubjects =
    gsSequence.filter(
      (subject) =>
        subject.lockedAfterPrelims
    );

  setGsSequence([
    ...updatedMovable,
    ...lockedSubjects,
  ]);
}

function moveDown(index) {
  const movableSubjects =
    gsSequence.filter(
      (subject) =>
        !subject.lockedAfterPrelims
    );

  if (
    index >=
    movableSubjects.length - 1
  )
    return;

  const updatedMovable =
    arrayMove(
      movableSubjects,
      index,
      index + 1
    );

  const lockedSubjects =
    gsSequence.filter(
      (subject) =>
        subject.lockedAfterPrelims
    );

  setGsSequence([
    ...updatedMovable,
    ...lockedSubjects,
  ]);
}

    function moveOptionalUp(
  index
) {
  const movable =
    optionalSequence.filter(
      (chapter) =>
        !chapter.afterPrelims
    );

  if (index === 0)
    return;

  const updatedMovable =
    arrayMove(
      movable,
      index,
      index - 1
    );

  const locked =
    optionalSequence.filter(
      (chapter) =>
        chapter.afterPrelims
    );

  setOptionalSequence([
    ...updatedMovable,
    ...locked,
  ]);
}

function moveOptionalDown(
  index
) {
  const movable =
    optionalSequence.filter(
      (chapter) =>
        !chapter.afterPrelims
    );

  if (
    index >=
    movable.length - 1
  )
    return;

  const updatedMovable =
    arrayMove(
      movable,
      index,
      index + 1
    );

  const locked =
    optionalSequence.filter(
      (chapter) =>
        chapter.afterPrelims
    );

  setOptionalSequence([
    ...updatedMovable,
    ...locked,
  ]);
}

function toggleOptionalAfterPrelims(
  chapterId
) {
  const updated =
    optionalSequence.map(
      (chapter) => {
        if (
          chapter.id !== chapterId
        ) {
          return chapter;
        }

        return {
          ...chapter,

          afterPrelims:
            !chapter.afterPrelims,
        };
      }
    );

  const active =
    updated.filter(
      (chapter) =>
        !chapter.afterPrelims
    );

  const locked =
    updated.filter(
      (chapter) =>
        chapter.afterPrelims
    );

  setOptionalSequence([
    ...active,
    ...locked,
  ]);
}

    function initializeOptional() {
  if (!optionalSubject)
    return;

  const selectedOptional =
    optionalSyllabus.filter(
      (subject) =>
        subject.id.includes(
          optionalSubject
        )
    );

  const allTopics =
    selectedOptional.flatMap(
      (paper) =>
        paper.topics.map(
          (topic) => ({
            id: topic.id,

            name: topic.name,

            afterPrelims: false,
          })
        )
    );

  setOptionalSequence(
    allTopics
  );
}

  async function handleComplete() {
  try {
    const payload = {
      id: nanoid(),

      userId: user.uid,

      targetYear,

      optionalSubject,

      gsSequence,

      optionalSequence,

      completed: true,

      createdAt:
        new Date().toISOString(),
    };

    await saveOnboarding(
      payload
    );

    const syllabusData =
  await initializeSyllabus();

await initializeSchedule(
  syllabusData.subtopics,
  user.uid
);

    setCompleted(true);

    navigate("/dashboard");
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">
          Setup Your Preparation
        </h1>

        <div className="mt-10">
          <label className="text-sm text-slate-400">
            Target Year
          </label>

          <select
            value={targetYear}
            onChange={(e) =>
              setTargetYear(
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl bg-slate-800 p-4"
          >
            <option value="">
              Select Year
            </option>

            <option value="2027">
              2027
            </option>

            <option value="2028">
              2028
            </option>
          </select>
        </div>

        <div className="mt-8">
          <label className="text-sm text-slate-400">
            Optional Subject
          </label>

          <select
            value={optionalSubject}
            onChange={(e) =>
              setOptionalSubject(
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl bg-slate-800 p-4"
          >
            <option value="">
              Select Optional
            </option>

            {optionalSubjects.map(
              (subject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.name}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">
            GS Subject Sequence
          </h2>

          <div className="mt-4">
            <GSSequenceList
  subjects={
    gsSequence.length
      ? gsSequence
      : gsSubjects
  }
  moveUp={moveUp}
  moveDown={moveDown}
/>
          </div>
        </div>

        <button
          onClick={() =>
            setGsSequence([
  ...gsSubjects,
])
          }
          className="mt-6 rounded-xl bg-slate-700 px-5 py-3"
        >
          Initialize Sequence
        </button>

        <button
          onClick={handleComplete}
          className="mt-6 ml-4 rounded-xl bg-blue-600 px-6 py-3"
        >
          Complete Onboarding
        </button>
      </div>
      <div className="mt-12">
  <h2 className="text-xl font-semibold">
    Optional Sequence
  </h2>

  <div className="mt-12">
  <h2 className="text-xl font-semibold">
    Optional Sequence
  </h2>

  <div className="mt-4 space-y-3">
    {optionalSequence
      .filter(
        (chapter) =>
          !chapter.afterPrelims
      )
      .map(
        (chapter, index) => (
          <div
            key={chapter.id}
            className="space-y-2"
          >
            <div className="rounded-xl bg-slate-800 p-4">
              <div className="flex items-center justify-between">
                <span>
                  {chapter.name}
                </span>

                <button
                  onClick={() =>
                    toggleOptionalAfterPrelims(
                      chapter.id
                    )
                  }
                  className="rounded-lg bg-amber-500/20 px-3 py-2 text-xs text-amber-300"
                >
                  Push After Prelims
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  moveOptionalUp(
                    index
                  )
                }
                className="rounded-lg bg-slate-700 px-3 py-2 text-sm"
              >
                ↑
              </button>

              <button
                onClick={() =>
                  moveOptionalDown(
                    index
                  )
                }
                className="rounded-lg bg-slate-700 px-3 py-2 text-sm"
              >
                ↓
              </button>
            </div>
          </div>
        )
      )}
  </div>

  <div className="mt-10">
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-300">
      After Prelims
    </h3>

    <div className="space-y-3">
      {optionalSequence
        .filter(
          (chapter) =>
            chapter.afterPrelims
        )
        .map((chapter) => (
          <div
            key={chapter.id}
            className="rounded-xl bg-slate-800 p-4"
          >
            <div className="flex items-center justify-between">
              <span>
                {chapter.name}
              </span>

              <button
                onClick={() =>
                  toggleOptionalAfterPrelims(
                    chapter.id
                  )
                }
                className="rounded-lg bg-slate-700 px-3 py-2 text-xs"
              >
                Restore
              </button>
            </div>
          </div>
        ))}
    </div>
  </div>

  <button
    onClick={
      initializeOptional
    }
    className="mt-5 rounded-xl bg-slate-700 px-5 py-3"
  >
    Initialize Optional
  </button>
</div>
  </div>

  <button
    onClick={
      initializeOptional
    }
    className="mt-5 rounded-xl bg-slate-700 px-5 py-3"
  >
    Initialize Optional
  </button>
</div>
    
  );
}

export default OnboardingPage;