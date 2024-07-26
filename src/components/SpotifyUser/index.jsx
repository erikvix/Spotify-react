import React, { useEffect } from "react";
import useUserStore from "../../store/dataStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "../ui/card";

const UserProfile = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  useEffect(() => {
    setUser();
  }, [setUser]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-20 mt-8">
      <Card className="w-80 h-auto gap-2 p-2 flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle>
            Hello, <span className="text-primary">{user?.display_name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Avatar className="h-48 w-48">
            <AvatarImage src={user?.images[1].url} />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <div>
            <p>Followers: {user?.followers?.total}</p>
            <p>{user?.country}</p>
          </div>
        </CardContent>
      </Card>
      <h1 className="text-3xl">
        Hello, <span className="text-primary">{user?.display_name}</span>
      </h1>
    </div>
  );
};

export default UserProfile;