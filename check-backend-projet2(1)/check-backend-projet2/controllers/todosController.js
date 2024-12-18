const { StatusCodes } = require('http-status-codes');
const connection = require('../db/connection');

// Get all todos
const getTodos = (req, res) => {
    const { userID } = req.user;
    const { cat } = req.query;
    console.log({ cat })

    const query = `
        SELECT 
            *
        FROM 
            tasks
        WHERE 
            tasks.user_id = ${userID} and tasks.category = "${cat ? cat : ""}"
            ORDER BY 
            tasks.created_at;

    `;

    connection.all(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Add a new todo
const addTodo = (req, res) => {
    const { title, category, priority, status } = req.body;
    console.log(req.body)
    const { userID: user_id } = req.user;
    console.log("data", user_id, title);
    if (!user_id || !title) {
        res.status(500).send("user_id and title are required");
    }
    // Your SQLite connection module

    connection.serialize(() => {
        // Step 1: Insert a new task
        connection.run(
            `INSERT INTO tasks (task_name, user_id, priority, category, status) VALUES (?, ?, ?, ?, ?)`,
            [title, user_id, priority, category, status],
            function (err) {
                if (err) {
                    console.error('Error inserting task:', err.message);
                    return res.status(500).json({ error: err.message });
                }

                const lastInsertedId = this.lastID; // SQLite provides the ID of the last inserted row

                // Step 2: Retrieve the newly inserted task
                connection.get(
                    `SELECT * FROM tasks WHERE id = ? AND user_id = ?`,
                    [lastInsertedId, user_id],
                    (err, task) => {
                        if (err) {
                            console.error('Error fetching task:', err.message);
                            return res.status(500).json({ error: err.message });
                        }

                        // Respond with the created task
                        res.status(201).json({ success: true, data: [task] });
                    }
                );
            }
        );
    });

};

// Update a todo
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { userID } = req.user;
    const { title, category, priority, status } = req.body;

    // Start by executing the UPDATE query
    connection.run(
        `UPDATE tasks
         SET task_name = ?, category = ?, priority = ?, status = ?
         WHERE id = ? AND user_id = ?`,
        [title, category || null, priority || null, status || null, id, userID],
        function (err) {
            if (err) {
                console.error('Error updating task:', err.message);
                return res.status(500).json({ error: err.message });
            }

            // Check if any rows were updated
            if (this.changes === 0) {
                return res.status(404).json({ message: "Task not found" });
            }

            // After update, fetch the updated task
            connection.get(
                `SELECT * FROM tasks WHERE id = ? AND user_id = ?`,
                [id, userID],
                (err, task) => {
                    if (err) {
                        console.error('Error fetching task:', err.message);
                        return res.status(500).json({ error: err.message });
                    }

                    // Respond with the updated task
                    res.status(200).json({
                        success: true,
                        message: "Task updated successfully",
                        data: [task],
                    });
                }
            );
        }
    );
};

// Delete a todo
const deleteTodo = (req, res) => {
    const { userID } = req.user;
    const { id } = req.params;
    connection.all('DELETE FROM tasks WHERE id = ? and user_id = ?', [id, userID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Todo deleted' });
    });
};

const setTodoTerminate = async (req, res) => {
    const { userID } = req.user;
    const { id } = req.params;
    console.log(id);
    connection.all('UPDATE tasks SET status = "Terminé" WHERE id = ? and user_id = ?', [id, userID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        console.log({ results });
        res.json({ message: 'Todo updated' });
    });
}

const getStatistics = async (req, res) => {
    const { userID } = req.user;
    const query = `
   SELECT
    category,
    COUNT(CASE WHEN status = 'Terminé' THEN 1 END) AS réalisés,
    COUNT(CASE WHEN status != 'Terminé' THEN 1 END) AS nonRéalisés
FROM tasks where user_id=${userID}
GROUP BY category;
  `;
    connection.all(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching statistics' });
        }

        // Format the response into the required structure
        const statistics = results.reduce((acc, row) => {
            acc[row.category] = {
                réalisés: row.réalisés,
                nonRéalisés: row.nonRéalisés,
            };
            return acc;
        }, {});

        res.json(statistics);
    });
}

module.exports = { getStatistics, setTodoTerminate, getTodos, addTodo, updateTodo, deleteTodo };
