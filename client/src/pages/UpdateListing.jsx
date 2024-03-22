import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const params = useParams();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
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


useEffect(() =>{
    const fetchListing = async() =>{
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if(data.success ===false){
            console.log(data.message);
            return;
        }
        setFormData(data);
    };
    fetchListing();
}, []);






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
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
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
        'state_changed',
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
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
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
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    <div className='listing-center'>
         <div className='list-container'>
            <form className='list-wrapper' onSubmit={handleSubmit}>
                <h1 className='title-listing'>Update a Listing</h1>
                <input 
                type="text" 
                name="product-name" 
                id="name" 
                className='list-name' 
                placeholder='Name'
                required
                onChange={handleChange}
                value={formData.name}
                 />

                <textarea 
                name="list-description" 
                id="description" 
                cols="30" rows="10" 
                className='list-description'
                 placeholder='Description'
                 required
                 onChange={handleChange}
                 value={formData.description}
                 >
                 </textarea>

                <input 
                type="text"
                 name="product-address" 
                 id="address" 
                 className='list-address' 
                 placeholder='Address'
                 required
                 onChange={handleChange}
                 value={formData.address}
                 />
                 
                <div className='check-list-container'>
                    <input 
                    type="checkbox" 
                    name="sell" 
                    id="sale" 
                    onChange={handleChange}
                    checked={formData.type === "sale"}
                    className='sell-input' />
                    <label className='sell-label'>Sell</label>
                    
                    <input 
                    type="checkbox"
                    name="rent"
                    id="rent"
                    onChange={handleChange}
                    checked={formData.type === "rent"}
                    className='rent-input' />
                    <label className='rent-label'>Rent</label>

                        <input type="checkbox"
                         name="parking" 
                         id="parking" 
                         onChange={handleChange}
                         checked={formData.parking}
                         className='parking-input' />

                    <label className='parking-label'>Parking</label>
                        <input type="checkbox"
                         name="furnished"
                          id="furnished" 
                          onChange={handleChange}
                          checked={formData.furnished}
                          className='furnished-input' />
                    <label className='furnished-label'>Furnished</label>

                        <input type="checkbox" 
                        name="offer" 
                        id="offer"
                        onChange={handleChange}
                        checked={formData.offer}
                         className='offer-input' />
                    <label className='offer-label'>Offer</label>
                </div>
                <div className='label-container'>
                    <div className='b-label'>
                    <label className='beds-label'>
                        <input 
                        type="number"
                        className='beds-input' 
                        name="list-beds"
                        onChange={handleChange}
                        value={formData.bedrooms}
                        id="bedrooms" />
                        <span>Beds</span>
                    </label>
                        <label className='baths-label'>
                            <input 
                            type="number" 
                            className='baths-input'
                            name="list-baths"
                            
                            id="bathrooms" />
                            <span>Baths</span>
                        </label>
                    </div>

                    <div className='price-container'>
                    <label className='price-label'>
                        <input type="number" 
                         className='regular-input'
                         name="list-regular" 
                         onChange={handleChange}
                         value={formData.regularPrice}
                         required
                         id="regularPrice" />
                        <span>Regular price($/month)</span>
                        
                    </label>
                    {
                        formData.offer && (
                        <label className='price-label'>
                            <input type="number"
                            className='discount-input'
                            name="list-discount" 
                            onChange={handleChange}
                            value={formData.discountPrice}
                            required
                            id="discountPrice" />
                            <span>Discounted price($/month)</span>
                            
                        </label>

                        )
                    }


                    </div>
                </div>
                    
                <div className='img-description'>
                    <span>Images:</span>
                    <span>The first images will be the cover (max 6)</span>
                </div>
                <div className='listImg-container'>
                    <input type="file" name="product-images" id="imageUrls" className='imgList-url' onChange={(e)=>setFiles(e.target.files)} accept='images/*' multiple/>
                    
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                            <div key={url} className='list-imageContainer'>
                                <img  src={url} className='list-image-url' alt={`Image ${index}`} />
                                <button type='button' className='imageDelete-btn' onClick={() =>handleRemoveImage(index)}>Delete</button>
                            </div>
                        ))
                    }
                    

                    <button className='listImage-btn' type='button' disabled={loading} onClick={handleImageSubmit}>{uploading ? 'Uploading...' : "Upload"}</button>
                    <p className='imageList-error'>{ imageUploadError && imageUploadError}</p>
                   
                </div>
                
                <button className='listing-btn' disabled={loading || uploading}>{loading? 'Updating....': 'Update Listing'}</button>
            </form>
        </div>
        
        {error && <p className='text-red'>{error}</p>}
    </div>
  )
}
