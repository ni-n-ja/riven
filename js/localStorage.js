  var lsInit = function(str) {
      if (('localStorage' in window) && (window.localStorage !== null)) {
          localStorage = window.localStorage;
          if (localStorage.getItem("alias")) {
              localStorage.getItem("alias") === str;
          } else {
              localStorage.clear();
          }
      }
  };
