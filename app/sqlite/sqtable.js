import React from "react";
import { Text } from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("silkyMarket.db");

export default class SQLiteScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: [],
      search: "",
    };
  }

  componentDidMount() {
    // create user table if not exist
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists tbl_register (id integer primary key not null, name text, contact text);"
      );
    });

    // check if registered
    const query = "select *from tbl_register";
    const array = [];

    db.transaction((tx) => {
      tx.executeSql(query, array, (tx, results) => {
        this.setState({ todo: results.rows });
        console.log(this.state.todo._array);
      });
    });
  }

  render() {
    return <Text>this is important</Text>;
  }
}
