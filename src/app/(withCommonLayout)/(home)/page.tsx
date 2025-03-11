import Banner from "@/components/module/Banner/Banner";
import Cta from "@/components/module/Cta/Cta";
import Feature from "@/components/module/Feature/Feature";
import FeaturedTutor from "@/components/module/FeaturedTutors/FeaturedTutor";
import Testimonials from "@/components/module/Testimonials/Testimonials";
import Work from "@/components/module/work/Work";
import NMContainer from "@/components/ui/core/NMContainer";
import { getTutor } from "@/services/TutorServices";


const HomePage = async() => {
  const tutors = await getTutor()
  return (
    <NMContainer>
      <Banner />
      <Feature />
      <Work />
      <FeaturedTutor tutors={tutors}/>
      <Cta />
      <Testimonials />
    </NMContainer>
  );
};

export default HomePage;
