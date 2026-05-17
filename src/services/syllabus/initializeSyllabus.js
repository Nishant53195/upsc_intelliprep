import gsSyllabus from "../../modules/syllabus/data/gsSyllabus";

import optionalSyllabus from "../../modules/syllabus/data/optionalSyllabus";

import { normalizeSyllabus } from "../../engines/syllabus/normalizeSyllabus";

import {
  saveSubjects,
  saveTopics,
  saveSubtopics,
  getSubjects,
} from "../../db/repositories/syllabusRepository";

export async function initializeSyllabus() {
  const allSubjects = [
    ...gsSyllabus,
    ...optionalSyllabus,
  ];

  const normalizedData =
    normalizeSyllabus(
      allSubjects
    );

  const {
    subjects,
    topics,
    subtopics,
  } = normalizedData;

  const existingSubjects =
    await getSubjects();

  if (!existingSubjects.length) {
    await saveSubjects(
      subjects
    );

    await saveTopics(topics);

    await saveSubtopics(
      subtopics
    );
  }

  return normalizedData;
}