import HashtagService from "../services/hashtag-service.js";
const hashtagService = new HashtagService();

export const getHashtag = async (req, res) => {
  try {
    const response = await hashtagService.get(req.params.id);
    console.log(response);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched a tweet from service",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: error,
    });
  }
};
export const getAllHashtags = async (req, res) => {
  try {
    const response = await hashtagService.getAllHashtags();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched a tweet from service",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: error,
    });
  }
};
