import React, {useEffect} from "react";
import ReactGA from "react-ga4";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {AuthStatus, useAuth} from "../../others/contexts/auth";

import {Header} from "../../others/components/Header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

export function Login() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {login, status} = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    document.title = t("login_page_title");
    ReactGA.send("pageview");
  }, [t]);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      await login(username, password);
    },
    [login, username, password]
  );

  React.useEffect(() => {
    if (status === AuthStatus.SignedIn) {
      navigate("/orders");
    }
  }, [status, navigate]);

  return (
    <>
    <Header hasHeadline hasLangSelector />
    <Container maxWidth="sm">
      <Box sx={{ my: 20, display: "flex" }}>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 10, display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ mb: 2 }}
            label={t("login")}
            placeholder="username"
            autoComplete="login"
            inputProps={{ "aria-label": t("email") }}
            variant="filled"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
          <TextField
            sx={{ mb: 2 }}
            label={t("password")}
            placeholder="password"
            type="password"
            autoComplete="password"
            inputProps={{ "aria-label": t("password") }}
            variant="filled"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button sx={{ mb: 2 }} variant="contained" type="submit" disabled={!username || !password || status === AuthStatus.Loading}>
            {t("login2")}
          </Button>
          <Button sx={{ mb: 2 }} variant="outlined" disabled={status === AuthStatus.Loading} onClick={() => navigate("/reset-password")}>
            {t("request_new_password")}
          </Button>
        </Box>
      </form>
    </Container>
    </>
  );
}
