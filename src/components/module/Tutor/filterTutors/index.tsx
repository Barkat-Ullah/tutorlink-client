"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Filter, BookOpen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TutorFiltersProps {
  subjects: { _id: string; name: string }[];
  currentSubject: string;
  onFilterChange: (value: string) => void;
}

const TutorFilters = ({
  subjects,
  currentSubject,
  onFilterChange,
}: TutorFiltersProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Handle filter change correctly
  const handleFilterChange = (value: string) => {
    onFilterChange(value === "all" ? "" : value);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium mb-3">Filter by Subject</h3>

        {/* Mobile view: Dropdown select */}
        <div className="lg:hidden">
          <Select value={currentSubject } onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject._id} value={subject._id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop view: Button list */}
        <div className="hidden lg:block space-y-2">
          <Button
            variant={currentSubject === "" ? "default" : "outline"}
            size="sm"
            className="w-full justify-start text-left h-auto py-2"
            onClick={() => handleFilterChange("all")}
          >
            All Subjects
            {currentSubject === "" && <CheckCircle className="ml-auto h-4 w-4" />}
          </Button>

          {subjects.map((subject) => (
            <Button
              key={subject._id}
              variant={currentSubject === subject._id ? "default" : "outline"}
              size="sm"
              className="w-full justify-start text-left h-auto py-2"
              onClick={() => handleFilterChange(subject._id)}
            >
              {subject.name}
              {currentSubject === subject._id && <CheckCircle className="ml-auto h-4 w-4" />}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <Filter className="h-4 w-4" />
          Subject Filter {mobileFiltersOpen ? "Hide" : "Show"}
        </Button>
      </div>

      {/* Mobile filters */}
      {mobileFiltersOpen && (
        <Card className="lg:hidden mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Filter by Subject
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FiltersContent />
          </CardContent>
        </Card>
      )}

      {/* Desktop filters */}
      <Card className="hidden lg:block sticky top-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Filter by Subject
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FiltersContent />
        </CardContent>
      </Card>
    </>
  );
};

export default TutorFilters;
