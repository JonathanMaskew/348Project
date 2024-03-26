import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Item() {
  const [form, setForm] = useState({
    itemName: '',
    type: 'Classic Cup',
    description: '',
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/item/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const item = await response.json();
      if (!item) {
        console.warn(`Item with id ${id} not found`);
        navigate('/');
        return;
      }
      setForm(item);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const item = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new item we will POST to /item.
        response = await fetch('http://localhost:5050/item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });
      } else {
        // if we are updating a item we will PATCH to /item/:id.
        response = await fetch(`http://localhost:5050/item/${params.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred adding or updating a item: ', error);
    } finally {
      setForm({ itemName: '', type: '', description: '' });
      navigate('/');
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 items-center p-4 justify-around mx-32"
      >
        <div className="text-center">
          <h1 className="font-bold text-2xl text-white">
            Add a new Reese's Item...
          </h1>
          <p className="mt-1 text-md text-white">
            Once the item is added, you will be able to rate it just like any
            other item.
          </p>
        </div>

        <div className="w-full">
          <label htmlFor="itemName" className="text-sm font-medium text-white">
            Item Name
          </label>
          <input
            type="text"
            name="itemName"
            id="itemName"
            className="border-4 border-reeses-yellow bg-white py-1.5 text-slate-900 w-full"
            value={form.itemName}
            onChange={(e) => updateForm({ itemName: e.target.value })}
          />
        </div>

        <div className="w-full">
          <label htmlFor="type" className="text-sm font-medium text-white">
            Type
          </label>

          <select
            name="type"
            id="type"
            className="border-4 border-reeses-yellow bg-white py-1.5 pl-1 text-slate-900 w-full"
            value={form.type}
            onChange={(e) => updateForm({ type: e.target.value })}
          >
            <option>Classic Cup</option>
            <option>Bar</option>
            <option>Snack</option>
            <option>Big Cup</option>
            <option>Holiday Shape</option>
          </select>
        </div>

        <div className="w-full">
          <label
            htmlFor="description"
            className="text-sm font-medium text-white"
          >
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            className="border-4 border-reeses-yellow bg-white py-1.5 pl-1 text-slate-900 w-full"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>

        <input
          type="submit"
          value="Save Reese's Item"
          className="text-md font-medium bg-reeses-yellow h-9 px-3 cursor-pointer w-full mt-4 hover:opacity-70"
        />
      </form>
    </>
  );
}
