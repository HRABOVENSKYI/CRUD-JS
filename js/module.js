// create database
const productdb = (dbname, table) => {
  const db = new Dexie(dbname);
  db.version(1).stores(table);
  db.open();
  return db;
};

// insert function
const bulkcreate = (dbtable, data) => {
  let flag = empty(data);
  if (flag) {
    dbtable.bulkAdd([data]);
    console.log("Data inserted successfully");
  } else {
    console.log("Please Provide Data");
  }
  return flag;
};

// check textbox validation
const empty = (object) => {
  let flag = false;

  for (const value in object) {
    if (object[value] != "" && object.hasOwnProperty(value)) {
      flag = true;
    } else {
      flag = false;
    }
  }

  return flag;
};

// get data from the DB
const getData = (dbtable, fn) => {
  let index = 0;
  let obj = {};

  dbtable.count((count) => {
    if (count) {
      dbtable.each((table) => {
        obj = sortObj(table);
        fn(obj, index++);
      });
    } else {
      fn(0);
    }
  });
};

// sort object
const sortObj = (sortObj) => {
  return {
    id: sortObj.id,
    name: sortObj.name,
    seller: sortObj.seller,
    price: sortObj.price,
  };
};

// create dynamic elements
const createEle = (tagname, appendTo, fn) => {
  const element = document.createElement(tagname);
  if (appendTo) appendTo.appendChild(element);
  if (fn) fn(element);
};

export default productdb;
export { bulkcreate, getData, createEle };
