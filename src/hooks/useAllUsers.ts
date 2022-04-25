// 全ユーザー一覧を取得
import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";
import axios from "axios";

export const useAllUsers = () => {
  const [userProfiles, setUserprofiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // ロジックの塊を１つの定数にまとめて使う
  const getUsers = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserprofiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { userProfiles, loading, error, getUsers };
};
