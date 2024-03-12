import { getServerSession } from "next-auth/next";
import { authoptions } from "../api/auth/[...nextauth]/route";

const DashboardPage = async () => {
  const session = await getServerSession(authoptions);
  console.log(session);
  return <div>DashboardPage</div>;
};

export default DashboardPage;
