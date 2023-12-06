
import database from "../config/dbConfig.js";

export const addData=(req, res) => {
    const { name, uniq_id, age, education, job_profile, years_of_experience, location_worked, companies_worked, technologies_worked } = req.body;

    // Insert data into Table1
    const queryTable1 = `INSERT INTO Table1 (name, uniq_id, age, education, job_profile) VALUES (?, ?, ?, ?, ?)`;
    database.query(queryTable1, [name, uniq_id, age, education, job_profile], (errTable1, resultTable1) => {
        if (errTable1) {
            console.error('Error inserting data into Table1: ', errTable1);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Insert data into Table2
        const queryTable2 = `INSERT INTO Table2 (uniq_id, years_of_experience, location_worked, companies_worked, technologies_worked) VALUES (?, ?, ?, ?, ?)`;
        database.query(queryTable2, [uniq_id, years_of_experience, location_worked, companies_worked, technologies_worked], (errTable2, resultTable2) => {
            if (errTable2) {
                console.error('Error inserting data into Table2: ', errTable2);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ message: 'Data inserted successfully' });
        });
    });
}

export const deleteData=(req, res) => {
    const uniq_id = req.params.uniq_id;

    // Delete from Table1
    const queryDeleteTable1 = `DELETE FROM Table1 WHERE uniq_id = ?`;
    database.query(queryDeleteTable1, [uniq_id], (errDeleteTable1, resultDeleteTable1) => {
        if (errDeleteTable1) {
            console.error('Error deleting data from Table1: ', errDeleteTable1);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Delete from Table2
        const queryDeleteTable2 = `DELETE FROM Table2 WHERE uniq_id = ?`;
        database.query(queryDeleteTable2, [uniq_id], (errDeleteTable2, resultDeleteTable2) => {
            if (errDeleteTable2) {
                console.error('Error deleting data from Table2: ', errDeleteTable2);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ message: 'Data deleted successfully' });
        });
    });
}

export const updateData=(req, res) => {
    const uniq_id = req.params.uniq_id;
    const { name, age, education, job_profile, years_of_experience, location_worked, companies_worked, technologies_worked } = req.body;

    // Update Table1
    const queryUpdateTable1 = `UPDATE Table1 SET name=?, age=?, education=?, job_profile=? WHERE uniq_id=?`;
    database.query(queryUpdateTable1, [name, age, education, job_profile, uniq_id], (errUpdateTable1, resultUpdateTable1) => {
        if (errUpdateTable1) {
            console.error('Error updating data in Table1: ', errUpdateTable1);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Update Table2
        const queryUpdateTable2 = `UPDATE Table2 SET years_of_experience=?, location_worked=?, companies_worked=?, technologies_worked=? WHERE uniq_id=?`;
        database.query(queryUpdateTable2, [years_of_experience, location_worked, companies_worked, technologies_worked, uniq_id], (errUpdateTable2, resultUpdateTable2) => {
            if (errUpdateTable2) {
                console.error('Error updating data in Table2: ', errUpdateTable2);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ message: 'Data updated successfully' });
        });
    });
}

export const getAllData=(req, res) => {
    // Fetch all data from both Table1 and Table2
    const queryFetchAllData = `
        SELECT
            Table1.id AS id_table1,
            Table1.name,
            Table1.uniq_id,
            Table1.age,
            Table1.education,
            Table1.job_profile,
            Table2.id AS id_table2,
            Table2.years_of_experience,
            Table2.location_worked,
            Table2.companies_worked,
            Table2.technologies_worked
        FROM
            Table1
        LEFT JOIN
            Table2 ON Table1.uniq_id = Table2.uniq_id
    `;

    database.query(queryFetchAllData, (errFetchAllData, resultFetchAllData) => {
        if (errFetchAllData) {
            console.error('Error fetching all data: ', errFetchAllData);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ data: resultFetchAllData });
    });
}

