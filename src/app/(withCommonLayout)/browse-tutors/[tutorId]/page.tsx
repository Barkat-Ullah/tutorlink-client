import TutorDetail from "@/components/module/Tutor/TutorDetails";
import { getSingleTutor } from "@/services/TutorServices";
type Params = Promise<{ tutorId: string }>;
const TutorDetailsPage = async ({ params }: { params: Params }) => {
  const { tutorId } = await params;
  const { data: tutor } = await getSingleTutor(tutorId);

  return (
    <div>
      <TutorDetail tutor={tutor} />
    </div>
  );
};

export default TutorDetailsPage;
