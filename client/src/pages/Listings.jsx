import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import Contact from '../components/Contact';



export default function Listings() {
    SwiperCore.use([Navigation]); 
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const {currentUser} = useSelector((state)  => state.user);

    useEffect(() =>{
        const fetchListing = async () =>{
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data =await res.json();
                if(data.success === false){
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
        }
        fetchListing()
    },[params.listingId]);

    
  return (
    <main className='main-listing'>
      {loading && <p className='loading-text'>Loading...</p>}
      {error && <p>Something went wrong!</p>}
       {listing && !loading && !error && 
        <>
            <Swiper navigation>
                {listing.imageUrls.map((url) =>(
                    <SwiperSlide key={url}>
                        <div className='slide-img' style={{background: `url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='share-icon'>
            <FaShare
              className='share-symbol'
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
            <p className='copy-msg'>
              Link copied!
            </p>
          )}
      <div className='listing-detailsContainer'>
        <div className='userList-container'>
            <p className='userList-title'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='userList-mapIcon'>
              <FaMapMarkerAlt className='map-icon' />
              {listing.address}
            </p>
            <div className='userList-buttons'>
              <p className='userRent-sale'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='userList-offer'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='userList-description'>
              <span className='user-description'>Description - </span>
              {listing.description}
            </p>
            <ul className='user-lists'>
              <li className='user-li '>
                <FaBed className='user-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='user-baths '>
                <FaBath className='bath-icon' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='userList-park '>
                <FaParking className='user-park' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='userList-furnish '>
                <FaChair className='user-Furnish' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <div>
                <button onClick={() => setContact(true)} className='userList-contact'>
                  Contact landlord
                </button>
              </div>
            )}
            {contact && <Contact listing={listing} />}
          </div>

      </div>
        </>
       }
    </main>
  )
}
