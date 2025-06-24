import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import BottomTabNavigation from "components/ui/BottomTabNavigation";

// Page imports
import DashboardHome from "pages/dashboard-home";
import RestaurantBrowseSearch from "pages/restaurant-browse-search";
import RestaurantDetail from "pages/restaurant-detail";
import CampusMap from "pages/campus-map";
import UserProfile from "pages/user-profile";
import WriteReview from "pages/write-review";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-16 pb-16 md:pb-0">
            <RouterRoutes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/dashboard-home" element={<DashboardHome />} />
              <Route path="/restaurant-browse-search" element={<RestaurantBrowseSearch />} />
              <Route path="/restaurant-detail" element={<RestaurantDetail />} />
              <Route path="/campus-map" element={<CampusMap />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/write-review" element={<WriteReview />} />
            </RouterRoutes>
          </main>
          <BottomTabNavigation />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;