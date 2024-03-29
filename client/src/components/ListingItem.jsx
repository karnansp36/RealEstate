import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div class='item-card'>
  <Link to={`/listings/${listing._id}`} className='item-link'>
    <img
      src={
        listing.imageUrls[0] ||
        'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
      }
      alt='item cover'
      className='item-image'
    />
    <div className='item-details'>
      <p className='item-name'>{listing.name}</p>
      <div className='item-location'>
        <svg className='location-icon' viewBox='0 0 24 24'>
          <path
            fill='currentColor'
            d='M12 2C8.13 2 5 5.13 5 9c0 3.86 7 13 7 13s7-9.14 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
          ></path>
        </svg>
        <p className='location-text'>{listing.address}</p>
      </div>
      <p className='item-description'>{listing.description}</p>
      <p className='item-price'>
        $
        {listing.offer
          ? listing.discountPrice.toLocaleString('en-US')
          : listing.regularPrice.toLocaleString('en-US')}
        {listing.type === 'rent' && ' / month'}
      </p>
      <div className='item-info'>
        <div className='item-bedrooms'>
          {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
        </div>
        <div className='item-bathrooms'>
          {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
        </div>
      </div>
    </div>
  </Link>
</div>

  );
}