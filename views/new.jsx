const React = require("react");
const DefaultLayout = require("./layout/default");

const New = () => {
  return (
    <DefaultLayout>
      <form
        className='w-[600px] flex flex-col gap-y-4 border-2 p-4'
        action='/api/tweets'
        method='post'
      >
        <h1 className='font-bold text-3xl'>Create Tweet</h1>
        <section className='flex flex-col'>
          <label aria-label='title'>Title: </label>
          <input
            name='title'
            type='text'
            required
            className='border-2 rounded-md p-2'
          />
        </section>

        <section className='flex flex-col'>
          <label>Author: </label>
          <input
            name='author'
            type='text'
            required
            className='border-2 rounded-md p-2'
          />
        </section>

        <section className='flex flex-col'>
          <label>Message: </label>
          <textarea
            name='body'
            rows={5}
            required
            className='border-2 rounded-md p-2'
          ></textarea>
        </section>

        <section>
          <input
            type='submit'
            value='Post'
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

module.exports = New;
