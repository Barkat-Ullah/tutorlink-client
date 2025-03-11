import StudentProfileView from '@/components/module/student/StudentProfileView';
import { getProfileInfo } from '@/services/StudentServices';
import React from 'react';

const StudentProfile = async() => {
    const profile = await getProfileInfo()
    return (
        <div>
            <StudentProfileView profile={profile}/>
        </div>
    );
};

export default StudentProfile;