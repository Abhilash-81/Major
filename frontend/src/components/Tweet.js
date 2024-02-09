import React, { useState } from "react";

const TweetForm = () => {
  const [tweetText, setTweetText] = useState("");

  const handleInputChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleTweetSubmit = (event) => {
    event.preventDefault();
    // Here you can implement logic to submit the tweet, e.g., send it to an API
    console.log("Tweet Submitted:", tweetText);
    // Clear the input field after submission
    setTweetText("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 py-6">
      <h2 className="text-xl font-bold mb-4">Compose a Tweet</h2>
      <form onSubmit={handleTweetSubmit}>
        <textarea
          className="w-full h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Create a Tweet with some communities starting with #"
          value={tweetText}
          onChange={handleInputChange}
          maxLength={500}
          required
        ></textarea>
        <div className="flex justify-end mt-4">
          <span className="text-gray-500 text-sm">{tweetText.length}/500</span>
          <button
            type="submit"
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default TweetForm;
