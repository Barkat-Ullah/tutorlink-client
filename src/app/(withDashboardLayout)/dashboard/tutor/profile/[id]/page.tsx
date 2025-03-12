import TutorProfileUpdate from "@/components/module/dashboard/RoleBased/Tutor/TutorProfileUpdate";
import { getSingleTutor } from "@/services/TutorServices";
type Params = Promise<{ id: string }>;
const EditTutorProfilePage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const { data: tutorData } = await getSingleTutor(id);

  return (
    <div>
      <TutorProfileUpdate
        tutorData={tutorData}
        // districts={districts}
        // divisions={divisions}
        // subjects={subjects}
      />
    </div>
  );
};

export default EditTutorProfilePage;
