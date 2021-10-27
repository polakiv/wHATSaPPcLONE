import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";
//importing firebase
import db from "../firebase";
import { auth, storage, firebase } from "../firebase";
//importing components
import UserAvatar from "./UserAvatar";
import NewChat from "./NewChat";
import YourRole from "./YourRole";
import Status from "./Status";
import DropdownMenu from "../shared/DropdownMenu";
import DrawerLeft from "./DrawerLeft";
import SearchBar from "../shared/SearchBar";
import SidebarChat from "./SidebarChat";
import { toastInfo } from "../shared/toastInfo";
import TooltipCustom from "../shared/TooltipCustom";
//importing material-ui
import CircularProgress from "@material-ui/core/CircularProgress";
import MoreVertIcon from "@material-ui/icons/MoreVert";
//importing styles
import "./Sidebar.css";

function SidebarUser({ users, setIsUserExist, isUserExist }) {
  const history = useHistory();
  const { userId } = useParams();
  const [{ user }] = useStateValue();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [noUsers, setNoUsers] = useState(false);
  const [drawerLeft, setDrawerLeft] = useState(false);
  const [menuSidebar, setMenuSidebar] = useState(null);
  const [isSearchFound, setIsSetSearchFound] = useState(false);

  const findUser = function (myUsers) {
    return function (x) {
      var searchUser = x.data.name + "";
      return (
        searchUser.toLowerCase().includes(myUsers.toLowerCase()) || !myUsers
      );
    };
  };

  useEffect(() => {
    const userResult = () => {
      return (
        <>
          {users.filter(findUser(search)).map((user) => (
            <p key={user.id}>{user.name} user.name</p>
          ))}
        </>
      );
    };

    if (search) {
      var result = userResult();
      // console.log("result", result)
      if (result.props.children.length > 0) {
        setIsSetSearchFound(true);
        // console.log("search sucess");
      } else {
        setIsSetSearchFound(false);
        // console.log("search fail");
      }
    }

    //checks if user exists, else will be redirect to landing screen
    var userList = users;
    if (userList) {
      //checks if the current route(userId) exists in userList(array)
      const index = userList.findIndex(function (id, index) {
        return id.id === userId;
      });

      if (index >= 0) {
        setIsUserExist(index);
        // console.log("ROOM EXISTS");
      } else if (index === -1) {
        setIsUserExist(index);
        history.push("/");
        // console.log("ROOM DOES NOT EXIST");
      }
    }
  }, [search, users, userId, history, setIsUserExist]);

  useEffect(() => {
    if (users) {
      if (users.length > 0) {
        setNoUsers(false);
        setLoading(true);
      } else if (users.length === 0 && isUserExist === -1) {
        setNoUsers(true);
        setLoading(true);
      }
    }
  }, [users]);

  // console.log("ROOMS> >", noUsers);
  // console.log("ROOMS EXIST> >", isUserExist);

  const handleDrawerLeftOpen = () => {
    setMenuSidebar(null);
    setDrawerLeft(true);
  };

  const handleMenuOpen = (event) => {
    setMenuSidebar(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuSidebar(null);
  };

  const archive = () => {
    const archive = "archive";
    toastInfo("Archive is not yet available!", archive, "top-center");
  };

  const starred = () => {
    const starred = "starred";
    toastInfo("Starred is not yet available!", starred, "top-center");
  };

  const settings = () => {
    const settings = "settings";
    toastInfo("Settings is not yet available!", settings, "top-center");
  };

  const logout = () => {
    if (user.isAnonymous === true) {
      auth.currentUser
        .delete()
        .then(function () {
          history.push("/");
          localStorage.removeItem("role");
        })
        .catch(function (error) {
          // An error happened.
          console.log("error deleting anonymous user", error);
        });
    } else {
      auth.signOut();
    }
  };

  const menuLists = [
    {
      title: "Profile",
      onClick: () => handleDrawerLeftOpen(),
      id: Math.random() * 100000,
    },
    {
      title: "Archived",
      onClick: () => archive(),
      id: Math.random() * 100000,
    },
    {
      title: "Starred",
      onClick: () => starred(),
      id: Math.random() * 100000,
    },
    {
      title: "Settings",
      onClick: () => settings(),
      id: Math.random() * 100000,
    },
    {
      title: "Logout",
      onClick: () => logout(),
      id: Math.random() * 100000,
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <UserAvatar
          id="UserProfile"
          photoURL={user.photoURL}
          onClick={() => handleDrawerLeftOpen()}
        />
        <DrawerLeft
          drawerLeft={drawerLeft}
          setDrawerLeft={setDrawerLeft}
          db={db}
          auth={auth}
          storage={storage}
        />

        <div className="sidebar__headerRight">
          <Status />
          <NewChat db={db} user={user} firebase={firebase} /> 
          <YourRole db={db} user={user} firebase={firebase} />
          <TooltipCustom
            name="Menu"
            icon={<MoreVertIcon />}
            onClick={handleMenuOpen}
          />
          <DropdownMenu
            menuLists={menuLists}
            menu={menuSidebar}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
          />
        </div>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Поиск чата"
      />

      <div className="sidebar__chats">
        {loading ? (
          <>
            {search ? (
              <>
                {isSearchFound ? (
                  <div>
                    {users.filter(findUser(search)).map((user) => (
                      <SidebarChat
                        key={user.id}
                        id={user.id}
                        name={user.data.name}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="sidebar__chatsContainer_empty">
                    <span>Не найдено</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {users.map((user) => (
                  <SidebarChat
                    key={user.id}
                    id={user.id}
                    name={user.data.name}
                  />
                ))}
              </>
            )}
          </>
        ) : (
          <div className="sidebar__chatsContainer_loading">
            <div>
              <CircularProgress />
            </div>
          </div>
        )}

        {noUsers && loading ? (
          <div className="sidebar__chatsContainer_empty">
            <span>Пока здесь нет чатов</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SidebarUser;
