import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64'
        type='text'
        placeholder='Search Order ID'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
