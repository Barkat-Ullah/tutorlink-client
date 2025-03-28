// import { getAllTutor, getAllSubject } from "@/services/TutorServices";
// import AllTutorsPage from "@/components/module/Tutor";

// type SearchParams = { [key: string]: string | string[] | undefined };

// const BrowseTutors = async ({
//   searchParams,
// }: {
//   searchParams: SearchParams;
// }) => {
//   const page = typeof searchParams.page === "string" ? searchParams.page : "1";
//   const limit =
//     typeof searchParams.limit === "string" ? searchParams.limit : "4";

//   const tutors = await getAllTutor(page, limit, searchParams);
//   const subjectsResponse = await getAllSubject();
//   const subjects = subjectsResponse || [];

//   return (
//     <div>
//       <AllTutorsPage tutors={tutors} subjects={subjects} />
//     </div>
//   );
// };

// export default BrowseTutors;

import { getAllTutor, getAllSubject } from "@/services/TutorServices";
import AllTutorsPage from "@/components/module/Tutor";

const BrowseTutors = async () => {
  const page = "1";
  const limit = "4";

  const tutors = await getAllTutor(page, limit);
  const subjectsResponse = await getAllSubject();
  const subjects = subjectsResponse || [];

  // Return the UI component with the data
  return (
    <div>
      <AllTutorsPage tutors={tutors} subjects={subjects} />
    </div>
  );
};

export default BrowseTutors;
