import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  if (!landlord) {
    return null; // or loading indicator if needed
  }

  return (
   <div className='p-4 bg-white rounded-md shadow-md'>
  <p className='text-lg font-bold'>
    Contact{' '}
    <span className='text-blue-500'>{landlord.username}</span>{' '}
    for{' '}
    <span className='text-green-500'>{listing.name.toLowerCase()}</span>
  </p>
  <textarea
    name='message'
    id='message'
    rows='2'
    value={message}
    onChange={onChange}
    placeholder='Enter your message here...'
    className='mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
  ></textarea>
  <a
    href={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
    className='mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
  >
    Send Message
  </a>
</div>

  );
}
