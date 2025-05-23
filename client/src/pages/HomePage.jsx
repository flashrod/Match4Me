import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMatchStore } from "../store/useMatchStore";
import { Frown } from "lucide-react";
import SwipeArea from "../components/SwipeArea";
import SwipeFeedback from "../components/SwipeFeedback";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { isLoadingUserProfiles, getUserProfiles, userProfiles, subscribeToNewMatches, unsubscribeFromNewMatches } =
    useMatchStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getUserProfiles();
  }, [getUserProfiles]);

  useEffect(() => {
    if (authUser) {
      subscribeToNewMatches();
    }
    return () => {
      unsubscribeFromNewMatches();
    };
  }, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

  if (isLoadingUserProfiles) {
    return <LoadingUI />;
  }

  if (!userProfiles || userProfiles.length === 0) {
    return <NoMoreProfiles />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black overflow-hidden">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header />
        <main className="flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden">
          <SwipeArea />
          <SwipeFeedback />
        </main>
      </div>
    </div>
  );
};

export default HomePage;

const NoMoreProfiles = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <Frown className="text-purple-400 mb-6" size={80} />
    <h2 className="text-3xl font-bold text-white mb-4">Woah there, speedy fingers!</h2>
    <p className="text-xl text-purple-300 mb-6">Bro are you OK? Maybe it's time to touch some grass.</p>
  </div>
);

const LoadingUI = () => (
  <div className="relative w-full max-w-sm h-[28rem]">
    <div className="card bg-gray-900 w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-800 shadow-sm">
      <div className="px-4 pt-4 h-3/4">
        <div className="w-full h-full bg-gray-800 rounded-lg" />
      </div>
      <div className="card-body bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="space-y-2">
          <div className="h-6 bg-gray-800 rounded w-3/4" />
          <div className="h-4 bg-gray-800 rounded w-1/2" />
        </div>
      </div>
    </div>
  </div>
);
