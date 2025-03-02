import supabase from "../../utils/db.js";

// Create a new reservation
export async function createReservation(req, res) {
    try {
        const { user_id, table_id, reservation_time } = req.body;

        // Insert reservation into the database
        const { data, error } = await supabase
            .from("reservations")
            .insert([{ user_id, table_id, reservation_time }]);

        if (error) {
            throw error;
        }

        res.status(201).json({ message: "Reservation created successfully", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all reservations
export async function getReservations(req, res) {
    try {
        const { data, error } = await supabase
            .from("reservations")
            .select("*");

        if (error) {
            throw error;
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a reservation
export async function updateReservation(req, res) {
    try {
        const { id } = req.params;
        const { reservation_time } = req.body;

        const { data, error } = await supabase
            .from("reservations")
            .update({ reservation_time })
            .match({ id });

        if (error) {
            throw error;
        }

        res.status(200).json({ message: "Reservation updated successfully", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a reservation
export async function deleteReservation(req, res) {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("reservations")
            .delete()
            .match({ id });

        if (error) {
            throw error;
        }

        res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
