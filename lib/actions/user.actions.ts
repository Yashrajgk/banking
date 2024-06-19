'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

export const signIn = async({email, password}: signInProps) => {
    try{
      const {account} = await createAdminClient;
      const response= await account.createEmailPasswordSession(email, password);

      return parseStringify(response);
    } catch(error){
        console.error('Error', error);
    }
}

export const signUp = async(userData: SignUpParams) => {
    const { email, firstName, lastName } = userData;

    let newUserAccount;

    try{
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(), 
            userData.email, 
            userData.password, 
            `${firstName} ${lastName}`
        );

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
  });
    return parseStringify(newUser);
    }catch(error){
        console.error('Error', error);
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete('appwrite-session');

    await account.deleteSession('current');
  } catch (error) {
    return null;
  }
}