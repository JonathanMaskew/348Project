import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const [average, setAverage] = useState();

  useEffect(() => {
    async function getAverage(id) {
      const response = await fetch(`http://localhost:5050/rating/avg/${id}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const result = await response.json();
      setAverage(result[0]?.average);
    }

    getAverage(props.item._id);
    return;
  }, [props.item]);

  return (
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
              <span className="ml-2 mr-2 font-bold">
                {average ? Math.round(average * 10) / 10 : '-'} / 5
              </span>
              •<span className="ml-2">{props.item.description}</span>
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
};

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    rating: 'All items',
  });

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
  }, []);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const item = { ...form };
    console.log(item.rating);
    if (parseInt(item.rating)) {
      const response = await fetch(
        `http://localhost:5050/rating/filter/${item.rating}`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const result = await response.json();
      getFilteredItems(result);
    } else {
      const response = await fetch(`http://localhost:5050/item/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const result = await response.json();
      getFilteredItems(result);
    }
  }

  async function getFilteredItems(result) {
    const promises = result.map(async (item) => {
      const response = await fetch(`http://localhost:5050/item/${item._id}`);
      console.log(response);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
      } else {
        const newItem = await response.json();
        return newItem;
      }
    });
    const newItems = await Promise.all(promises);
    const filteredItems = newItems.filter((item) => item !== undefined);
    setItems(filteredItems);
  }

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
      <div className="mx-3 text-right flex justify-between text-lg font-bold bg-background mb-2 flex-wrap items-center">
        {/* <p className="text-white">Click an item to view reviews.</p> */}

        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="rating" className="text-white mr-4">
              Filter by items with an average rating greater than or equal to:
            </label>

            <select
              name="rating"
              id="rating"
              className="border-4 border-reeses-yellow bg-white pl-1 text-slate-900 w-30 mr-4"
              value={form.rating}
              onChange={(e) => updateForm({ rating: e.target.value })}
            >
              <option>All Items</option>
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>

            <input
              type="submit"
              value="Filter"
              className="text-reeses-yellow hover:opacity-70 cursor-pointer"
            />
          </div>
        </form>

        <Link className="text-reeses-yellow hover:opacity-70" to="/create">
          Add Reese's Item...
        </Link>
      </div>
      <table className="w-full caption-bottom text-sm">
        <tbody className="bg-reeses-yellow">{itemList()}</tbody>
      </table>
    </>
  );
}
