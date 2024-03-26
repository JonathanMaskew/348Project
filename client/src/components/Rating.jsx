import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Rating() {
  const [form, setForm] = useState({
    rating: '',
    review: '',
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      const response = await fetch(
        `http://localhost:5050/rating/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate('/');
        return;
      }
      setForm(record);
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
      response = await fetch(`http://localhost:5050/rating/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
    } finally {
      setForm({ rating: '', review: '' });
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
          <h1 className="font-bold text-2xl text-white">Leave a Review...</h1>
          <p className="mt-1 text-md text-white">
            Let others know what you think about this item so they always know
            what Reese's item is the best to snatch.
          </p>
        </div>

        <div className="w-full">
          <fieldset className="mt-4">
            <label
              htmlFor="rating"
              className="text-sm font-medium leading-6 text-white"
            >
              Rating
            </label>
            <div className="flex items-center border-4 border-reeses-yellow bg-white py-1.5 text-slate-900 w-full">
              <input
                id="1"
                name="rating"
                type="radio"
                value="1"
                className="h-4 w-4 cursor-pointer"
                checked={form.rating === '1'}
                onChange={(e) => updateForm({ rating: e.target.value })}
              />
              <label htmlFor="1" className="ml-2 text-sm text-slate-900 mr-4">
                1
              </label>
              <input
                id="2"
                name="rating"
                type="radio"
                value="2"
                className="h-4 w-4 cursor-pointer"
                checked={form.rating === '2'}
                onChange={(e) => updateForm({ rating: e.target.value })}
              />
              <label htmlFor="2" className="ml-2 text-sm text-slate-900 mr-4">
                2
              </label>
              <input
                id="3"
                name="rating"
                type="radio"
                value="3"
                className="h-4 w-4 cursor-pointer"
                checked={form.rating === '3'}
                onChange={(e) => updateForm({ rating: e.target.value })}
              />
              <label htmlFor="3" className="ml-2 text-sm text-slate-900 mr-4">
                3
              </label>
              <input
                id="4"
                name="rating"
                type="radio"
                value="4"
                className="h-4 w-4 cursor-pointer"
                checked={form.rating === '4'}
                onChange={(e) => updateForm({ rating: e.target.value })}
              />
              <label htmlFor="4" className="ml-2 text-sm text-slate-900 mr-4">
                4
              </label>
              <input
                id="5"
                name="rating"
                type="radio"
                value="5"
                className="h-4 w-4 cursor-pointer"
                checked={form.rating === '5'}
                onChange={(e) => updateForm({ rating: e.target.value })}
              />
              <label htmlFor="5" className="ml-2 text-sm text-slate-900 mr-4">
                5
              </label>
            </div>
          </fieldset>
        </div>
        <div className="w-full">
          <label htmlFor="itemName" className="text-sm font-medium text-white">
            Review
          </label>
          <input
            type="text"
            name="review"
            id="review"
            className="border-4 border-reeses-yellow bg-white py-1.5 pl-1 text-slate-900 w-full"
            value={form.review}
            onChange={(e) => updateForm({ review: e.target.value })}
          />
        </div>
        <input
          type="submit"
          value="Save Rating"
          className="text-md font-medium bg-reeses-yellow h-9 px-3 cursor-pointer w-full mt-4 hover:opacity-70"
        />
      </form>
    </>
  );
}
