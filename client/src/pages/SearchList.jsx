import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function SearchList() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="flex md:flex-row flex-col w-full h-full ">
      <div className="lg:w-[40%] 2xl:w-[30%] w-full h-2/6 md:h-screen md:sticky top-0 mt-20">
        <form onSubmit={handleSubmit} className="w-full h-full p-5 shadow-xl">
          <div className="pt-5">
            <label className="text-lg font-sans font-bold">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="w-3/5 h-10 ms-4 rounded-lg ps-5 bg-sky-100"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="pt-5">
            <label className="text-lg font-sans font-bold ">Type:</label>

            <div className="flex flex-wrap pt-3">
              <div className="me-4 flex justify-center items-center">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5 h-5 me-2"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <span className="text-lg font-semibold">Rent & Sale</span>
              </div>
              <div className="me-4 flex justify-center items-center">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 h-5 me-2"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span className="text-lg font-semibold">Rent</span>
              </div>
              <div className="me-4 flex justify-center items-center">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 h-5 me-2"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                />
                <span className="text-lg font-semibold">Sale</span>
              </div>
              <div className="me-4 flex justify-center items-center">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 h-5 me-2"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <span className="text-lg font-semibold">Offer</span>
              </div>
            </div>
          </div>
          <div className="mt-5 font-sans  text-lg">
            <label className="font-bold">Amenities:</label>
            <div className="flex mt-2">
              <div className="flex justify-center items-center me-5">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5 h-5 me-2"
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <span className="font-semibold">Parking</span>
              </div>
              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5 h-5 me-2"
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <span className="font-semibold">Furnished</span>
              </div>
            </div>
          </div>
          <div className="mt-5 ">
            <label className="font-bold text-lg pe-3">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="w-3/5 h-10 rounded-lg ps-5 bg-sky-100"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <div className="mt-12 flex justify-center items-center  w-full">
            <button className="w-3/5 bg-sky-400 text-white h-10 rounded-lg text-lg font-bold">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="w-full h-full ps-10 shadow-xl flex md:mt-20 justify-center items-center flex-col">
        <h1 className="text-3xl p-10 font-bold">Listing results:</h1>
        <div className="flex flex-wrap justify-start ">
          {!loading && listings.length === 0 && (
            <p className="">No listing found!</p>
          )}
          {loading && <p className="">Loading...</p>}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button onClick={onShowMoreClick} className="">
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
