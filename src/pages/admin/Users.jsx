import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UsersTable from '../../features/admin/components/UsersTable';
import { fetchUserStats } from '../../features/admin/slices/userManagementSlice';

export default function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    // بارگذاری آمار کاربران هنگام ورود به صفحه
    dispatch(fetchUserStats());
  }, [dispatch]);

  return (
    <div className="p-6">
      <UsersTable />
    </div>
  );
}
