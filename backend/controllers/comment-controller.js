import CommentService from "../services/comment-service.js";

const commentService = new CommentService();

export const createComment = async (req, res) => {
  try {
    const response = await commentService.create(
      req.query.modelId,
      req.query.modelType,
      req.body.userId,
      req.body.content
    );
    return res.status(201).json({
      success: true,
      message: "Successfully created a new comment",
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

export const getComment = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await commentService.get(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
        data: {},
        err: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully retrieved the comment",
      data: comment,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      err: error,
    });
  }
};
