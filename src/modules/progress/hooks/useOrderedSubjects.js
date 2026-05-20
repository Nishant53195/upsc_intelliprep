import { useLiveQuery }
from "dexie-react-hooks";

import { db }
from "../../../db/dexie";

function useOrderedSubjects(
  activePaper
) {
  return useLiveQuery(
    async () => {
      const onboarding =
        await db
          .onboarding_config
          .toCollection()
          .first();

      const allSubjects =
        await db.subjects.toArray();

      if (!onboarding)
        return [];

      // OPTIONAL
      if (
        activePaper ===
        "OPTIONAL"
      ) {
        const sequenceIds =
          (
            onboarding.optionalSequence ||
            []
          ).map(
            (subject) =>
              subject.id
          );

        return allSubjects
          .filter(
            (subject) =>
              subject.type ===
              "OPTIONAL"
          )
          .sort((a, b) => {
            return (
              sequenceIds.indexOf(
                a.id
              ) -
              sequenceIds.indexOf(
                b.id
              )
            );
          });
      }

      // GS
      const sequenceIds =
        (
          onboarding.gsSequence ||
          []
        ).map(
          (subject) =>
            subject.id
        );

      return allSubjects
        .filter(
          (subject) =>
            subject.paper ===
              activePaper &&
            subject.type === "GS"
        )
        .sort((a, b) => {
          const aIndex =
            sequenceIds.indexOf(
              a.id
            );

          const bIndex =
            sequenceIds.indexOf(
              b.id
            );

          // non-selected subjects go below
          if (aIndex === -1)
            return 1;

          if (bIndex === -1)
            return -1;

          return (
            aIndex - bIndex
          );
        });
    },

    [activePaper]
  );
}

export default
  useOrderedSubjects;