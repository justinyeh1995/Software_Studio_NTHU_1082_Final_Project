import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  cardContainer: {
    flexDirection: "row",
  },
  cardDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    paddingRight: 5,
    // justifyContent: "flex-start",
    // alignItems: "center",
    alignSelf: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    width: "80%",
    // justifyContent: "center",
    // alignItems: "center",
    // alignSelf: "center",
    lineHeight: 25,
    letterSpacing: 0.1,
  },
  detailTitle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  detailBox: {
    padding: 15,
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
  },
});
