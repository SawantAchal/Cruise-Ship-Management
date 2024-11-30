import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddMovie = ({ url }) => {
    const [movieData, setMovieData] = useState({
        name: '',
        language: '',
        rating: '',
        ticket_price: '',
        showtimes: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare the movie data payload
        const moviePayload = {
            name: movieData.name,
            description: movieData.description,
            ticket_price: movieData.ticket_price,
            language: movieData.language,
            rating: movieData.rating,
            showtimes: movieData.showtimes.split(',').map((showtime) => showtime.trim()) // Split showtimes into an array
        };

        try {
            const response = await axios.post(`${url}/api/movie/add-movie`, moviePayload, {
                headers: {
                    'Content-Type': 'application/json', // Make sure the request body is sent as JSON
                },
            });

            console.log(response.data);

            if (response.data.success) {
                setMovieData({
                    name: '',
                    language: '',
                    rating: '',
                    ticket_price: '',
                    showtimes: '',
                    description: '',
                });
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error adding movie');
            console.log(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-10">
            <h2 className="text-2xl font-semibold text-center text-gray-700">Add New Movie</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="name"
                        value={movieData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        placeholder="Movie Name"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="language"
                        value={movieData.language}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        placeholder="Language"
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="rating"
                        value={movieData.rating}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        min="0"
                        max="10"
                        placeholder="Rating"
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="ticket_price"
                        value={movieData.ticket_price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        placeholder="Price"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="showtimes"
                        value={movieData.showtimes}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        placeholder="e.g., 12:00 PM, 4:00 PM"
                    />
                </div>
                <div>
                    <textarea
                        name="description"
                        value={movieData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        rows="4"
                        placeholder="Description"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Add Movie
                </button>
            </form>
        </div>
    );
};

export default AddMovie;
