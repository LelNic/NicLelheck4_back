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
  const { firstname, lastname, email, password, bithdate } = user;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "INSERT INTO user (firstname, lastname, email, password, bithdate) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, password, bithdate],
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
  const { firstname, lastname, email, password, bithdate, id } = user;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "UPDATE user SET firstname = ?, lastname = ?, email = ?, password, birthdate = ? WHERE id = ?",
      [firstname, lastname, email, password, bithdate, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export default { findByEmail, createNew, findById, deleteById, updateUser, getAll };
