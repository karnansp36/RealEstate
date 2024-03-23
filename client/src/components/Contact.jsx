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
    <div className='contact-container'>
      <p>
        Contact <span className='contact-username'>{landlord.username}</span>{' '}
        for{' '}
        <span className='contact-name'>{listing.name.toLowerCase()}</span>
      </p>
      <textarea
        name='message'
        id='message'
        rows='2'
        value={message}
        onChange={onChange}
        placeholder='Enter your message here...'
        className='contact-msg'
      ></textarea>

<Link
  to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
  className='contact-mail'
>
  Send Message
</Link>

    </div>
  );
}
