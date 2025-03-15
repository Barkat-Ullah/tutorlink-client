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

// You can remove the SearchParams if you're not using it
const BrowseTutors = async () => {
  // Static values for pagination, or use defaults if needed
  const page = "1"; // Default to page 1 if not using searchParams
  const limit = "4"; // Default to limit 4 tutors per page

  try {
    // Fetch tutors and subjects asynchronously without needing searchParams
    const tutors = await getAllTutor(page, limit);
    const subjectsResponse = await getAllSubject();
    const subjects = subjectsResponse || [];

    // Return the UI component with the data
    return (
      <div>
        <AllTutorsPage tutors={tutors} subjects={subjects} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading tutors or subjects</div>;
  }
};

export default BrowseTutors;
