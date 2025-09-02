import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLayout } from "../../Components";
import TopMenuNav from "../../Components/Dashboard/TopNav";
import {} from "react-icons/ri";
import { FiDownload } from "react-icons/fi";

import { IoMdArrowDown } from "react-icons/io";
import { getHotels } from "../../Store/Orders/order";

import {
  BiCalendar,
  BiChevronDown,
  BiChevronRight,
  BiMapPin,
  BiPlanet,
  BiUser,
} from "react-icons/bi";
import { FaPlane } from "react-icons/fa6";

export default function Hotel() {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.order?.hotels);
  const loading = useSelector((state) => state.order?.loading);
  const error = useSelector((state) => state.order?.error);

  const [, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState({});
  console.log(hotels);

  // // Filter data based on search term
  const filteredData = hotels?.hotels?.filter(
    (item) =>
      // item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.amount?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.category?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getHotels(currentPage));
  }, [dispatch]);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Use the flight array length as total for current page
  const totalItems = hotels?.hotels?.length || 0;
  const totalPages = hotels?.totalPages || 1;
  const currentFlightData = hotels?.hotels || [];

  // For display - since you're getting server-side paginated data
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + totalItems - 1, totalItems);
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpandedRows({});
    // Dispatch with new page size
    dispatch(getHotels(page)); // Close all expanded rows when changing pages
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
    setExpandedRows({});
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // const formatCurrency = (amount, currency) => {
  //   return new Intl.NumberFormat("en-NG", {
  //     style: "currency",
  //     currency: currency || "NGN",
  //   }).format(parseFloat(amount));
  // };

  // Loading component
  // const LoadingSpinner = () => (
  //   <div className="flex items-center justify-center min-h-[400px]">
  //     <div className="flex flex-col items-center space-y-4">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //       <p className="text-gray-600">Loading hotels...</p>
  //     </div>
  //   </div>
  // );

  // // Error component
  // const ErrorDisplay = ({ error, onRetry }) => (
  //   <div className="flex items-center justify-center min-h-[400px]">
  //     <div className="text-center">
  //       <div className="text-red-500 mb-4">
  //         <svg
  //           className="mx-auto h-12 w-12"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth={2}
  //             d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //           />
  //         </svg>
  //       </div>
  //       <h3 className="text-lg font-medium text-gray-900 mb-2">
  //         Error loading hotels
  //       </h3>
  //       <p className="text-gray-600 mb-4">{error || "Something went wrong"}</p>
  //       <button
  //         onClick={onRetry}
  //         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
  //       >
  //         Try Again
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <DashboardLayout className="bg-[#f9f9f9] text-center">
      <TopMenuNav TitleHeader="hotels" />
      <div className="w-[98%] mx-auto">
        <div className="bg-white mt-[3rem] rounded-xl shadow-2xl  overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Hotel Management
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage and monitor hotel bookings and reservations
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiDownload size={16} />
                  Export
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center py-[2rem]">
              {/* Empty State Illustration */}
              <div className="w-24 h-24 mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>

              {/* Empty State Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm !== "All" ? "No results found" : "No hotel yet"}
              </h3>

              <p className="text-gray-600 mb-6 max-w-md">
                {searchTerm !== "All"
                  ? `We couldn't find any hotel matching your search criteria. Try adjusting your filters.`
                  : "Get started by adding your first hotel to the system."}
              </p>
            </div>
            {/* Search and Filter */}
            {/* <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="relative flex-1">
                <RiSearchLine
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search hotels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FiFilter size={16} />
                Filter
                <IoMdArrowDown size={16} />
              </button>
            </div> */}
          </div>

          {/* <div className="overflow-x-auto">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorDisplay
                error={error}
                onRetry={() => dispatch(gethotels(currentPage))}
              />
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-12 px-6 py-3">
                      <input
                        type="checkbox"
                        checked={
                          selectedRows.length === paginatedData.length &&
                          paginatedData.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-2">
                        User Details
                        <IoMdArrowDown
                          size={14}
                          className={`transform transition-transform ${
                            sortBy === "name" && sortOrder === "desc"
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("role")}
                    >
                      <div className="flex items-center gap-2">
                        Ref Number
                        <IoMdArrowDown
                          size={14}
                          className={`transform transition-transform ${
                            sortBy === "role" && sortOrder === "desc"
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        <IoMdArrowDown
                          size={14}
                          className={`transform transition-transform ${
                            sortBy === "status" && sortOrder === "desc"
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading && currentFlightData?.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span className="text-sm text-gray-600">
                            Updating...
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {currentFlightData?.length > 0 &&
                    currentFlightData?.map((flight) => (
                      <React.Fragment key={flight?.id}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <div className="text-sm font-medium text-gray-900">
                                {flight?.description}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {flight?.id.slice(-8)}
                              </div>
                              <div className="text-xs text-gray-400">
                                Type: {flight?.trip_type.replace("_", " ")}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className="flex flex-col items-center">
                                <BiMapPin className="w-4 h-4 text-blue-500" />
                                <span className="text-sm font-medium">
                                  {flight?.departure_name}
                                </span>
                              </div>
                              <div className="flex-1 border-t border-gray-300 mx-2"></div>
                              <BiPlanet className="w-4 h-4 text-gray-400 transform rotate-90" />
                              <div className="flex-1 border-t border-gray-300 mx-2"></div>
                              <div className="flex flex-col items-center">
                                <BiMapPin className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium">
                                  {flight?.destination_name}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center text-sm">
                                <BiCalendar className="w-4 h-4 mr-1 text-blue-500" />
                                {formatDate(flight?.departure_date)}
                              </div>
                              <div className="flex items-center text-sm">
                                <BiCalendar className="w-4 h-4 mr-1 text-green-500" />
                                {formatDate(flight?.return_date)}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex flex-col space-y-1">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                  flight?.status
                                )}`}
                              >
                                {flight?.status}
                              </span>
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                  flight?.orderStatus
                                )}`}
                              >
                                Order: {flight?.orderStatus}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <BiUser className="w-4 h-4 mr-1 text-gray-500" />
                              <span className="text-sm font-medium">
                                {flight?.passenger_numb}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <button
                              onClick={() => toggleRow(flight.id)}
                              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                              {expandedRows[flight.id] ? (
                                <>
                                  <BiChevronDown className="w-4 h-4 mr-1" />
                                  Hide Details
                                </>
                              ) : (
                                <>
                                  <BiChevronRight className="w-4 h-4 mr-1" />
                                  Show Details
                                </>
                              )}
                            </button>
                          </td>
                        </tr>

                        {expandedRows[flight.id] && (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 bg-gray-50">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">                   
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                    Flight Data Details
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">
                                        Data Type:
                                      </span>{" "}
                                      {flight.data.type}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Data ID:
                                      </span>{" "}
                                      {flight?.data?.id}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Queuing Office:
                                      </span>{" "}
                                      {flight.data.queuingOfficeId}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        User ID:
                                      </span>{" "}
                                      {flight.userID}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Associated Records:
                                      </span>{" "}
                                      {flight?.data?.associatedRecords?.length}{" "}
                                      record(s)
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Flight Offers:
                                      </span>{" "}
                                      {flight?.data?.flightOffers?.length}{" "}
                                      offer(s)
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                    Contact Details
                                  </h4>
                                  <div className="space-y-4">
                                    {flight?.data?.data?.contacts?.map(
                                      (contact, index) => (
                                        <div
                                          key={index}
                                          className="p-3 bg-gray-50 rounded-md"
                                        >
                                          <div className="text-sm font-medium text-gray-800">
                                            {contact?.addresseeName
                                              ?.firstName ||
                                              contact?.companyName}
                                          </div>
                                          <div className="text-xs text-gray-600 mt-1">
                                            Purpose: {contact?.purpose}
                                          </div>
                                          {contact.address && (
                                            <div className="text-xs text-gray-600 mt-1">
                                              {contact?.address?.lines?.join(
                                                ", "
                                              )}
                                              <br />
                                              {contact?.address?.cityName},{" "}
                                              {contact?.address?.stateName}{" "}
                                              {contact?.address?.countryCode}
                                            </div>
                                          )}
                                          {contact.phones && (
                                            <div className="text-xs text-gray-600 mt-1">
                                              Phone:{" "}
                                              {contact?.phones[0]
                                                ?.countryCallingCode +
                                                contact?.phones[0]?.number}
                                            </div>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                    Traveler Information
                                  </h4>
                                  <div className="space-y-3">
                                    {flight?.data?.data?.travelers?.map(
                                      (traveler, index) => (
                                        <div
                                          key={index}
                                          className="p-3 bg-gray-50 rounded-md"
                                        >
                                          <div className="text-sm font-medium">
                                            {traveler.name?.firstName}{" "}
                                            {traveler.name?.lastName}
                                          </div>
                                          <div className="text-xs text-gray-600">
                                            Email:{" "}
                                            {traveler?.contact?.emailAddress} •
                                            ID: {traveler?.id}
                                          </div>
                                          <div className="text-xs text-gray-600">
                                            DOB: {traveler.dateOfBirth} •
                                            Gender: {traveler.gender}
                                          </div>

                                          {traveler?.contact?.phones && (
                                            <div className="text-xs text-gray-600 mt-1">
                                              Phone:{" "}
                                              {traveler?.contact?.phones[0]
                                                ?.countryCallingCode +
                                                traveler?.contact?.phones[0]
                                                  ?.number}
                                            </div>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>

                             
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                    Location Dictionary
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                
                                  </div>
                                </div>

                                
                                {flight?.data?.warnings?.length > 0 && (
                                  <div className="lg:col-span-2 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                    <h4 className="text-lg font-semibold text-yellow-800 mb-3">
                                      Warnings
                                    </h4>
                                    <div className="space-y-1">
                                      {flight?.data?.warnings?.map(
                                        (warning, index) => (
                                          <div
                                            key={index}
                                            className="text-sm text-yellow-700"
                                          >
                                            • {warning?.message}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

                                {flight?.data?.data?.flightOffers?.map(
                                  (offer, index) => (
                                    <div
                                      key={index}
                                      className="border border-gray-200 rounded-lg p-4 mb-4"
                                    >
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      
                                        <div>
                                          <h5 className="font-medium text-gray-800 mb-2">
                                            Pricing Breakdown
                                          </h5>
                                          <div className="bg-green-50 p-3 rounded-md space-y-1">
                                            <div className="flex justify-between">
                                              <span className="text-sm">
                                                Base Price:
                                              </span>
                                              <span className="font-medium">
                                                {formatCurrency(
                                                  offer.price.base,
                                                  offer.price.currency
                                                )}
                                              </span>
                                            </div>
                                            <div className="text-xs text-gray-600">
                                              <div className="font-medium mb-1">
                                                Fees:
                                              </div>
                                              {offer.price.fees.map(
                                                (fee, feeIndex) => (
                                                  <div
                                                    key={feeIndex}
                                                    className="flex justify-between ml-2"
                                                  >
                                                    <span>{fee.type}:</span>
                                                    <span>
                                                      {formatCurrency(
                                                        fee.amount,
                                                        offer.price.currency
                                                      )}
                                                    </span>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                            <div className="border-t pt-2 flex justify-between font-bold">
                                              <span>Total:</span>
                                              <span>
                                                {formatCurrency(
                                                  offer.price.total,
                                                  offer.price.currency
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                      
                                        <div>
                                          <h5 className="font-medium text-gray-800 mb-2">
                                            Offer Details
                                          </h5>
                                          <div className="space-y-2 text-sm">
                                            <div>
                                              <span className="font-medium">
                                                Offer ID:
                                              </span>{" "}
                                              {offer.id}
                                            </div>
                                            <div>
                                              <span className="font-medium">
                                                Last Ticketing:
                                              </span>{" "}
                                              {offer.lastTicketingDate}
                                            </div>
                                            <div>
                                              <span className="font-medium">
                                                Source:
                                              </span>{" "}
                                              {offer.source}
                                            </div>
                                            <div>
                                              <span className="font-medium">
                                                Airline:
                                              </span>{" "}
                                              {offer.validatingAirlineCodes.join(
                                                ", "
                                              )}
                                            </div>
                                            <div>
                                              <span className="font-medium">
                                                Fare Type:
                                              </span>{" "}
                                              {offer.pricingOptions.fareType.join(
                                                ", "
                                              )}
                                            </div>
                                            <div>
                                              <span className="font-medium">
                                                Checked Bags:
                                              </span>{" "}
                                              {offer.pricingOptions
                                                .includedCheckedBagsOnly
                                                ? "Included"
                                                : "Not Included"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="mt-4">
                                        <h5 className="font-medium text-gray-800 mb-2">
                                          Traveler Pricing
                                        </h5>
                                        {offer.travelerPricings.map(
                                          (travelerPrice, tIndex) => (
                                            <div
                                              key={tIndex}
                                              className="bg-blue-50 p-3 rounded-md mb-3"
                                            >
                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                  <div className="text-sm space-y-1">
                                                    <div>
                                                      <span className="font-medium">
                                                        Traveler ID:
                                                      </span>{" "}
                                                      {travelerPrice.travelerId}
                                                    </div>
                                                    <div>
                                                      <span className="font-medium">
                                                        Type:
                                                      </span>{" "}
                                                      {
                                                        travelerPrice.travelerType
                                                      }
                                                    </div>
                                                    <div>
                                                      <span className="font-medium">
                                                        Fare Option:
                                                      </span>{" "}
                                                      {travelerPrice.fareOption}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="text-sm space-y-1">
                                                    <div>
                                                      <span className="font-medium">
                                                        Price:
                                                      </span>{" "}
                                                      {formatCurrency(
                                                        travelerPrice.price
                                                          .total,
                                                        travelerPrice.price
                                                          .currency
                                                      )}
                                                    </div>
                                                    <div>
                                                      <span className="font-medium">
                                                        Base:
                                                      </span>{" "}
                                                      {formatCurrency(
                                                        travelerPrice.price
                                                          .base,
                                                        travelerPrice.price
                                                          .currency
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                             
                                              <div className="mt-3">
                                                <h6 className="font-medium text-gray-700 mb-2">
                                                  Fare Details by Segment
                                                </h6>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                  {travelerPrice.fareDetailsBySegment.map(
                                                    (segment, sIndex) => (
                                                      <div
                                                        key={sIndex}
                                                        className="bg-white p-2 rounded border text-xs"
                                                      >
                                                        <div>
                                                          <span className="font-medium">
                                                            Seg{" "}
                                                            {segment.segmentId}:
                                                          </span>
                                                        </div>
                                                        <div>
                                                          Cabin: {segment.cabin}
                                                        </div>
                                                        <div>
                                                          Class: {segment.class}
                                                        </div>
                                                        <div>
                                                          Fare:{" "}
                                                          {segment.fareBasis}
                                                        </div>
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>

                                     
                                      <div className="mt-4">
                                        <h5 className="font-medium text-gray-800 mb-2">
                                          Flight Itineraries
                                        </h5>
                                        {offer.itineraries.map(
                                          (itinerary, iIndex) => (
                                            <div
                                              key={iIndex}
                                              className="bg-gray-50 p-3 rounded-md mb-2"
                                            >
                                              <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium">
                                                  Itinerary {iIndex + 1}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                  Duration: {itinerary.duration}
                                                </span>
                                              </div>
                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {itinerary.segments.map(
                                                  (segment, segIndex) => (
                                                    <div
                                                      key={segIndex}
                                                      className="bg-white p-3 rounded border"
                                                    >
                                                      <div className="text-sm">
                                                        <div className="font-medium mb-1">
                                                          Segment {segment.id}
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                          <div>
                                                            <div className="text-xs text-gray-600">
                                                              Departure
                                                            </div>
                                                            <div>
                                                              {
                                                                segment
                                                                  .departure
                                                                  .iataCode
                                                              }
                                                            </div>
                                                            <div className="text-xs">
                                                              {formatDate(
                                                                segment
                                                                  .departure.at
                                                              )}
                                                            </div>
                                                          </div>
                                                          <FaPlane className="w-4 h-4 text-gray-400 transform rotate-90" />
                                                          <div>
                                                            <div className="text-xs text-gray-600">
                                                              Arrival
                                                            </div>
                                                            <div>
                                                              {
                                                                segment.arrival
                                                                  .iataCode
                                                              }
                                                            </div>
                                                            <div className="text-xs">
                                                              {formatDate(
                                                                segment.arrival
                                                                  .at
                                                              )}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
            )}
          </div> */}
          {/* <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
             
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) =>
                    handleItemsPerPageChange(parseInt(e.target.value))
                  }
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-700">per page</span>
              </div>

             
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
                {totalItems} results
              </div>

           
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

          
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === currentPage;


                    const shouldShow =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1);

                    if (!shouldShow) {
                      
                      if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span
                            key={page}
                            className="px-3 py-2 text-sm text-gray-500"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium border rounded-md ${
                          isCurrentPage
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
}
