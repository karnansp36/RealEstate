import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listings/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full  mt-24 flex justify-center">
      <div className="w-full h-full  flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mt-3 mb-5">Create a Listing</h1>
        <form
          className="flex flex-col md:border-2 md:rounded-lg md:flex-row md:w-4/5 p-5 w-full h-full md:h-4/5 justify-evenly items-start  "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full h-3/5 md:h-full me-4 justify-between ">
            <input
              type="text"
              name="product-name"
              id="name"
              className="h-12 mb-5 rounded-lg ps-5 bg-sky-100"
              placeholder="Name"
              required
              onChange={handleChange}
              value={formData.name}
            />

            <textarea
              name="list-description"
              id="description"
              cols="30"
              rows="10"
              className="h-48 mb-5 rounded-lg p-4 bg-sky-100"
              placeholder="Description"
              required
              onChange={handleChange}
              value={formData.description}
            ></textarea>

            <input
              type="text"
              name="product-address"
              id="address"
              className="h-12 mb-5 rounded-lg ps-5 bg-sky-100"
              placeholder="Address"
              required
              onChange={handleChange}
              value={formData.address}
            />

            <div className="w-full flex flex-wrap items-center ">
              <div className="flex justify-center items-center mt-3">
                <input
                  type="checkbox"
                  name="sell"
                  id="sale"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                  className="w-6 h-6 me-3 bg-sky-100"
                />
                <label className="text-lg me-5 font-sans font-semibold">Sell</label>
              </div>
              <div className="flex justify-center items-center mt-3">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                onChange={handleChange}
                checked={formData.type === "rent"}
                className="w-6 h-6 me-3 bg-sky-100"
              />
              <label className="text-lg me-5 font-sans font-semibold">Rent</label>

              </div>
              <div className="flex justify-center items-center mt-3">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
                className="w-6 h-6 me-3 bg-sky-100"
              />

              <label className="text-lg me-5 font-sans font-semibold">Parking</label>
              </div>

              <div className="flex justify-center items-center mt-3">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
                className="w-6 h-6 me-3"
              />
              <label className="text-lg me-5 font-sans font-semibold">
                Furnished
              </label>
              </div>

              <div className="flex justify-center items-center mt-3">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
                className="w-6 h-6 me-3 "
              />
              <label className="text-lg font-sans me-5 font-semibold">Offer</label>
              </div>
            </div>
            <div className="h-[30%] w-4/5 mt-5 flex flex-col justify-between ">
              <div className="flex w-full justify-between">
                <label className="flex flex-col w-2/5 ">
                  <span className="font-bold ">Beds</span>

                  <input
                    type="number"
                    className="h-10 rounded-lg ps-5 bg-sky-100"
                    name="list-beds"
                    onChange={handleChange}
                    value={formData.bedrooms}
                    id="bedrooms"
                  />
                </label>
                <label className="flex flex-col w-2/5">
                  <span className="font-bold">Baths</span>
                  <input
                    type="number"
                    className="h-10 rounded-lg ps-5 bg-sky-100"
                    name="list-baths"
                    id="bathrooms"
                  />
                </label>
              </div>

              <div className="flex mt-5 justify-between">
                <label className="flex flex-col w-2/5">
                  <span className="font-bold">Regular price</span>
                  <input
                    type="number"
                    className="h-10 rounded-lg ps-5 bg-sky-100"
                    name="list-regular"
                    onChange={handleChange}
                    value={formData.regularPrice}
                    required
                    id="regularPrice"
                  />
                </label>
                {formData.offer && (
                  <label className="flex flex-col w-2/5">
                    <span className="font-bold text-nowrap">Discounted price</span>
                    <input
                      type="number"
                      className="h-10 rounded-lg ps-5 bg-sky-100"
                      name="list-discount"
                      onChange={handleChange}
                      value={formData.discountPrice}
                      required
                      id="discountPrice"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

         
          <div className="w-full  flex flex-col pt-5 md:p-0 ">
          <div className="w-full pb-1">
            <span className="text-lg font-bold font-sans">Images:</span>
            <span className="text-lg">The first images will be the cover (max 6):</span>
          </div>
            <input
              type="file"
              name="product-images"
              id="imageUrls"
              className=" bg-sky-100 rounded-lg p-2 mb-6 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md
              file:border-0 file:text-sm file:font-semibold
              file:bg-pink-50 file:text-sky-700
              hover:file:bg-pink-100"
              onChange={(e) => setFiles(e.target.files)}
              accept="images/*"
              multiple
            />

            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div key={url} className="w-full 2xl:h-40 lg:h-28 mb-5 h-20 flex justify-between items-center">
                  <img src={url} className="w-2/5 h-full object-cover" alt={`Image ${index}`} />
                  <button
                    type="button"
                    className="text-red-600 cursor-pointer font-semibold font-sans"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}

            <button
              className="w-3/6 h-12 bg-sky-400 text-white rounded-lg  mx-auto text-lg font-semibold hover:bg-transparent hover:text-sky-400 hover:border-2 border-sky-400"
              type="button"
              disabled={loading}
              onClick={handleImageSubmit}
            >
              {uploading ? "Uploading..." : "Upload Images"}
            </button>
            <p className="">{imageUploadError && imageUploadError}</p>
          <button className="w-3/6 h-12 mt-5 bg-red-400 text-white rounded-lg  mx-auto text-lg font-semibold hover:bg-transparent hover:text-red-400 hover:border-2 border-red-400" disabled={loading || uploading}>
            {loading ? "Creating...." : "Create Listing"}
          </button>
          </div>

        </form>
      </div>

      {error && <p className="">{error}</p>}
    </div>
  );
}
