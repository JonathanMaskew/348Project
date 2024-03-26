import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Rating = (props) => (
  <tr className="border-b-8 border-reeses-orange">
    <div className="flex justify-between align-middle py-5 px-4">
      <td className="align-middle">
        <span className="text-2xl font-bold text-reeses-brown hover:text-reeses-orange">
          {props.rating.rating} / 5
        </span>
        <br />
        <span>{props.rating.review}</span>
        <br />
      </td>
      <td className="align-middle">
        <div className="flex gap-2 justify-end">
          <button
            className="inline-flex items-center text-xl h-9 p-5 bg-reeses-brown text-white hover:opacity-70"
            type="button"
            onClick={() => {
              props.deleteRating(props.rating._id);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </div>
  </tr>
);

export default function RatingList() {
  const [ratings, setRatings] = useState([]);
  const params = useParams();

  // This method fetches the ratings from the database.
  useEffect(() => {
    async function getRatings() {
      const response = await fetch(
        `http://localhost:5050/rating/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const ratings = await response.json();
      setRatings(ratings);
    }
    getRatings();
    return;
  }, [ratings.length]);

  // This method will delete a rating
  async function deleteRating(id) {
    console.log('hi');
    await fetch(`http://localhost:5050/rating/${id}`, {
      method: 'DELETE',
    });
    const newRatings = ratings.filter((el) => el._id !== id);
    setRatings(newRatings);
  }

  // This method will map out the ratings on the table
  function ratingList() {
    return ratings.map((rating) => {
      return (
        <Rating
          rating={rating}
          deleteRating={() => deleteRating(rating._id)}
          key={rating._id}
        />
      );
    });
  }

  // This following section will display the table with the ratings of individuals.
  return (
    <>
      <table className="w-full caption-bottom text-sm">
        <tbody className="bg-reeses-yellow">
          {ratings.length ? ratingList() : 'No Ratings Yet'}
        </tbody>
      </table>
    </>
  );
}
