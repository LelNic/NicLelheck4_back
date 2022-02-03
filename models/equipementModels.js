import dbConnect from "../config/db-config.js";

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM equipement", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// READ ONE
const getOneById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM equipement WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// DELETE
const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("DELETE FROM equipement WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

// CREATE
const createNew = (equipement) => {
  const { name } = equipement;
  return new Promise((resolve, reject) => {
    dbConnect.query("INSERT INTO equipement (title) VALUES (?)", name, (err, result) => {
      if (err) reject(err);
      else resolve(result.insertId);
    });
  });
};

// UPDATE
const updateEquipement = (equipement) => {
  const { name, id } = equipement;
  return new Promise((resolve, reject) => {
    dbConnect.query("UPDATE equipement SET name = ? WHERE id = ?", [name, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export default { getAll, getOneById, deleteById, createNew, updateEquipement };
