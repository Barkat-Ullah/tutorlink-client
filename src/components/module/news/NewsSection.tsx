"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// Define the type for the data (news articles)
interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

interface NewsSectionProps {
  data: {
    articles: Article[];
  };
}

const NewsSection: React.FC<NewsSectionProps> = ({ data }) => {
  const articlesPerPage = 6; // Set the number of articles per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(data?.articles?.length / articlesPerPage);

  // Slice the articles for the current page
  const startIndex = (currentPage - 1) * articlesPerPage;
  const selectedArticles = data?.articles?.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">News & Blogs</h2>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {selectedArticles?.map((article, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={article?.urlToImage || "https://i.ibb.co/dKHwTp8/PS.png"}
              alt={article?.title || "News Image"}
              width={400}
              height={250}
              className="object-cover rounded-lg"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{article?.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {article?.description}
              </p>
              <Link
                href={article?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          Pre
        </button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsSection;
