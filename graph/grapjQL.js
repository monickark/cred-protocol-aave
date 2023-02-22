import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const data = {
  warriors: [
    { id: "001", name: "Jaime" },
    { id: "002", name: "Jorah" },
  ],
};
