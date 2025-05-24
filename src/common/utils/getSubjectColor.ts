import { subjectsColors } from '../constants';

const getSubjectColor = (subject: string) =>
  subjectsColors[subject as keyof typeof subjectsColors];

export default getSubjectColor;
