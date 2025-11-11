import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatsGroup from "../../features/admin/components/StatsGroup";
import { statItems } from "../../config/statSections";
import UserSignupChart from "../../features/admin/components/chart/UserSignupChart";
import statistics from "../../assets/admin/statistics.png"
import RecentUsersTable from "../../features/admin/components/tables/RecentUsersTable";
import ExamAttemptsChart from "../../features/admin/components/chart/test/ExamAttemptsChart";
import TopExamPieChart from "../../features/admin/components/chart/test/TopExamPieChart";
import ActivityFeed from "../../features/admin/components/ActivityFeed";
import notification from "../../assets/admin/notification.png"
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import { 
    fetchDashboardStats, 
    fetchRecentUsers, 
    fetchRecentActivities,
    fetchRecentComments,
    clearErrors,
    selectDashboardStats,
    selectDashboardLoading,
    selectDashboardErrors,
    selectIsDashboardInitialized,
    selectRecentUsers,
    selectRecentActivities,
    selectCommentsStats
} from "../../features/admin/slices/dashboardSlice";

export default function Dashboard() {
    const dispatch = useDispatch();
    const dashboardStats = useSelector(selectDashboardStats);
    const loading = useSelector(selectDashboardLoading);
    const errors = useSelector(selectDashboardErrors);
    const isInitialized = useSelector(selectIsDashboardInitialized);
    const recentUsers = useSelector(selectRecentUsers);
    const recentActivities = useSelector(selectRecentActivities);
    const commentsStats = useSelector(selectCommentsStats);
    
    // Get token from auth state
    const token = useSelector((state) => state.auth?.token);

    useEffect(() => {
        if (token && !isInitialized) {
            console.log('Loading dashboard data with token:', token ? 'Token present' : 'No token');
            // بارگذاری آمار کلی داشبورد
            dispatch(fetchDashboardStats(token));
            
            // بارگذاری کاربران اخیر
            dispatch(fetchRecentUsers({ token, limit: 5 }));
            
            // بارگذاری فعالیت‌های اخیر
            dispatch(fetchRecentActivities({ token, limit: 10 }));
            
            // بارگذاری کامنت‌های جدید
            dispatch(fetchRecentComments({ token, limit: 20, days: 7 }));
        }
    }, [dispatch, token, isInitialized]);

    // پاک کردن خطاها هنگام unmount
    useEffect(() => {
        return () => {
            dispatch(clearErrors());
        };
    }, [dispatch]);

    // تبدیل آمار به فرمت مورد نیاز StatsGroup
    const statsMap = useMemo(() => {
        if (!dashboardStats) return {};
        
        // استفاده از commentsStats.total اگر موجود باشه، وگرنه از dashboardStats.comments
        const commentsCount = commentsStats?.total || dashboardStats.comments || 0;
        
        return {
            users: dashboardStats.users?.total || 0,
            exams: dashboardStats.tests?.total || 0,
            examsTaken: dashboardStats.examAttempts?.totalAttempts || 0,
            coursesPurchased: dashboardStats.coursesPurchased || 0,
            consultants: dashboardStats.consultants || 0,
            successfulConsultations: dashboardStats.successfulConsultations || 0,
            articles: dashboardStats.articles || 0,
            podcasts: dashboardStats.podcasts || 0,
            comments: commentsCount,
        };
    }, [dashboardStats, commentsStats]);

    // بررسی وجود خطا
    const hasError = Object.values(errors).some(error => error !== null);
    const isLoading = Object.values(loading).some(loadingState => loadingState === true);

    if (isLoading && !isInitialized) {
        return <LoadingState message="در حال بارگذاری آمار داشبورد..." />;
    }

    if (hasError) {
        const firstError = Object.values(errors).find(error => error !== null);
        return <ErrorState message={firstError} />;
    }

    return (
        <div className="flex flex-col gap-10">
            {/* Stat Cards */}
            <StatsGroup items={statItems} statsMap={statsMap} />

            {/* Charts */}
            <div className="flex items-baseline">
                <img className="w-10 h-10" src={statistics} alt="admin panel" />
                <h1 className="mx-2 font-semibold text-lg">گزارش ها</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Chart Section */}
                <div className="lg:w-2/3 w-full">
                    <UserSignupChart />
                </div>

                {/* Recent Users Table */}
                <div className="lg:w-1/3 w-full">
                    <RecentUsersTable />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Chart Section */}
                <div className="lg:w-2/3 w-full">
                    <ExamAttemptsChart />
                </div>
                {/* Top Exam Chart */}
                <div className="lg:w-1/3 w-full">
                    <TopExamPieChart />
                </div>
            </div>
            {/* activity feed */}
            <div>
                <div className="flex items-baseline">
                    <img className="w-10 h-10" src={notification} alt="admin panel" />
                    <h1 className="mx-2 mb-2 font-semibold text-lg">آخرین فعالیت ها</h1>
                </div>
                <ActivityFeed />
            </div>
        </div>
    );
}
