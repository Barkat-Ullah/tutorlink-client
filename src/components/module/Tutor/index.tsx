"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { TutorDatas } from "@/types/tutor.type";
import TutorCard from "./TutorCard";
import TutorSearchBar from "./TutorCard/TutionSearchBar";
import TutorFilters from "./filterTutors";
import TutorPagination from "./TutorCard/TutorPagination";
import { getAllTutor } from "@/services/TutorServices";

interface AllTutorsPageProps {
  tutors: TutorDatas;
  subjects: any[];
}

const AllTutorsPage = ({
  tutors: initialTutors,
  subjects,
}: AllTutorsPageProps) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [tutors, setTutors] = useState<TutorDatas>(initialTutors);
  const [isLoading, setIsLoading] = useState(false);

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 10;

  // Function to build query object from searchParams
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buildQueryObject = () => {
    const query: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      if (key !== "page" && key !== "limit") {
        query[key] = value;
      }
    });
    return query;
  };

  // Fetch tutors and subjects when searchParams, currentPage, or currentLimit change
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const query = buildQueryObject();
        const data = await getAllTutor(
          currentPage.toString(),
          currentLimit.toString(),
          query
        );
       
        setTutors(data);
       
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, [searchParams, currentPage, currentLimit, buildQueryObject]);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page: page.toString() });
  };

  // const handleSearch = (searchTerm: string) => {
  //   updateSearchParams({
  //     searchTerm: searchTerm || null,
  //     page: "1",
  //   });
  // };

  const handleFilterChange = (filterName: string, value: string) => {
    updateSearchParams({
      [filterName]: value || null,
      page: "1",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Find Your Perfect Tutor
      </h1>

      <div className="mb-6">
        <TutorSearchBar
          // initialValue={searchParams.get("searchTerm") || ""}
          // onSearch={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <TutorFilters
            subjects={subjects}
            currentSubject={searchParams.get("subjects") || ""}
            onFilterChange={(value) => handleFilterChange("subjects", value)}
          />
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Loading tutors...</p>
            </div>
          ) : tutors?.result && tutors?.result?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6">
                {tutors?.result?.map((tutor) => (
                  <TutorCard key={tutor._id} tutor={tutor} />
                ))}
              </div>

              <div className="mt-8">
                <TutorPagination
                  currentPage={currentPage}
                  totalPages={tutors.meta?.totalPage || 1}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
              <p className="text-xl text-muted-foreground">No tutors found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTutorsPage;
