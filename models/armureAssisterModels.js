import dbConnect from "../config/db-config.js";

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM armureAssister", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// READ ONE
const getOneById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM armureAssister WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// DELETE
const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("DELETE FROM armureAssister WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

// CREATE
const createNew = (armureAssister) => {
  const { name } = armureAssister;
  return new Promise((resolve, reject) => {
    dbConnect.query("INSERT INTO armureAssister (name) VALUES (?)", name, (err, result) => {
      if (err) reject(err);
      else resolve(result.insertId);
    });
  });
};

// UPDATE
const updateArmureAssister = (armureAssister) => {
  const { name, id } = armureAssister;
  return new Promise((resolve, reject) => {
    dbConnect.query("UPDATE armureAssister SET name = ? WHERE id = ?", [name, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export default { getAll, getOneById, deleteById, createNew, updateArmureAssister };
