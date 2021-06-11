import React from "react";
import { StatusBar, View, Text } from "react-native";
import * as SQLite from "expo-sqlite";
import { Appearance } from "react-native";

const db = SQLite.openDatabase("silkyMarket.db");
export default class Preprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: "",
      details: [],
    };
  }

  componentDidMount() {
    () => {
      db.transaction((tx) => {
        tx.executeSql(
          "create table if not exists tbl_register (id integer primary key not null, name text, contact text);",
          //"drop table if exists tbl_register;",
          [],
          () => console.log("Good"),
          () => console.log("Error")
        );
      });
    };
  }
  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <StatusBar />
        <Text>this is a waiting message</Text>
      </View>
    );
  }
}
