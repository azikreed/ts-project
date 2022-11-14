import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(201));

  // register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  //login user
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  //get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  //Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);
}
