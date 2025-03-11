import TutorDetail from "@/components/module/Tutor/TutorDetails";
import { getSingleTutor } from "@/services/TutorServices";

const TutorDetailsPage = async ({
  params,
}: {
  params: Promise<{ tutorId: string }>;
}) => {
  const { tutorId } = await params;
  const { data: tutor } = await getSingleTutor(tutorId);
  return (
    <div>
      <TutorDetail tutor={tutor} />
    </div>
  );
};

export default TutorDetailsPage;
