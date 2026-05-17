const gsSyllabus = [
  {
    id: "history",
    type: "GS",
    paper: "GS1",
    name: "History",

    topics: [
      {
        id: "ancient-history",
        name: "Ancient History",

        subtopics: [
          {
            id: "indus-valley-civilization",
            name: "Indus Valley Civilization",
            estimatedMinutes: 180,
            difficulty: 2,
          },

          {
            id: "vedic-period",
            name: "Vedic Period",
            estimatedMinutes: 120,
            difficulty: 2,
          },
        ],
      },

      {
        id: "medieval-history",
        name: "Medieval History",

        subtopics: [
          {
            id: "delhi-sultanate",
            name: "Delhi Sultanate",
            estimatedMinutes: 160,
            difficulty: 3,
          },

          {
            id: "mughal-empire",
            name: "Mughal Empire",
            estimatedMinutes: 220,
            difficulty: 3,
          },
        ],
      },
    ],
  },

  {
    id: "polity",
    type: "GS",
    paper: "GS2",
    name: "Polity",

    topics: [
      {
        id: "constitution",
        name: "Constitution",

        subtopics: [
          {
            id: "historical-background",
            name: "Historical Background",
            estimatedMinutes: 90,
            difficulty: 1,
          },

          {
            id: "making-of-constitution",
            name: "Making of Constitution",
            estimatedMinutes: 120,
            difficulty: 2,
          },
        ],
      },
    ],
  },
];

export default gsSyllabus;