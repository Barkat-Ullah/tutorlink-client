export type Subject = {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  gradeLevel?: string[];
};

export type Location = {
  _id: string;
  name: string;
};

export type AvailabilitySlot = {
  day: string;
  timeSlots: string[];
};

export type Tutor = {
  _id: string;
  user: {
    _id: string;
    name: string;
    profileImg?: string;
  };
  name:string;
  education:string;
  email: string;
  bio?: string;
  phone?: string;
  subjects: Subject[];
  division: Location;
  district: Location;
  qualification: string;
  experience: number;
  rating: number;
  totalReviews?: number;
  monthlyRate: number;
  availability: AvailabilitySlot[];
  createdAt: string;
  updatedAt: string;
  logo?: string;
  area?: string;
};

export type TutorDatas = {
  result: Tutor[];
  meta: {
    total: number;
    totalPage: number;
    page: number;
    limit: number;
  };
};
