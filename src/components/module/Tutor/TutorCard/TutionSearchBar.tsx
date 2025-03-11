"use client";

import type React from "react";

// import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// interface TutorSearchBarProps {
//   initialValue: string;
//   onSearch: (searchTerm: string) => void;
// }

const TutorSearchBar = () => {
  // const TutorSearchBar = ({ initialValue, onSearch }: TutorSearchBarProps) => {
  // const [searchTerm, setSearchTerm] = useState(initialValue);

  // useEffect(() => {
  //   setSearchTerm(initialValue);
  // }, [initialValue]);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSearch(searchTerm);
  // };

  return (
    <form className="relative">
      <div className="flex w-full max-w-3xl mx-auto items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name, subject, or location..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-6 text-base rounded-l-lg border-r-0"
          />
        </div>
        <Button type="submit" className="px-8 py-6 h-auto rounded-r-lg">
          Search
        </Button>
      </div>
    </form>
  );
};

export default TutorSearchBar;
