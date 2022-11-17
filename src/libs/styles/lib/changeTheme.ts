export const changeTheme = (theme: string) => {
  if (theme === "light") {
    window.localStorage.setItem("theme", "light");
    document.body.style.setProperty("--background-color", "#fff");
    document.body.style.setProperty("--shadow", "0 3px 10px rgb(0 0 0 / 0.2)");
    document.body.style.setProperty("--cc", "000");
    document.body.style.setProperty("--font", "#000");
  } else if (theme === "dark") {
    window.localStorage.setItem("theme", "dark");
    document.body.style.setProperty("--background-color", "#121212");
    document.body.style.setProperty("--shadow", "none");
    document.body.style.setProperty("--cc", "255");
    document.body.style.setProperty("--font", "#fff");
  }
  return;
};
