import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../app/constants";
export const Pagination = ({ page, setPage, handlePage, totalItems }) => {
    // console.log(totalItems)
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    console.log(totalItems)
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          {/* mobile pagination  */}
          <div
            onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </div>
          <div
            onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              {/* here it should be shown like first page is showing 1 to 10 products if ITEMS_PER_PAGE is 10 then second page 11 to 20 so on .  */}
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span
                // agar results hi 2 hue and ITEMS_PER_PAGE is 10 toh filter mai esa ho sakta hai
                className="font-medium"
              >

                {
                   
                  (page*ITEMS_PER_PAGE > totalItems ? totalItems : page*ITEMS_PER_PAGE)}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
  
              {/* it is like fakeArray={length:5} it means i am declaring a array with lenght 5 it is not object here lenght is a keyword  */}
              {/* here below i want to iterable which should itereate upto totapage it totalItems is 100 and ITEMS_PER_PAGE is 10 means totalPage is 10 so below loop should iterate 10 times so in the pageination from 1 to 10 block will be created to paginate  */}
              {Array.from({ length: totalPages }).map((el, index) => {
                return (
                  <div>
                    <div
                      onClick={(e) => handlePage(index + 1)}
                      aria-current="page"
                      className={`relative z-10 cursor-pointer inline-flex items-center ${
                        index + 1 === page
                          ? "bg-indigo-600 text-white"
                          : "text-gray-400"
                      }  px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      {index + 1}
                    </div>
                  </div>
                );
              })}
  
              <div
                onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  };
