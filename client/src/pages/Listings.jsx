import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listings() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="w-full mt-20">
      {loading && <p className="">Loading...</p>}
      {error && <p>Something went wrong!</p>}
      {listing && !loading && !error && (
        <>
          <Swiper navigation className="relative">
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="w-full h-96"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
            <div className="absolute top-6 right-6 z-20 w-10 h-10 flex justify-center items-center rounded-3xl bg-red-600 ">
              <FaShare
                className="text-white text-xl"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className="absolute top-20 right-6 text-white bg-red-600 px-3 py-1 z-20 rounded-lg">
                Link copied!
              </p>
            )}
          </Swiper>

          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-start p-5 md:w-4/5 mt-5">
              <p className="text-3xl font-bold font-sans">
                {listing.name} - ${" "}
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / month"}
                {listing.type === "sale" && " for sale"}
              </p>

              <p className="text-lg text-slate-500 flex justify-center items-center mt-5">
                <FaMapMarkerAlt className="me-2" />
                {listing.address}
              </p>

              <div className="flex text-lg my-4">
                <p className="font-bold pe-3">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p className="text-red-600">
                    ${+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )}
              </div>
              <ul className="flex font-bold flex-wrap">
                <li className="flex justify-center items-center pe-5">
                  <FaBed className="me-2 text-xl font-sans" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </li>
                <li className="flex justify-center items-center pe-5">
                  <FaBath className="me-2 text-xl font-sans" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </li>
                <li className="flex justify-center items-center pe-5">
                  <FaParking className="me-2 text-xl font-sans" />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex justify-center items-center pe-5">
                  <FaChair className="me-2 text-xl font-sans" />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>

              <p className="mt-5 text-lg">
                <span className="font-sans">Description - </span>
                {listing.description}
              </p>

              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <div>
                    <button
                      onClick={() => setContact(true)}
                      className="text-lg mt-5 h-12 w-48 bg-sky-400 text-white rounded-lg font-bold "
                    >
                      Contact landlord
                    </button>
                  </div>
                )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
