import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile"
import CreateSets from "../pages/CreateSets";
import StudySet from "../pages/StudySet";
import Contact from "../pages/Contact";
import UserStudySets from "../pages/UserStudySets";
import UserStudySet from "../pages/UserStudySet";
import EditStudySet from "../pages/EditStudySet";
import Practice from "../pages/Practice";
import EndPractice from "../pages/EndPractice";
import LearnCards from "../pages/LearnCards";
import UserProfileUpdate from "../pages/ProfileSettings";
import WriteMode from "../pages/WriteMode";
import ForeignUserStudySets from "../pages/ForeignUserStudySets";
import ForeignUserStudySet from "../pages/ForeignUserStudySet";
import Modules from "../pages/Modules"
import AllStudySets from "../pages/AllStudySets";
import Module from "../pages/Module";




const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/user/:id', element: <UserProfile />},
      { path: '/user/:id/studySets', element: <UserStudySets />},
      { path: '/user/:userId/studySet/:id', element: <UserStudySet />},
      { path: 'user/:userId/studySet/practice/:id', element: <Practice />},
      { path: '/user/:userId/studySet/learn-cards/:id', element: <LearnCards />},
      { path: '/user/:userId/study-set/write-mode/:id', element:<WriteMode />},
      { path: '/users/:userId/all-study-sets', element: <ForeignUserStudySets />},
      { path: '/users/:userId/topic/:topicId/study-set/:studySetId', element: <ForeignUserStudySet />},
      { path: '/modules', element: <Modules />},
      { path: '/module/:moduleId', element: <Module />},
      { path: '/all-study-sets', element: <AllStudySets />},
      { path: '/module/:moduleId/studySet/:topicId/:studySetId', element: <StudySet />},
      { path: '/createSet/', element: <CreateSets />},
      { path: '/studySet/edit/:id', element: < EditStudySet/>},
      { path: '/studySet/endPractice/:id', element: <EndPractice />},
      { path: '/contact', element: <Contact />},
      { path: '*', element: <PageNotFound />},
      { path: '/userProfileUpdate', element: <UserProfileUpdate />},
    ],
  },
]);

export default router;
