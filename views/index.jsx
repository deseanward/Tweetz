"use client";
import React from "react";

const DefaultLayout = require("./layout/default");
// const manyTweets = require('../models/many-tweets')

function Index({ tweets }) {
  return (
    <DefaultLayout>
      <h1 className='font-bold text-3xl text-[#09507C] mb-8'>Tweetz!</h1>
      <nav className='mb-4'>
        <a
          href='/tweets/new'
          className='border-2 rounded-lg p-2 hover:bg-[#09507C] hover:text-gray-300'
        >
          Create New Tweet
        </a>
      </nav>
      <hr />

      <ul>
        {tweets.map((tweet) => {
          return (
            <li key={tweet._id} className='mb-4 border-2 p-2 rounded-lg p-8'>
              <a
                href={`/tweets/${tweet._id}`}
                className='font-bold hover:text-[#09507C]'
              >
                {tweet.title}
              </a>

              <p className='mb-4 text-sm'>
                @{tweet.author.toLowerCase()}
                <br />
                <span className='text-xs'>
                  {tweet.sponsored === true ? "Sponsered" : ""}
                </span>
              </p>

              <p className='mb-8'>{tweet.body}</p>

              <form
                method='post'
                action={`/api/tweets/${tweet._id}?_method=DELETE`}
                className='flex justify-end gap-2'
              >
                <section className='mr-[auto]'>
                  <a
                    href={`/api/tweets/add-like/${tweet._id}`}
                  >
                    👍{" "}
                  </a>
                  {tweet.likes}
                </section>

                <a href={`/tweets/${tweet._id}/edit`}>
                  <input
                    type='button'
                    value='Edit'
                    className='border-2 px-[0.5em] pb-[0.25em] rounded-md cursor-pointer hover:bg-[#09507C] hover:text-gray-300'
                  />
                </a>

                <input
                  type='submit'
                  value='Delete'
                  className='border-2 px-[0.5em] pb-[0.25em] rounded-md cursor-pointer hover:bg-[#09507C] hover:text-gray-300'
                />
              </form>
            </li>
          );
        })}
      </ul>
    </DefaultLayout>
  );
}

module.exports = Index;
