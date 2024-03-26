import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Rating = (props) => (
  <tr className="border-b-8 border-reeses-orange">
    <div className="flex justify-between align-middle py-5 px-4">
      <td className="align-middle">
        <span className="text-2xl font-bold text-reeses-brown hover:text-reeses-orange">
          {props.record.rating} / 5
        </span>
        <br />
        <span>{props.record.review}</span>
        <br />
      </td>
      <td className="align-middle">
        <div className="flex gap-2 justify-end">
          <button
            className="inline-flex items-center text-xl h-9 p-5 bg-reeses-brown text-white hover:opacity-70"
            type="button"
            onClick={() => {
              props.deleteRecord(props.record._id);
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
  const [records, setRecords] = useState([]);
  const params = useParams();

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `http://localhost:5050/rating/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/rating/${id}`, {
      method: 'DELETE',
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function ratingList() {
    return records.map((record) => {
      return (
        <Rating
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      <table className="w-full caption-bottom text-sm">
        <tbody className="bg-reeses-yellow">
          {records.length ? ratingList() : 'No Ratings Yet'}
        </tbody>
      </table>
    </>
  );
}
