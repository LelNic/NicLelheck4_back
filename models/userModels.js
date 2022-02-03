import dbConnect from "../config/db-config.js";

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM user", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM user WHERE email = ?", email, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM user WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// CREATE
const createNew = (user) => {
  const { pseudo, email, password, birthdate } = user;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "INSERT INTO user (pseudo, email, password, birthdate) VALUES (?, ?, ?, ?)",
      [pseudo, email, password, birthdate],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

// DELETE
const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("DELETE FROM user WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

// UPDATE
const updateUser = (user) => {
  const { pseudo, email, password, birthdate, id } = user;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "UPDATE user SET pseudo = ?, email = ?, password, birthdate = ? WHERE id = ?",
      [pseudo, email, password, birthdate, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export default { findByEmail, createNew, findById, deleteById, updateUser, getAll };
