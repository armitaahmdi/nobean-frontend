import { useEffect, useState } from "react";
import { FaUser, FaListAlt, FaChartBar, FaHome } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import testsApi from "../../services/testsApi";
import { processTestData } from "../../features/user/tests/utils/testUtils";

export default function Dashboard() {
	const [activeTab, setActiveTab] = useState("home");
  const { token, user: authUser } = useSelector((state) => state.auth);
  const [myExams, setMyExams] = useState({ loading: false, error: null, items: [] });
  const [myAttempts, setMyAttempts] = useState({ loading: false, error: null, items: [], pagination: null });
  const [attemptsPage, setAttemptsPage] = useState(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const displayFirst = authUser?.firstName || authUser?.user?.firstName || '';
  const displayLast = authUser?.lastName || authUser?.user?.lastName || '';
  const displayName = `${displayFirst} ${displayLast}`.trim();

  useEffect(() => {
    if (activeTab === 'exams') {
      (async () => {
        try {
          setMyExams(prev => ({ ...prev, loading: true, error: null }));
          const res = await testsApi.getMyExams(token);
          setMyExams({ loading: false, error: null, items: res.items || [] });
        } catch (e) {
          setMyExams({ loading: false, error: e?.message || 'خطا در دریافت آزمون‌ها', items: [] });
        }
      })();
    }
  }, [activeTab, token]);

  useEffect(() => {
    if (activeTab === 'exams') {
      (async () => {
        try {
          setMyAttempts(prev => ({ ...prev, loading: true, error: null }));
          const res = await testsApi.getMyAttempts(token, { page: attemptsPage, limit: 10 });
          setMyAttempts({ loading: false, error: null, items: res.items || [], pagination: res.pagination || { page: attemptsPage, totalPages: 1 } });
        } catch (e) {
          setMyAttempts({ loading: false, error: e?.message || 'خطا در دریافت تلاش‌ها', items: [], pagination: null });
        }
      })();
    }
  }, [activeTab, token, attemptsPage]);

	const tabs = [
    { id: "home", label: "حساب کاربری", icon: FaHome },
    { id: "exams", label: "آزمون‌های من", icon: FaListAlt },
    { id: "results", label: "نتایج و کارنامه‌ها", icon: FaChartBar },
    { id: "profile", label: "پروفایل", icon: FaUser },
	];

	return (
		<div className="min-h-screen py-6">
			<div className="max-w-6xl mx-auto px-4">
				<div className="grid grid-cols-12 gap-4">
					{/* Sidebar */}
            <aside className={`${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} hidden lg:block col-span-12 lg:col-span-3`}>
						<div className="rounded-2xl border border-gray-100 bg-white p-3">
                            <SidebarNav 
                              activeTab={activeTab} 
                              onSelect={setActiveTab} 
                              collapsed={sidebarCollapsed}
                              userName={displayName || 'کاربر'}
                              userPhone={authUser?.phone || authUser?.user?.phone || ''}
                            />
						</div>
					</aside>

                    {/* Mobile/Tablet account menu dropdown */}
                    <div className="col-span-7 lg:hidden">
                        <div className="mb-2 relative">
                            <button
                                onClick={() => setMobileSidebarOpen((s) => !s)}
                                className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[12px]"
                                aria-expanded={mobileSidebarOpen}
                            >
                                <CiMenuKebab className="text-gray-600 text-sm" />
                                <span className="font-extrabold text-gray-900">منوی حساب کاربری</span>
                            </button>
                            {mobileSidebarOpen && (
                                <div className="absolute top-full mt-2 right-0 left-0 z-50 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl">
                                    <SidebarNav
                                        activeTab={activeTab}
                                        onSelect={(id) => { setActiveTab(id); setMobileSidebarOpen(false); }}
                                        collapsed={false}
                                        userName={displayName || 'کاربر'}
                                        userPhone={authUser?.phone || authUser?.user?.phone || ''}
                                        showUserHeader={false}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <section className="col-span-12 lg:col-span-9">
						<div className="bg-white rounded-2xl shadow-lg border border-gray-100">
							<div className="p-4 sm:p-6">
						{activeTab === "home" && (
							<div>
								{/* Welcome copy instead of stats */}
                                <div className="rounded-2xl border border-gray-100 bg-white p-5 mb-4 relative">
                                    <h2 className="text-xl font-extrabold text-gray-900">سلام {(displayName || 'کاربر')} عزیز 👋</h2>
								</div>

								{/* My Exams CTA block */}
								<div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
									<div>
                                    <p className="text-gray-700 text-sm">
                    در قسمت 
                    <button
                      onClick={() => setActiveTab('exams')}
                      className="mx-1 px-2 py-1 rounded-lg border border-gray-200 inline-flex items-center hover:bg-gray-50"
                    >
                      آزمون‌های
                    </button>
                    من میتوانید تمام آزمون هایی که شرکت کردید و نحوه دسترسی به آن را ببنید.
                    </p>
									</div>
								</div>
							</div>
						)}

						{activeTab === "profile" && (
							<div>
								<Profile />
							</div>
						)}

						{activeTab === "exams" && (
							<div className="text-gray-700">
								<h2 className="text-xl font-extrabold mb-4 text-gray-900">آزمون‌های من</h2>

                                {/* Summary stats */}
                                <StatsSummary myAttempts={myAttempts} myExams={myExams} />

                                <AttemptsRows myAttempts={myAttempts} setShowResultModal={setShowResultModal} />

                                {/* Pagination */}
                                {myAttempts.pagination && myAttempts.pagination.totalPages > 1 && (
                                  <div className="mt-4 flex items-center justify-center gap-2 text-[12px]">
                                    <button
                                      onClick={() => setAttemptsPage(p => Math.max(1, p - 1))}
                                      disabled={attemptsPage === 1}
                                      className="px-3 py-2 rounded-xl border border-gray-200 disabled:opacity-50"
                                    >
                                      قبلی
                                    </button>
                                    <span className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200">صفحه {myAttempts.pagination.page} از {myAttempts.pagination.totalPages}</span>
                                    <button
                                      onClick={() => setAttemptsPage(p => Math.min(myAttempts.pagination.totalPages, p + 1))}
                                      disabled={attemptsPage === myAttempts.pagination.totalPages}
                                      className="px-3 py-2 rounded-xl border border-gray-200 disabled:opacity-50"
                                    >
                                      بعدی
                                    </button>
                                  </div>
                                )}

                                {/* Timed modal for report notification */}
                                {showResultModal && (
                                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowResultModal(false)} />
                                    <div className="relative z-10 w-[90%] max-w-sm rounded-2xl bg-blue-50 border border-blue-200 shadow-xl p-5 text-center">
                                      <h3 className="font-extrabold text-blue-900 mb-2">کارنامه</h3>
                                      <p className="text-sm text-blue-800">به محض آماده شدن کارنامه بهتون اطلاع می‌دیم.</p>
                                    </div>
                                  </div>
                                )}
							</div>
						)}

                        {activeTab === "results" && (
                            <div className="text-gray-700">
                                <h2 className="text-xl font-extrabold mb-4 text-gray-900">نتایج و کارنامه‌ها</h2>
                                <div className="rounded-2xl border border-purple-100 bg-gradient-to-l from-purple-50 to-indigo-50 p-6 text-center">
                                    <p className="text-sm text-gray-700 mb-3">به‌زودی می‌توانید کارنامه‌های هر آزمون را به‌صورت کامل ببینید.</p>
                                </div>
                            </div>
                        )}
                        </div>
                        </div>
					</section>
				</div>
			</div>
		</div>
	);
}

function ExamsList({ token, myExams, setMyExams }) {
  if (myExams.loading) {
    return (
      <div className="py-10 text-center">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"></div>
        <div className="text-gray-600 text-sm">در حال بارگذاری...</div>
      </div>
    );
  }
  if (myExams.error) {
    return (
      <div className="py-8">
        <div className="text-center bg-red-50 border border-red-200 text-red-700 rounded-xl py-3 text-sm">
          {myExams.error}
        </div>
      </div>
    );
  }
  if (!myExams.items || myExams.items.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-lg">–</span>
        </div>
        <div className="text-gray-700 font-semibold mb-1">هنوز آزمونی ندارید</div>
        <div className="text-gray-500 text-sm">پس از شرکت در آزمون‌ها، اینجا نمایش داده می‌شوند</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {myExams.items.map((exam) => (
        <div key={exam.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
              {exam.imagepath ? (
                <img src={exam.imagepath} alt={exam.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-gray-900 text-sm mb-1 line-clamp-1">{exam.title}</h3>
              <div className="text-[12px] text-gray-600 line-clamp-2">{exam.ShortDescription}</div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] px-2 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200">تلاش‌ها: {exam.attempts || 0}</span>
            {exam.time && (
              <span className="text-[11px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">زمان: {exam.time}‌دقیقه</span>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <a href={`/tests/${exam.id}`} className="flex-1 text-center px-3 py-2 rounded-xl bg-blue-50 text-blue-700 text-[12px] font-bold hover:bg-blue-100">جزئیات</a>
            <a href={`/exam/${exam.id}`} className="flex-1 text-center px-3 py-2 rounded-xl bg-green-50 text-green-700 text-[12px] font-bold hover:bg-green-100">شروع/ادامه</a>
          </div>
        </div>
      ))}
    </div>
  );
}

function AttemptsRows({ myAttempts, setShowResultModal }) {
  if (myAttempts.loading) {
    return (
      <div className="py-6 text-sm text-gray-600">در حال بارگذاری تلاش‌ها...</div>
    );
  }
  if (myAttempts.error) {
    return (
      <div className="py-4 text-sm text-red-600">{myAttempts.error}</div>
    );
  }
  if (!myAttempts.items || myAttempts.items.length === 0) {
    return null;
  }

  // Attempt number per exam (chronological by completedAt)
  const attemptNumberById = (() => {
    const map = new Map(); // examId -> array of attempts sorted asc by completedAt
    (myAttempts.items || []).forEach(att => {
      if (!map.has(att.examId)) map.set(att.examId, []);
      map.get(att.examId).push(att);
    });
    const idToNum = new Map();
    for (const [examId, arr] of map.entries()) {
      arr.sort((a, b) => new Date(a.completedAt || 0) - new Date(b.completedAt || 0));
      arr.forEach((att, idx) => {
        idToNum.set(att.id, idx + 1); // تلاش 1 = اولین تلاش کاربر برای آن آزمون
      });
    }
    return idToNum;
  })();

  return (
    <div className="rounded-2xl">
      <ul className="p-3 sm:p-4 space-y-3">
        {myAttempts.items.map((att) => (
          <li key={att.id} className="relative p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute right-1 top-1 bottom-1 w-[4px] bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
            <div className="flex items-start gap-3 pl-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {att.Exam?.imagepath ? (
                  <img src={att.Exam.imagepath} alt={att.Exam.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                {/* Title */}
                <div className="text-sm font-extrabold text-gray-900 mb-1 line-clamp-1">{att.Exam?.title || '—'}</div>
                {/* Description */}
                <div className="text-[12px] text-gray-600 line-clamp-2 mb-2">{att.Exam?.ShortDescription || ''}</div>
                {/* Info chips */}
                <div className="flex flex-wrap items-center gap-2 text-[12px]">
                  <span className="px-2 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200">دسته‌بندی: {att.Exam?.category ? (processTestData({ category: att.Exam.category }).category) : 'نامشخص'}</span>
                  <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">تلاش: {attemptNumberById.get(att.id) || 1}</span>
                  <span className="px-2 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200">تاریخ انجام: {att.completedAt ? new Date(att.completedAt).toLocaleDateString('fa-IR') : '—'}</span>
                </div>
              </div>
            </div>
            {/* Actions */}
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => {
                  try {
                    if (typeof window !== 'undefined') {
                      window.setTimeout(() => setShowResultModal(false), 2500);
                    }
                    setShowResultModal(true);
                  } catch (e) {
                    setShowResultModal(true);
                  }
                }}
                className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 text-[12px] font-bold hover:bg-blue-100"
              >
                کارنامه
              </button>
              <a href={`/exam/${att.examId}`} className="px-3 py-2 rounded-xl bg-green-50 text-green-700 text-[12px] font-bold hover:bg-green-100">انجام دوباره</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatsSummary({ myAttempts, myExams }) {
  if (myAttempts.loading) return null;
  const totalAttempts = myAttempts.items?.length || 0;
  const distinctExams = new Set((myAttempts.items || []).map(a => a.examId)).size;
  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 relative overflow-hidden">
        <div className="absolute -left-6 -top-6 w-16 h-16 rounded-full bg-blue-200/40" />
        <div className="text-[12px] text-blue-800">دفعات شرکت</div>
        <div className="text-2xl font-extrabold text-blue-900 mt-1">{totalAttempts}</div>
      </div>
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 relative overflow-hidden">
        <div className="absolute -left-6 -top-6 w-16 h-16 rounded-full bg-emerald-200/40" />
        <div className="text-[12px] text-emerald-800">تعداد آزمون‌ها</div>
        <div className="text-2xl font-extrabold text-emerald-900 mt-1">{distinctExams}</div>
      </div>
      <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 relative overflow-hidden">
        <div className="absolute -left-6 -top-6 w-16 h-16 rounded-full bg-amber-200/40" />
        <div className="text-[12px] text-amber-800">آخرین فعالیت</div>
        <div className="text-sm font-extrabold text-amber-900 mt-1">{myAttempts.items?.[0]?.completedAt ? new Date(myAttempts.items[0].completedAt).toLocaleDateString('fa-IR') : '—'}</div>
      </div>
    </div>
  );
}

function SidebarNav({ activeTab, onSelect, collapsed, userName, userPhone, showUserHeader = true }) {
  const items = [
    { id: 'home', label: 'حساب کاربری', icon: FaHome },
    { id: 'exams', label: 'آزمون‌های من', icon: FaListAlt },
    { id: 'results', label: 'نتایج و کارنامه‌ها', icon: FaChartBar },
    { id: 'profile', label: 'پروفایل', icon: FaUser },
  ];
  const initial = (userName || '').trim().charAt(0) || 'ک';
  return (
    <nav className="flex flex-col gap-1">
      {/* User header */}
      {showUserHeader && !collapsed && (
        <div className="mb-3 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lightBlue to-darkBlue flex items-center justify-center text-white mb-2">
            <span className="text-lg font-extrabold">{initial}</span>
          </div>
          <div className="text-sm font-extrabold text-gray-900">{userName}</div>
          {userPhone && <div className="text-[12px] text-gray-600 mt-0.5">{userPhone}</div>}
        </div>
      )}
      {showUserHeader && !collapsed && <hr className="my-2 border-gray-200" />}

      {items.map(({ id, label, icon: Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex items-center gap-3 w-full text-right px-3 py-2 rounded-xl border transition-all ${
              active ? 'bg-blue-50 text-blue-700 border-blue-200' : 'border-gray-100 hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Icon className={active ? 'text-blue-600' : 'text-gray-500'} />
            {!collapsed && <span className="text-sm font-bold">{label}</span>}
          </button>
        );
      })}
    </nav>
  );
}


