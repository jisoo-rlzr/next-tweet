import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "loginsession",
  password: "Zac#oc}o:~~]Kms9hv*aecayoW_-kREnXUi?%)"
};

export function withSession(handler: any) {
  return withIronSessionApiRoute(handler, cookieOptions);
}
