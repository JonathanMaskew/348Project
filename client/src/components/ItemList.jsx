import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => (
  <tr className="border-b-8 border-reeses-orange">
    <div className="flex justify-between align-middle py-5 px-4">
      <td className="align-middle">
        <Link to={`/${props.item._id}`}>
          <span className="text-2xl font-bold text-reeses-brown hover:text-reeses-orange">
            {props.item.itemName} →
          </span>
          <br />
          <span className="text-md text-reeses-brown">
            <span className="mr-2 font-bold">{props.item.type}</span>•
            <span className="ml-2">{props.item.description}</span>
          </span>
          <br />
        </Link>
      </td>
      <td className="align-middle">
        <div className="flex gap-2 justify-end">
          <Link
            className="inline-flex items-center text-xl h-9 p-5 bg-reeses-orange text-white hover:opacity-70"
            to={`/rate/${props.item._id}`}
          >
            Rate
          </Link>
          <Link
            className="inline-flex items-center text-xl h-9 p-5 bg-reeses-brown text-white hover:opacity-70"
            to={`/edit/${props.item._id}`}
          >
            Edit
          </Link>
          <button
            className="inline-flex items-center text-xl h-9 p-5 bg-reeses-brown text-white hover:opacity-70"
            type="button"
            onClick={() => {
              props.deleteItem(props.item._id);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </div>
  </tr>
);

export default function ItemList() {
  const [items, setItems] = useState([]);

  // This method fetches the items from the database.
  useEffect(() => {
    async function getItems() {
      const response = await fetch(`http://localhost:5050/item/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const items = await response.json();
      setItems(items);
    }
    getItems();
    return;
  }, [items.length]);

  // This method will delete an item
  async function deleteItem(id) {
    await fetch(`http://localhost:5050/item/${id}`, {
      method: 'DELETE',
    });
    const newItems = items.filter((el) => el._id !== id);
    setItems(newItems);
  }

  // This method will map out the items on the table
  function itemList() {
    return items.map((item) => {
      return (
        <Item
          item={item}
          deleteItem={() => deleteItem(item._id)}
          key={item._id}
        />
      );
    });
  }

  // This following section will display the table of items
  return (
    <>
      <div className="mx-3 text-right text-white flex justify-between text-lg font-bold bg-background h-9">
        <p>Click an item to view reviews</p>
        <Link className="hover:opacity-70" to="/create">
          Add Reese's Item...
        </Link>
      </div>
      <table className="w-full caption-bottom text-sm">
        <tbody className="bg-reeses-yellow">{itemList()}</tbody>
      </table>
    </>
  );
}
