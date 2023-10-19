import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "/styles/assets/plugins/fontawesome-free-6.1.1/css/all.min.css";
import "/styles/assets/plugins/progressbar/jQuery-plugin-progressbar.css";
import "/styles/assets/css/app/main.css";
import "/styles/assets/css/app/admin-dashboard.css";
import "/styles/assets/css/app/style.css";
import "/styles/assets/css/app/responsive.css";
import "/styles/assets/css/app/sells.css";
import "/styles/assets/css/app/swiper.min.css";
import "/styles/assets/css/app/admin-registration.css";
import "/styles/assets/css/app/admin-login.css";
import "react-toastify/dist/ReactToastify.css";

// style for register this style comment because change the font size whole of the project
// import "/styles/assets/css/app/admin-login.css"
// import "/styles/assets/css/app/admin-registration.css"
// import "/styles/assets/css/app/intlTelInput.css"

// add student style
import "/styles/assets/css/app/add-student.css";

import Cookies from "js-cookie";
// axios default global settings
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-type"] = "Application/json";
axios.defaults.headers.post["Accept"] = "Application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#03bee3"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </>
  );
}
