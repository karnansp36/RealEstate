import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase';

export default function Listing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls:[],
    })
    const [imageUploadError, setImageUploadError] = useState(null);
    const [uploading, setUploading] = useState(false);
    console.log(formData);

    const handleImageSubmit = (e) =>{
        if(files.length>0 && files.length + formData.imageUrls.length < 7){
            setUploading(true);
            setImageUploadError(false);
            const promises = [];
            for(let i=0; i<files.length;i++){
                promises.push(storeImage(files[i]));
        }
        Promise.all(promises).then((urls) =>{
            setFormData({...FormData, imageUrls: formData.imageUrls.concat(urls)});
            setImageUploadError(false);
            setUploading(false);
        }).catch((err) =>{
            setImageUploadError("Image Upload Failed (2mb per image)");
            setUploading(false);
        })
        
    }else{
        setImageUploadError("You can only upload 6 images per listing");
        setUploading(false);
    }
}
    const storeImage =async (file) =>{
        return new Promise((resolve, reject) =>{
            const storage = getStorage(app);
            const fileName =  new Date().getTime() +  file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed', 
                (snapshot) =>{
                  const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100; 
                  console.log(`Upload is ${progress}% done`) 
                },
            (error)=>{
                reject(error)
            },
                 ()=> getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) =>{
                        resolve(downloadURL);
                    })
                )
        });
    }

    const hadleRemoveImage = (index) =>(
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index)
        })
    )
    

  return (
    <div className='listing-center'>
         <div className='list-container'>
            <form className='list-wrapper'>
                <h1 className='title-listing'>Create a Listing</h1>
                <input type="text" name="product-name" id="name" className='list-name' placeholder='Name' />
                <textarea name="list-description" id="description" cols="30" rows="10" className='list-description' placeholder='Description'></textarea>
                <input type="text" name="product-address" id="address" className='list-address' placeholder='Address' />
                <div className='check-list-container'>
                    <label className='sell-label'><input type="checkbox" name="sell" id="sell" className='sell-input' />Sell</label>
                    <label className='rent-label'><input type="checkbox" name="rent" id="rent" className='rent-input' />Rent</label>
                    <label className='parking-label'><input type="checkbox" name="parking" id="parking" className='parking-input' />Parking</label>
                    <label className='furnished-label'><input type="checkbox" name="furnished" id="furnished" className='furnished-input' />Furnished</label>
                    <label className='offer-label'><input type="checkbox" name="offer" id="offer" className='offer-input' />Offer</label>
                </div>
                <div className='label-container'>
                    <div className='b-label'>
                        <label className='beds-label'><input type="number" className='beds-input' name="list-beds" defaultValue={2} id="bedrooms" /><span>Beds</span></label>
                        <label className='baths-label'><input type="number" className='baths-input' name="list-baths" defaultValue={3} id="bathrooms" /><span>Baths</span></label>
                    </div>
                    <label className='price-label'>
                        <input type="number" className='regular-input' name="list-regular" id="regularPrice" />
                        <span>Regular price</span>
                        <span>($/month)</span>
                    </label>
                    <label className='price-label'>
                        <input type="number" className='discount-input' name="list-discount" id="discountPrice" />
                        <span>Discounted price</span>
                        <span>($/month)</span>
                    </label>
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
                                <button type='button' className='imageDelete-btn' onClick={() =>hadleRemoveImage(index)}>Delete</button>
                            </div>
                        ))
                    }
                    

                    <button className='listImage-btn' type='button' onClick={handleImageSubmit}>{uploading ? 'Uploading...' : "Upload"}</button>
                    <p className='imageList-error'>{ imageUploadError && imageUploadError}</p>
                   
                </div>
                
                <button className='listing-btn'>CREATE LISTING</button>
            </form>
        </div>
    </div>
  )
}
