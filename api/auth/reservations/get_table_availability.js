import supabase from "../../utils/db.js";

export async function getTableAvailability(req, res) {
  try {
    // Run the SQL query to get table availability per floor
    const { data, error } = await supabase
      .from("tables")
      .select("floor, status");

    if (error) {
      throw error;
    }

    // Process the data to group tables by floor and count availability
    const availability = data.reduce((acc, table) => {
      // Initialize floor if not present
      acc[table.floor] = acc[table.floor] || { total: 0, available: 0, reserved: 0, occupied: 0 };
      
      // Update counts
      acc[table.floor].total++;
      acc[table.floor][table.status]++;
      
      return acc;
    }, {});

    // Convert to array format
    const formattedData = Object.entries(availability).map(([floor, counts]) => ({
      floor: Number(floor),
      ...counts,
    }));

    res.json({ success: true, data: formattedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
