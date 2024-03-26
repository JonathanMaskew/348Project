import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Record = (props) => (
  <tr className="border-b-8 border-reeses-orange">
    <div className="flex justify-between align-middle py-5 px-4">
      <td className="align-middle">
        <Link to={`/${props.record._id}`}>
          <span className="text-2xl font-bold text-reeses-brown hover:text-reeses-orange">
            {props.record.itemName} →
          </span>
          <br />
          <span className="text-md text-reeses-brown">
            <span className="mr-2 font-bold">{props.record.type}</span>•
            <span className="ml-2">{props.record.description}</span>
          </span>
          <br />
        </Link>
      </td>
      <td className="align-middle">
        <div className="flex gap-2 justify-end">
          <Link
            className="inline-flex items-center text-xl h-9 p-5 bg-reeses-orange text-white hover:opacity-70"
            to={`/rate/${props.record._id}`}
          >
            Rate
          </Link>
          <Link
            className="inline-flex items-center text-xl h-9 p-5 bg-reeses-brown text-white hover:opacity-70"
            to={`/edit/${props.record._id}`}
          >
            Edit
          </Link>
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

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/item/`);
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
    await fetch(`http://localhost:5050/item/${id}`, {
      method: 'DELETE',
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
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
      <div className="mx-3 text-right text-white flex justify-between text-lg font-bold bg-background h-9">
        <p>Click an item to view reviews</p>
        <Link className="hover:opacity-70" to="/create">
          Add Reese's Item...
        </Link>
      </div>
      <table className="w-full caption-bottom text-sm">
        <tbody className="bg-reeses-yellow">{recordList()}</tbody>
      </table>
    </>
  );
}
