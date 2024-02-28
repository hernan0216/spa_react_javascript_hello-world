import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";

export const ProfilePage = () => {
  const { user, getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const [idToken, setIdToken] = useState()
    useEffect(() => {
      const fetchIdToken = async () => {
        const claims = await getIdTokenClaims()
        setIdToken(claims.__raw)
      }
      fetchIdToken()
    }, [])

  const [idAccessToken, setIdAccessToken] = useState()
    useEffect(() => {
      const fetchIdAccessToken = async () => {
        const token = await getAccessTokenSilently()
        setIdAccessToken(token)
      }
      fetchIdAccessToken()
    }, [])


  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Profile Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              You can use the <strong>ID Token</strong> to get the profile
              information of an authenticated user.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
              <CodeSnippet
                title="Decoded ID Token"
                code={JSON.stringify(user, null, 2)}
              />
              <CodeSnippet
                title="Raw ID Token"
                code={ idToken }
              />
              <CodeSnippet
                title="Raw ID AccessToken"
                code={ idAccessToken }
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
