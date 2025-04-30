import * as Yup from "yup";

// Validation Schema
export const validationSchema = Yup.object({
  league: Yup.object({
    name: Yup.string().required("League name is required"),
    logo: Yup.mixed().required("League logo is required"),
  }),
  homeTeam: Yup.object({
    name: Yup.string().required("Home team name is required"),
    logo: Yup.mixed().required("Home team logo is required"),
  }),
  awayTeam: Yup.object({
    name: Yup.string().required("Away team name is required"),
    logo: Yup.mixed().required("Away team logo is required"),
  }),
  round: Yup.string().required("Round information is required"),
  dateTime: Yup.date().required("Match date and time is required"),
  location: Yup.string().required("Match location is required"),
});
