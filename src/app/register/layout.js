import { getServerSession } from "next-auth/next";
import { authoptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default async function RegisterLayout({ children }) {
  const session = await getServerSession(authoptions);
  if (session) {
    redirect("/dashboard");
  } else {
    return <>{children}</>;
  }
}
