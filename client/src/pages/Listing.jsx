import React from 'react'

export default function Listing() {
  return (
    <div className='listing-center'>
         <div className='list-container'>
            <form className='list-wrapper'>
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
                    <input type="file" name="product-images" id="imageUrls" className='imgList-url' />
                    <button className='listImage-btn'>UPLOAD</button>
                </div>
                <button className='listing-btn'>CREATE LISTING</button>
            </form>
        </div>
    </div>
  )
}
