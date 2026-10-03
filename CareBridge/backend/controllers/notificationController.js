const Notification = require(
  "../models/Notification"
);

const getMyNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };
  const markAsRead = async (
  req,
  res
) => {
  try {
    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          isRead: true,
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      notification,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyNotifications,
  markAsRead,
};