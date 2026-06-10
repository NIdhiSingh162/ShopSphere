const db = require("../config/db");

const getAdminStats = (req, res) => {
  const stats = {};

  db.query(
    "SELECT COUNT(*) AS totalProducts FROM products",
    (err, productResult) => {
      if (err) return res.status(500).json({ message: err.message });

      stats.totalProducts = productResult[0].totalProducts;

      db.query(
        "SELECT COUNT(*) AS totalOrders FROM orders",
        (err, orderResult) => {
          if (err) return res.status(500).json({ message: err.message });

          stats.totalOrders = orderResult[0].totalOrders;

          db.query(
            "SELECT COUNT(*) AS totalUsers FROM users",
            (err, userResult) => {
              if (err)
                return res.status(500).json({ message: err.message });

              stats.totalUsers = userResult[0].totalUsers;

              db.query(
                "SELECT IFNULL(SUM(total_amount),0) AS totalRevenue FROM orders",
                (err, revenueResult) => {
                  if (err)
                    return res.status(500).json({ message: err.message });

                  stats.totalRevenue =
                    revenueResult[0].totalRevenue;

                  res.status(200).json(stats);
                }
              );
            }
          );
        }
      );
    }
  );
};

module.exports = { getAdminStats };