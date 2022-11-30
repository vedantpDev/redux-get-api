const express = require("express");
const conn = require("./db");
const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/post", (req, res, next) => {
  if (!req.body) return next(new Error("Please Provide Data"));
  let q = `insert into user (name, email, phone) values( '${req.body.name}','${req.body.email}',${req.body.phone})`;
  conn.query(q, (err, data) => {
    if (err) return next(new Error(err));
    res.status(200).send({
      data: data,
    });
  });
});

app.get("/get", (req, res, next) => {
  let q = `select * from user`;
  conn.query(q, (err, data) => {
    if (err) return next(new Error(err));
    res.status(200).send({
      // totalRecords: data.length,
      data: data,
    });
  });
});

app.delete("/delete/:id", (req, res, next) => {
  if (!req.params) return next(new Error("Please Provide ID"));
  let q = `delete from user where id = ${req.params.id}`;
  conn.query(q, (err, data) => {
    if (err) return next(new Error(err));
    res.status(200).send({
      message: "Data Deleted",
    });
  });
});

app.put("/update/:id", (req, res, next) => {
  if (!req.body) return next(new Error("Please Provide Data"));
  let q = `update user set name='${req.body.name}',email='${req.body.email}',phone=${req.body.phone} where id = ${req.params.id}`;
  conn.query(q, (err, data) => {
    if (err) return next(new Error(err));
    res.status(200).send({
      message: "Data is Updated",
    });
  });
});

app.post("/search", (req, res, next) => {
  if (!req.body) return next(new Error("Please Provide Data"));
  let q = `select * from user where name like '${req.body.search}%' or email like '${req.body.search}%'`;
  conn.query(q, (err, data) => {
    if (err) return next(new Error(err));
    res.status(200).send({
      data: data,
    });
  });
});

app.listen(port, () => console.log("App running on", port));
