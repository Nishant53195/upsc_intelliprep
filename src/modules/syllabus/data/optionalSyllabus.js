const optionalSyllabus = [
  {
    id: "sociology",
    type: "OPTIONAL",
    paper: "PAPER_1",
    name: "Sociology Paper 1",

    topics: [
      {
        id: "sociology-the-discipline",
        name: "Sociology - The Discipline",

        subtopics: [
          {
            id: "modernity-and-social-changes",
            name: "Modernity and Social Changes",
            estimatedMinutes: 180,
            difficulty: 2,
          },

          {
            id: "sociology-and-common-sense",
            name: "Sociology and Common Sense",
            estimatedMinutes: 120,
            difficulty: 1,
          },
        ],
      },
    ],
  },

  {
    id: "sociology-paper-2",
    type: "OPTIONAL",
    paper: "PAPER_2",
    name: "Sociology Paper 2",

    topics: [
      {
        id: "introducing-indian-society",
        name: "Introducing Indian Society",

        subtopics: [
          {
            id: "perspectives-on-indian-society",
            name: "Perspectives on Indian Society",
            estimatedMinutes: 150,
            difficulty: 2,
          },
        ],
      },
    ],
  },
];

export default optionalSyllabus;