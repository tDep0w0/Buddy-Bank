import { getGroups } from "@/services/group";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    getGroups("317cd5e2-f688-4267-b46f-6bb14c29316a").then(console.log)
  }, [])

  return <Redirect href="/authTab/login" />;
}