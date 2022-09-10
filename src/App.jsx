import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
// import { Features } from "./components/features";
import { About } from "./components/about";
// import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
// import { Testimonials } from "./components/testimonials";
// import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import {
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <GoogleReCaptchaProvider reCaptchaKey="6LdKFOshAAAAALfWbDrzCrDt9tPB69QKuqs5jLIl">
        <Navigation/>
        <Header data={landingPageData.Header} />
        {/* <Features data={landingPageData.Features} /> */}
        <About data={landingPageData.About} />
        {/* <Services data={landingPageData.Services} /> */}
        <Gallery data={landingPageData.Gallery}/>
        {/* <Testimonials data={landingPageData.Testimonials} /> */}
        {/* <Team data={landingPageData.Team} /> */}
        <Contact data={landingPageData.Contact} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </GoogleReCaptchaProvider>
    </div>
  );
};

export default App;
