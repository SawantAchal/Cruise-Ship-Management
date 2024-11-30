import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieForm = ({ fetchMovies, editingMovie, setEditingMovie , url}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    language: '',
    pricePerSeat: 0,
    rating: 0,
    rows: 5, // Default rows
    cols: 10, // Default columns
    showtimes: [],
  });

  // Sync editingMovie prop with local form state
  useEffect(() => {
    if (editingMovie) {
      setForm(editingMovie);
    } else {
      setForm({
        title: '',
        description: '',
        language: '',
        pricePerSeat: 0,
        rating: 0,
        rows: 5,
        cols: 10,
        showtimes: [],
      });
    }
  }, [editingMovie]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMovie) {
        await axios.put(`${url}/api/movies/${editingMovie._id}`, form);
      } else {
        await axios.post(`${url}/api/movies`, form);
      }
      fetchMovies();
      setEditingMovie(null);
      setForm({
        title: '',
        description: '',
        language: '',
        pricePerSeat: 0,
        rating: 0,
        rows: 5,
        cols: 10,
        showtimes: [],
      });
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  return (
    <form className="p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Language</label>
        <input
          type="text"
          name="language"
          value={form.language}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label>Rows</label>
        <input
          type="number"
          name="rows"
          value={form.rows}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Columns</label>
        <input
          type="number"
          name="cols"
          value={form.cols}
          onChange={handleChange}
          required
        />
      </div>
      

      <div className="mb-4">
        <label className="block text-gray-700">Price Per Seat</label>
        <input
          type="number"
          name="pricePerSeat"
          value={form.pricePerSeat}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Rating</label>
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Showtimes (comma-separated)</label>
        <input
          type="text"
          name="showtimes"
          value={form.showtimes.join(',')}
          onChange={(e) => setForm({ ...form, showtimes: e.target.value.split(',') })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editingMovie ? 'Update Movie' : 'Add Movie'}
      </button>
    </form>
  );
};

export default MovieForm;
