// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import HealingIcon from "@material-ui/icons/Healing";

import LocationOn from "@material-ui/icons/LocationOn";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import DoctorView from "views/Doctor/DoctorView.js";
import MedicineView from "views/Medicine/MedicineView.js";
import MedicalCentreView from "views/MedicalCentre/MedicalCentreView.js";
import DiseaseView from "views/Disease/DiseaseView.js";
import Maps from "views/Maps/Maps.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "උපකාරක පුවරුව",
    rtlName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/diseases",
    name: "ර‌ෝගයන්",
    rtlName: "Diseases",
    icon: HealingIcon,
    component: DiseaseView,
    layout: "/admin"
  },
  {
    path: "/doctors",
    name: "වෙද මහතුන්",
    rtlName: "Doctors",
    icon: Person,
    component: DoctorView,
    layout: "/admin"
  },
  {
    path: "/centers",
    name: "වෙද මැදුරු",
    rtlName: "Medical Centres",
    icon: LocalHospitalIcon,
    component: MedicalCentreView,
    layout: "/admin"
  },
  {
    path: "/medicine",
    name: "බෙහෙත් වර්ග",
    rtlName: "Medications",
    icon: LocalDrinkIcon,
    component: MedicineView,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "සිතියම",
    rtlName: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  }
];

export default dashboardRoutes;
