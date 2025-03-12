import TutorProfile from "@/components/module/dashboard/RoleBased/Tutor/TutorProfile";
import { getTutorProfileInfo } from "@/services/TutorServices";

const TutorProfilePage = async () => {
    const tutor = await getTutorProfileInfo();
  
  return (
    <div>
      <TutorProfile tutorData={tutor}/>
    </div>
  );
};

export default TutorProfilePage;
