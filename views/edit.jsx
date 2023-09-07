const React = require("react");
const DefaultLayout = require("./layout/default");

const Edit = ({ tweet }) => {
  return (
    <DefaultLayout>
      <form
        className='w-[600px] flex flex-col gap-y-4 border-2 p-4'
        action={`/api/tweets/${tweet._id}?_method=PUT`}
        method='post'
      >
        <h1 className='font-bold text-3xl'>Edit Tweet</h1>
        <section className='flex flex-col'>
          <label aria-label='title'>Title: </label>
          <input
            name='title'
            type='text'
            required
            defaultValue={tweet.title}
            className='border-2 rounded-md p-2'
          />
        </section>

        <section className='flex flex-col'>
          <label>Message: </label>
          <textarea
            name='body'
            rows={5}
            required
            defaultValue={tweet.body}
            className='border-2 rounded-md p-2'
          ></textarea>
        </section>

        <section className='flex'>
          <label>Sponsored: </label>
          <input
            name='sponsored'
            type='checkbox'
            defaultChecked={tweet.sponsored}
            className='border-2 rounded-md p-2 ml-2'
          />
        </section>

        <section>
          <input
            type='submit'
            value='Update'
            className='border-2 rounded-md p-2 cursor-pointer hover:bg-[#09507C] hover:text-gray-300 mr-2'
          />

          <a href='/tweets'>
            <input
              type='button'
              value='Back'
              className='border-2 rounded-md p-2 cursor-pointer hover:bg-[#09507C] hover:text-gray-300'
            />
          </a>
        </section>
      </form>
    </DefaultLayout>
  );
};

module.exports = Edit;
