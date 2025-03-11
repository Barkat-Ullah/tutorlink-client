export interface TutorData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  division: string;
  district: string;
  area: string;
  subjects: string[];
  monthlyRate: number;
  experience: number;
  education: string;
  availability: { day: string; timeSlots: string[] }[];
  logo: string; 
}


export type TutorDatas = {
  result: Tutor[];
  meta: {
    total: number;
    totalPage: number;
    page: number;
    limit: number;
  };
};

export type Tutor = {
  _id: string;
  user: {
    _id: string;
    name: string;
    profileImg: string;
  };
  subjects: Subject[];
  division: {
    _id: string;
    name: string;
  };
  district: {
    _id: string;
    name: string;
  };
  qualification: string;
  experience: number;
  rating: number;
  monthlyRate: number;
  availability: string;
  createdAt: string;
  updatedAt: string;
  logo:string;
  email:string
};

type Subject = {
  _id: string;
  name: string;
};


