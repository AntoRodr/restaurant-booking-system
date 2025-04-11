const db = require('../db');

exports.getProfile = async (req, res) => {
  const { id: user_id } = req.user;

  try {
    const result = await db.query(
      'SELECT full_name, date_of_birth, mobile_number FROM profiles WHERE id = $1',
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

exports.updateProfile = async (req, res) => {
  const { id: user_id } = req.user;
  const { full_name, date_of_birth, mobile_number } = req.body;

  try {
    const result = await db.query(
      `UPDATE profiles 
       SET full_name = $1, date_of_birth = $2, mobile_number = $3
       WHERE id = $4
       RETURNING full_name, date_of_birth, mobile_number`,
      [full_name, date_of_birth, mobile_number, user_id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
