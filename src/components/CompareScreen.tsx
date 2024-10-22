import React, { useState } from 'react';

const CompareScreen: React.FC = () => {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('api/compare-urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url1, url2 }),
      });

      if (!response.ok) {
        throw new Error('Error comparing websites');
      }

      // Handle the response, maybe updating UI with comparison result or images
      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Screen Compare Tool</h1>
      
      <div className="space-y-4">
        <input
          type="text"
          value={url1}
          onChange={(e) => setUrl1(e.target.value)}
          placeholder="Enter first website URL"
          className="px-4 py-2 border border-gray-300 rounded-md w-80"
        />
        <input
          type="text"
          value={url2}
          onChange={(e) => setUrl2(e.target.value)}
          placeholder="Enter second website URL"
          className="px-4 py-2 border border-gray-300 rounded-md w-80"
        />
      </div>

      <button
        onClick={handleCompare}
        disabled={loading}
        className={`mt-6 px-6 py-2 text-white rounded-md ${
          loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Comparing...' : 'Compare Now!'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CompareScreen;
