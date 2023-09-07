const React = require("react");

const DefaultLayout = require("./layout/default");

function Show({ tweet }) {
  return (
    <DefaultLayout>
    <h className='font-bold text-3xl text-[#09507C]'>@{tweet.author}</h>
      <div className='w-[750px] mb-4 border-2 p-2 rounded-lg'>
        <p className='font-bold'>{tweet.title}</p>
        <p className='mb-4 text-sm'>
                @{tweet.author}
                <br />
                <span className='text-xs'>
                  {tweet.sponsored === true ? "Sponsered" : ""}
                </span>
              </p>
        <p className='text-xs'>
          {new Date(tweet.createdAt).toLocaleDateString()}
        </p>
        <p className='mb-8'>{tweet.body}</p>

        <a href='/tweets'>
          <input
            type='button'
            value='Back'
            className='border-2 px-[0.5em] pb-[0.25em] rounded-md cursor-pointer hover:bg-[#09507C] hover:text-gray-300'
          />
        </a>
      </div>
    </DefaultLayout>
  );
}

module.exports = Show;
