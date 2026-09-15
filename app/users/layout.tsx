import getUsers from "../actions/getUsers";
import SideBar from "../components/sidebar/SideBar";
import UsersList from "../components/UsersList";

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();
  return (
    <SideBar>
      <div className="h-full">
        <UsersList items = {users}/>
        {children}
      </div>
    </SideBar>
  );
};

export default UsersLayout;
