import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='max-w-xs sm:max-w-xs md:max-w-sm lg:max-w-sm xl:max-w-sm me-5 mb-5 bg-white shadow-lg rounded-lg overflow-hidden'>
  <Link to={`/listings/${listing._id}`} className='block'>
    <img
      src={
        listing.imageUrls[0] ||
        'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
      }
      alt='item cover'
      className='w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover'
    />
    <div className='p-4 flex flex-col justify-between h-full'>
      <p className='text-lg font-semibold mb-2 truncate'>{listing.name}</p>
      <div className='flex items-center mb-2'>
        <svg className='w-4 h-4 fill-current text-gray-500 mr-2' viewBox='0 0 24 24'>
          <path
            fill='currentColor'
            d='M12 2C8.13 2 5 5.13 5 9c0 3.86 7 13 7 13s7-9.14 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
          ></path>
        </svg>
        <p className='text-gray-600 text-sm'>{listing.address}</p>
      </div>
      <p className='text-gray-700 mb-2 line-clamp-3'>{listing.description}</p>
      <p className='text-lg font-semibold text-green-500'>
        $
        {listing.offer
          ? listing.discountPrice.toLocaleString('en-US')
          : listing.regularPrice.toLocaleString('en-US')}
        {listing.type === 'rent' && ' / month'}
      </p>
      <div className='flex justify-start mt-2 '>
        <div className='text-gray-600 me-5'>
          {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
        </div>
        <div className='text-gray-600'>
          {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
        </div>
      </div>
    </div>
  </Link>
</div>


  );
}