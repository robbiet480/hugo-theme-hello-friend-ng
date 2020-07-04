// Toggle theme

var getTheme = window.localStorage && window.localStorage.getItem("theme");
const themeToggle = document.querySelector(".theme-toggle");
var metaThemeColor = document.querySelector("meta[name=theme-color]");
var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
var lightQuery = window.matchMedia("(prefers-color-scheme: light)");
const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches
const hasNoSupport = !darkQuery.matches && !lightQuery.matches && !isNotSpecified;
var themes = ["Automatic", "Light", "Dark"];
var currentThemeIdx = 0;

if(getTheme === null) {
  let themeName = hasNoSupport ? defaultTheme : "Automatic";
  window.localStorage.setItem("theme", themeName);
  getTheme = themeName;
}

if(hasNoSupport) {
  themes = ["Light", "Dark"];
} else {
  document.querySelector('.theme-toggle .theme-status').style.display = "block";
}

currentThemeIdx = themes.indexOf(getTheme);

setTheme(getTheme, false);
if(getTheme === "Automatic") {
  darkQuery.addListener(handleMediaQueryChange);
  lightQuery.addListener(handleMediaQueryChange);
}

themeToggle.addEventListener("click", (e) => {
  const currentTheme = themes[currentThemeIdx];
  currentThemeIdx++;
  if(currentThemeIdx > (themes.length - 1)) currentThemeIdx = 0;
  var newTheme = themes[currentThemeIdx];
  // if(currentTheme === "Automatic") {
  //   if(darkQuery.matches && newTheme === "Dark") {
  //     newTheme = "Light";
  //   } else if(lightQuery.matches && newTheme === "Light") {
  //     newTheme = "Dark";
  //   }
  //   currentThemeIdx = themes.indexOf(newTheme);
  // }
  window.localStorage.setItem("theme", newTheme);
  setTheme(newTheme, false);
  if(newTheme === "Automatic") {
    darkQuery.addListener(handleMediaQueryChange);
    lightQuery.addListener(handleMediaQueryChange);
  } else {
    darkQuery.removeListener(handleMediaQueryChange);
    lightQuery.removeListener(handleMediaQueryChange);
  }
});

function handleMediaQueryChange(e) {
  if(e.matches) {
    let newTheme = e.media.indexOf('dark') > -1 ? "Dark" : "Light";
    setTheme(newTheme, true);
  }
}

function setTheme(themeName, automatic){
  if(themeName === "Light") {
    document.body.classList.remove("dark-theme");
    metaThemeColor.setAttribute("content", "#fafafa");
  } else if(themeName === "Dark") {
    document.body.classList.add("dark-theme");
    metaThemeColor.setAttribute("content", "#252627");
  } else if(themeName === "Automatic") {
    if(darkQuery.matches) {
      setTheme("Dark", true);
    } else if(lightQuery.matches) {
      setTheme("Light", true);
    }
  }
  if(!automatic) {
    let display = document.querySelector('.theme-toggle .theme-status')
    display.textContent = themeName.charAt(0).toUpperCase();
    display.title = themeName;
  }
}
