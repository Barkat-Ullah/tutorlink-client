import CreateTutor from "@/components/module/BecomeATutor/CreateTutor";
import {
  getAllDistrict,
  getAllDivision,
  getAllSubject,
} from "@/services/TutorServices";

export interface Division {
  _id: string;
  name: string;
}

export interface District {
  _id: string;
  name: string;
  
}

export interface Subject {
  _id: string;
  name: string;
  gradeLevels: string[];
}

const BecomeATutorPage = async () => {
  const districts: District[] = (await getAllDistrict()) || [];
  const divisions: Division[] = (await getAllDivision()) || [];
  const subjects: Subject[] = (await getAllSubject()) || [];

  return (
    <div>
      <CreateTutor
      districts={districts}
      divisions={divisions}
      subjects={subjects}
      />
    </div>
  );
};

export default BecomeATutorPage;
