import { Navbar } from "@/components/nav-menu/Navbar";
import { QuoteCard } from "@/components/quote-card/quote-card";
import { StatementScore } from "@/components/statement-score/statement-score";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { mockData } from "./MainApp";
import { SearchTag } from "@/components/search-tags/search-tag";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { ScrollingTags } from "@/components/scrolling-tag/scrolling-tag";
import { StatementAnalysisDrawer } from "@/components/analysis-drawer/analysis-drawer";
import { VoteButton } from "@/components/vote-button/vote-button";
// import { useQuery } from '@tanstack/react-query'

interface StatementAnalysisProps {
  onClose?: () => void;
  support: number;
  oppose: number;
}

export const ResultAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "supporting" | "opposing" | "analysis"
  >("supporting");
  const [tabLoading, setTabLoading] = useState(false);
  const support = 14;
  const oppose = 200;
  const reversedMockData = [...mockData].reverse();
  const [visibleCards, setVisibleCards] = useState(5);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleShowMore = () => {
    setVisibleCards((prevCount) => prevCount + 5);
  };

  const filteredCardData = cardData.filter((card) =>
    activeTab === "supporting"
      ? card.type === "supporting"
      : card.type === "opposing"
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  const handleTabChange = (tab: "supporting" | "opposing" | "analysis") => {
    if (tab !== activeTab) {
      setTabLoading(true);
      setActiveTab(tab);
      setTimeout(() => {
        setTabLoading(false);
      }, 1000);
    }
  };

  const StatementAnalysis = ({
    onClose,
    support,
    oppose,
  }: StatementAnalysisProps) => (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl flex mb-4">Statement analysis</h1>
        <Button
          className="bg-transparent hover:bg-transparent outline-none border-none shadow-none flex md:hidden"
          onClick={onClose}
        >
          <IoClose size={30} className="text-[#6B7280]" />
        </Button>
      </div>
      <StatementScore score={18} supportCount={support} opposeCount={oppose} />
    </>
  );

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="flex sm:pt-24 pt-40 items-center justify-center w-full px-4 sm:px-14 py-8">
        <div className="w-full">
          <div className="flex gap-[10px] lg:hidden overflow-x-auto scrollbar-hide">
            <VoteButton
              type="supporting"
              count={14}
              onClick={() => handleTabChange("supporting")}
              active={activeTab === "supporting"}
            />
            <VoteButton
              type="opposing"
              count={200}
              onClick={() => handleTabChange("opposing")}
              active={activeTab === "opposing"}
            />
            <StatementAnalysisDrawer
              support={support}
              oppose={oppose}
              type="analysis"
              count={200}
              onClick={() => handleTabChange("analysis")}
              active={activeTab === "analysis"}
            />
          </div>
          <div className="flex flex-col-reverse lg:flex-row lg:mt-5 mt-2 gap-0 sm:gap-2 ">
            <div className="w-full">
              <div className="lg:flex gap-4 hidden">
                <VoteButton
                  type="supporting"
                  count={14}
                  onClick={() => handleTabChange("supporting")}
                  active={activeTab === "supporting"}
                />
                <VoteButton
                  type="opposing"
                  count={200}
                  onClick={() => handleTabChange("opposing")}
                  active={activeTab === "opposing"}
                />
              </div>
              <div className="space-y-6 w-full">
                {tabLoading ? (
                  <SkeletonQuoteCards />
                ) : (
                  filteredCardData
                    .slice(0, visibleCards)
                    .map((card, index) => <QuoteCard key={index} {...card} />)
                )}
              </div>
              {visibleCards < filteredCardData.length && (
                <div className="flex items-center justify-center w-full mt-5">
                  <Button
                    className="rounded-full text-[#1E90FF] bg-transparent hover:bg-transparent border border-[#1E90FF] w-full"
                    onClick={handleShowMore}
                  >
                    Show more results
                    <MdKeyboardArrowDown />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-start w-full">
              <div className="hidden lg:block w-full">
                <StatementAnalysis support={14} oppose={200} />
              </div>
              <div className="lg:flex hidden flex-col">
                <div className="text-xs mt-10 text-gray-500 uppercase flex items-center space-x-1">
                  <span>Trending</span>
                  <MdOutlineArrowOutward />
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  {mockData.map((tag, index) => (
                    <SearchTag key={index} text={tag} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden flex flex-col items-center">
            <div className="text-xs mt-10 text-gray-500 uppercase flex items-center space-x-1">
              <span>Trending</span>
              <MdOutlineArrowOutward />
            </div>
            <div className="w-full flex flex-col items-center justify-center md:space-y-2 space-y-1">
              <ScrollingTags tags={mockData} direction="left" />
              <ScrollingTags tags={reversedMockData} direction="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonQuoteCards = () => (
  <>
    {[1, 2, 3].map((item) => (
      <Skeleton
        key={item}
        className="w-full mt-5 h-24 sm:h-28 md:h-[113px] rounded-lg"
      />
    ))}
  </>
);

const SkeletonLoader = () => (
  <div className="w-full">
    <Navbar />
    <div className="flex sm:pt-24 pt-40 items-center justify-center w-full px-4 sm:px-6 md:px-8 lg:px-14 py-4 sm:py-6 md:py-8">
      <div className="w-full max-w-7xl">
        <div className="flex gap-4 w-full justify-start pt-0 md:pt-20">
          <Skeleton className="w-36 sm:w-40 md:w-[166px] h-12 sm:h-14 md:h-[56px] rounded-full" />
          <Skeleton className="w-36 sm:w-40 md:w-[166px] h-12 sm:h-14 md:h-[56px] rounded-full" />
          <Skeleton className="w-28 sm:w-32 flex lg:hidden md:w-[146px] h-12 sm:h-14 md:h-[56px] rounded-full" />
        </div>
        <div className="flex flex-col-reverse lg:flex-row mt-5 gap-4 sm:gap-6 lg:gap-10">
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full lg:w-2/3">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton
                key={item}
                className="w-full h-24 sm:h-28 md:h-[113px] rounded-lg"
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full lg:w-1/3">
            <Skeleton className="w-full h-64 sm:h-80 md:h-[441px] rounded-lg hidden lg:flex" />
            <Skeleton className="w-full h-24 sm:h-28 md:h-[111px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const cardData = [
  {
    quote: "This is a quote from a source",
    summary: "This is an AI summary of the reason and context from the source.",
    source: "New York Times",
    date: "20/09/24",
    type: "supporting",
  },
  {
    quote: "This is a quote from a source",
    summary: "This is an AI summary of the reason and context from the source.",
    source: "New York Times",
    date: "20/09/24",
    type: "supporting",
  },
  {
    quote: "Another important statement",
    summary: "Context and explanation for the second quote.",
    source: "Washington Post",
    date: "20/09/24",
    type: "opposing",
  },
  {
    quote: "Another important statement",
    summary: "Context and explanation for the second quote.",
    source: "Washington Post",
    date: "20/09/24",
    type: "opposing",
  },
  {
    quote: "A third perspective on the matter",
    summary: "Additional insights from a different source.",
    source: "The Guardian",
    date: "20/09/24",
    type: "supporting",
  },
  {
    quote: "A third perspective on the matter",
    summary: "Additional insights from a different source.",
    source: "The Guardian",
    date: "20/09/24",
    type: "supporting",
  },
  {
    quote: "Expert opinion on the topic",
    summary: "Professional analysis of the situation.",
    source: "BBC News",
    date: "20/09/24",
    type: "opposing",
  },
  {
    quote: "Expert opinion on the topic",
    summary: "Professional analysis of the situation.",
    source: "BBC News",
    date: "20/09/24",
    type: "opposing",
  },
  {
    quote: "Expert opinion on the topic",
    summary: "Professional analysis of the situation.",
    source: "BBC News",
    date: "20/09/24",
    type: "opposing",
  },
  {
    quote: "Expert opinion on the topic",
    summary: "Professional analysis of the situation.",
    source: "BBC News",
    date: "20/09/24",
    type: "opposing",
  },
  {
    quote: "Expert opinion on the topic",
    summary: "Professional analysis of the situation.",
    source: "BBC News",
    date: "20/09/24",
    type: "opposing",
  },
  {
    quote: "Expert opinion on the topic",
    summary: "Professional analysis of the situation.",
    source: "BBC News",
    date: "20/09/24",
    type: "opposing",
  },
  {
    quote: "Final thoughts on the issue",
    summary: "Concluding remarks and future implications.",
    source: "Reuters",
    date: "20/09/24",
    type: "supporting",
  },
  {
    quote: "Final thoughts on the issue",
    summary: "Concluding remarks and future implications.",
    source: "Reuters",
    date: "20/09/24",
    type: "supporting",
  },
  {
    quote: "Final thoughts on the issue",
    summary: "Concluding remarks and future implications.",
    source: "Reuters",
    date: "20/09/24",
    type: "supporting",
  },
  {
    quote: "Final thoughts on the issue",
    summary: "Concluding remarks and future implications.",
    source: "Reuters",
    date: "20/09/24",
    type: "supporting",
  },
];
